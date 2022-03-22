const {employeeModel} = require('../sequelize/models/employee.js');
const { Op } = require("sequelize");

class Repository {
    #repo;
    #defaultLimit = 20;
    #defaultOffset = 0;

    constructor(repo) {
        this.#repo = repo;
    }

    static buildWhere(searchString) {
        if (!searchString) {
            return {}
        }

        const where = {};
        if (searchString) {
            where[Op.or] = [];

            const argument = `%${searchString}%`;
            where[Op.or].push({firstName: {[Op.like]: argument}});
            where[Op.or].push({lastName: {[Op.like]: argument}});
        }

        return where;
    }

    /**
     *
     * @param searchOptions
     * @returns {Promise<{rows: Model[], count: number}|{rows: Model[], count: GroupedCountResultItem[]}|{total: *, items: *}>}
     */
    async find(searchOptions) {
        if (!searchOptions) {
            return this.#repo.findAndCountAll();
        }

        const {search, limit, offset} = searchOptions;
        const where = Repository.buildWhere(search);

        const { count, rows } = await this.#repo.findAndCountAll({
            where,
            offset: offset || this.#defaultOffset,
            limit: limit || this.#defaultLimit,
        });

        return { items: rows, total: count };
    }

    async getById(id) {
        const entity = await this.#repo.findByPk(id);

        if (!entity) {
            return null;
        }

        return entity;
    }

    async save(employee) {
        if (!employee.id) {
            throw new Error(`Employee entity must includes primary key`);
        }

        const entity = await this.#repo.findByPk(employee.id);

        if (!entity) {
            return this.#repo.create(employee);
        }

        return entity.update(employee);
    }

    async delete(id) {
        return this.#repo.destroy(id);
    }
}

module.exports.staffRepository = new Repository(employeeModel);
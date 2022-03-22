const {staffRepository} = require('../../adaptors/db/repo/employee.js');
const uuid = require('uuid');

class Service {
    #employeeRepo;

    constructor(employeeRepo) {
        this.#employeeRepo = employeeRepo;
    }

    async getEmployeeById(id) {
        return this.#employeeRepo.getById(id);
    }

    async getEmployees(searchOptions) {
        return this.#employeeRepo.find(searchOptions);
    }

    async addEmployee(attributes) {
        const employee = {
            ...attributes,
            id: uuid.v4(),
        }

        return this.#employeeRepo.save(employee);
    }

    async updateEmployee(id, attributes) {
        const employee = {
            ...attributes,
            id,
        }

        return this.#employeeRepo.save(employee);
    }

    async deleteEmployee(id) {
        return this.#employeeRepo.delete(id);
    }
}

module.exports.Service = Service;
module.exports.staffService = new Service(staffRepository);


const {staffService} = require("./staff.service.js");

const employees = [
    {
        "id": "0b06acd3-d38b-44de-8a95-fcf2692fdef3",
        "firstName": "User_1",
        "lastName": "Name_1",
        "phone": "000-000-000",
        "email": "john@mail.com",
        "createdAt": "2022-03-04T09:26:25.450Z",
        "updatedAt": "2022-03-04T09:26:25.450Z"
    },
    {
        "id": "0b06acd3-d38b-44de-8a95-fcf2692fdef4",
        "firstName": "User_2",
        "lastName": "Name_2",
        "phone": "000-000-000",
        "email": "john@mail.com",
        "createdAt": "2022-03-04T09:26:25.450Z",
        "updatedAt": "2022-03-04T09:26:25.450Z"
    }
]

jest.mock('../../adaptors/db/repo/employee.js', () => ({
    staffRepository: {
        getById: (id) => {return employees.find(employee => employee.id === id) || null},
        find: (searchOptions) => {return employees},
        save: (employee) => { return employee},
        delete: (id) => {return 1}
    }
}));


describe("#staffService", () => {
    describe('#staffService -> getEmployeeById', () => {
        it('should return employee by id', async () => {
            const employee = await staffService.getEmployeeById('0b06acd3-d38b-44de-8a95-fcf2692fdef3');
            expect(employee).toBe(employees[0]);
        })

        it('should return null if employee was not found', async () => {
            const employee = await staffService.getEmployeeById('0000');
            expect(employee).toBe(null);
        })
    });
    describe('#staffService -> getEmployees', () => {
        it('should return list of employees', async () => {
            const employeeList = await staffService.getEmployees();
            expect(employeeList).toEqual(expect.arrayContaining(employees))
        })
    });
    describe('#staffService -> updateEmployee', () => {
        it('should return an updated employee', async () => {
            const employeeId = "0b06acd3-d38b-44de-8a95-fcf2692fdef3";

            const employeeParameters = {
                "firstName": "User_1",
                "lastName": "Name_1",
                "phone": "000-000-000",
                "email": "john@mail.com",
                "createdAt": "2022-03-04T09:26:25.450Z",
                "updatedAt": "2022-03-04T09:26:25.450Z"
            }
            const employee = await staffService.updateEmployee(employeeId, employeeParameters);
            console.log(employees);
            expect(employee).toEqual({
                id: employeeId,
                ...employeeParameters
            })
        })
    });
    describe('#staffService -> addEmployee', () => {
        it('should return a new employee', async () => {
            const data = {
                "firstName": "User_1",
                "lastName": "Name_1",
                "phone": "000-000-000",
                "email": "john@mail.com",
                "createdAt": "2022-03-04T09:26:25.450Z",
                "updatedAt": "2022-03-04T09:26:25.450Z"
            }
            const employee = await staffService.addEmployee(data);
            expect(employee).toHaveProperty('id');

            expect(employee).toEqual({
                id: employee.id,
                ...data
            })
        })
        it('should return a new employee with generated id', async () => {
            const data = {
                "id": "0b06acd3-d38b-44de-8a95-fcf2692fdef3",
                "firstName": "User_1",
                "lastName": "Name_1",
                "phone": "000-000-000",
                "email": "john@mail.com",
                "createdAt": "2022-03-04T09:26:25.450Z",
                "updatedAt": "2022-03-04T09:26:25.450Z"
            }
            const employee = await staffService.addEmployee(data);
            expect(employee).toHaveProperty('id');
            expect(employee.id).not.toEqual(data.id);
        })
    });

    describe('#staffService -> deleteEmployee', () => {
        it('should return list of employees', async () => {
            const count = await staffService.deleteEmployee('0b06acd3-d38b-44de-8a95-fcf2692fdef3');
            expect(count).toEqual(1)
        })
    });
});
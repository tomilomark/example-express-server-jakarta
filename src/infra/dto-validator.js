const Validator = require('jsonschema').Validator;
const v = new Validator();

class DtoValidator {
    validate(dto, schema) {
        const res = v.validate(dto, schema);

        if (!res.valid) {
            throw new Error(`Invalid parameters, DTO: ${JSON.stringify(dto)}, Schema: ${JSON.stringify(schema)}`)
        }
    }
}



module.exports.dtoValidator = new DtoValidator;


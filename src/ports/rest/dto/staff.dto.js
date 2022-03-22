module.exports.employeeDTO = {
    "firstName": {"type": "string"},
    "lastName": {"type": "string"},
    "phone": {"type": "string"},
    "email": {"type": "string"},
    "required": ["firstName", "lastName", "phone", "email"]
}

module.exports.searchDTO = {
    "search": {"type": "string"},
    "limit": {"type": "number"},
    "offset": {"type": "number"},
}

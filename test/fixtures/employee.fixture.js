const sample = {
    "id": "0b06acd3-d38b-44de-8a95-fcf2692fdef3",
    "firstName": "John",
    "lastName": "White",
    "phone": "000-000-000",
    "email": "john@mail.com",
    "createdAt": "2022-03-04T09:26:25.450Z",
    "updatedAt": "2022-03-04T09:26:25.450Z"
}
module.exports.getFixture = (data) => {
    return {
        ...sample,
        ...data
    }
}
const validate = (schema, request) => {
    const value = schema.validate(request);
    if (value.error) {
        console.log("error validation",value.error)
        return false
    }
    return true
}

module.exports = {
    validate
}
export function parserError(error) {
    let errors = {}
    if(error.message.includes("validation failed")){
        Object.values(error.errors).forEach(({properties}) => {
            console.log(properties)
            let path = properties.path
            errors[path] = properties.message
        });
    }
    return errors
}
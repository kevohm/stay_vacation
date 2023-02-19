
const castWithMessageKey = function (schema, options = {}) {
    schema.post('validate', function (error, doc, next) {
        let path = ""
		Object.values(error.errors)
            .filter((fieldError) => {
                path = fieldError.path;
                return fieldError.name === 'CastError'
            })
			.forEach(fieldError => {
				fieldError.message = options.messageKey || `invalid data provided for ${path}`;
			});
		next(error);
	});
};

module.exports =  castWithMessageKey;
const logger = require('./utils/logger')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, _next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    response.status(500).send({ error: error.message })
}

module.exports = {
    unknownEndpoint,
    errorHandler,
}
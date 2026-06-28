const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons)
    })
})

personsRouter.get('/info', (request, response) => {
    Person.estimatedDocumentCount().then((count) => {
        const date = new Date()
        response.send(`
            <p>Phonebook has info for ${count} people</p>
            <p>${date}</p>`)
    })
})

personsRouter.get('/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch((error) => next(error))
})

personsRouter.post('/', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing',
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then((savedPerson) => {
            response.json(savedPerson)
        })
        .catch(next)
})

personsRouter.put('/:id', (request, response, next) => {
    const { name, number } = request.body
    Person.findByIdAndUpdate(request.params.id, { name, number }, { returnDocument: 'after', runValidators: true, context: 'query' })
        .then((updatedPerson) => {
            if (!updatedPerson) {
                return response.status(404).json({ error: 'person not found' })
            }
            response.json(updatedPerson)
        })
        .catch((error) => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch((error) => next(error))
})

module.exports = personsRouter
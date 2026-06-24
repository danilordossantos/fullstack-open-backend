require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()

let persons = []

morgan.token('body', function (req) {
    if (req.body) {
        const { name, number } = req.body
        return JSON.stringify({ name, number })
    }
})

app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then((person) => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
})

app.post('/api/persons', (request, response) => {
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

    person.save().then((savedPerson) => {
        response.json(savedPerson)
    })
})

app.get('/api/info', (request, response) => {
    const count = persons.length
    const date = new Date()
    response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then((person) => {
        response.status(204).end()
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ error: err.message })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

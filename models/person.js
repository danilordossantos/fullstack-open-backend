const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        minLength: 3
    },
    number: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^(\d{2}-\d{6,}|\d{3}-\d{5,})$/.test(v)
            },
            message: 'Number must be in format dd-ddddd or ddd-ddddd'
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
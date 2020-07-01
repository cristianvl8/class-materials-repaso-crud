const mongoose = require('mongoose')
const Schema = mongoose.Schema
    
    const coasterSchema = new Schema({

    name: {
        type: String
    },
    description: {
        type: String
    },

    inversions: {
        type: Number
    },
    length: {
        type: Number
    },
    active:
    {
        type: Boolean
    },
    park: {type: Schema.Types.ObjectId, ref: 'Park'}

}, {
    timestamps: true
})

// Aquí el esquema
const Coaster = mongoose.model("Coaster", coasterSchema)

module.exports = Coaster
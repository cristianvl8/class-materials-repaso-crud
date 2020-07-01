const express = require('express')
const router = express.Router()

const Park = require("../models/park.model")
const Coaster = require("../models/coaster.model")

// Aquí los endpoints
router.get("/new", (req, res) => {
    
    Park
        .find()
        .then(allParks => {
            res.render("coasters/new-coaster", allParks)

        })
        .catch(err => console.log("Error en la BD", err))
})


router.post("/new", (req, res) => {

    const {
        name,
        description,
        inversions,
        length,
        park
    } = req.body

    Coaster
        .create({
            name,
            description,
            inversions,
            length,
            park
        })
        .then(() => res.redirect('coasters/new'))
        .catch(err => console.log("Error en la BD", err))



})


module.exports = router
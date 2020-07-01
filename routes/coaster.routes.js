const express = require('express')
const router = express.Router()

const Park = require("../models/park.model")
const Coaster = require("../models/coaster.model")
const mongoose = require('mongoose')


// Crea una montaña rusa
router.get("/new", (req, res) => {

    Park
        .find()
        .then(allParks => {
            res.render("coasters/new-coaster", {
                allParks
            })

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

        .then(() => res.redirect('/'))
        .catch(err => console.log("Error en la BD", err))

})

// Muestra todas las montañas

router.get("/", (req, res) => {

    
    Coaster
        .find()
        .populate('park')
        .then(allCoasters => {

    
            res.render('coasters/coasters-list', {allCoasters})
                
        })

        .catch(err => console.log("Error", err))
    
     })

router.get("/:id", (req, res) => {

    Coaster
        .findById(req.params.id)
        .populate('park')
    .then(oneCoast => {

        res.render('coasters/coaster-details', oneCoast)
        
    })
           
            .catch(err => console.log("Error", err))
 })

// Elimina las montañas rusas 

router.get("/delete/:id", (req, res) => { 

Coaster
    .findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/coasters/"))
    .catch(err => console.log("Error", err))
})


//Editar las montañas rusas


router.get("/edit/:id", (req, res) => {
    
    Coaster
        .findById(req.params.id)
        .then(theCoaster => {

            res.render('coasters/edit-coaster', theCoaster)
        })

})

router.post("/edit/:id", (req, res) => {

const { name, description, inversions, length, park} = req.body


    Coaster 
        
    .populate('park')
    .findByIdAndUpdate(req.params.id, {
        name, description, inversions, length, park
    })
    .then(() => res.redirect("/coasters/coasters-list"))
    .catch(err => console.log("Error en la BBDD", err))
})


module.exports = router
const { Router } = require("express");
const route = Router();

const LockPin = require("../models/LockPin");

// create a pin, created only if no pin exists
route.post("/createPin", async function(req, res, next) {
    try {
        const inputPin = req.body.pin;
        if(!inputPin) res.status(400).send("Bad request, check given parameters");

        const newPin = {
            pin: inputPin,
        };

        const results = await LockPin.find({});
        console.log(results.length);

        if(results.length === 0) {
            LockPin.create(newPin);
            res.status(200).send("New pin created")
            console.log("New pin created");
            
        } else {
            res.status(409).send("Bad request, resource already exists");
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
})

// verify pin entered by user
route.get("/verifyPin", async function( req, res, next) {
    try {
        const inputPin = req.body.pin;
        if(!inputPin) res.status(400).send("Bad request, check given parameters");

        const results = await LockPin.find({ pin : inputPin});
        console.log(results.length);

        if(results.length === 1) {
            console.log("pin verified");
            res.status(200).send("Pin Verification successful");
        } else {
            res.status(401).send("Pin could not be verified");
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
})

// check if a pin exists or not, find pin, status api
route.get("/pinStatus", async function(req, res, next) {
    try {
        const results = await LockPin.find({});
        console.log(results.length);

        if(results.length !== 0) {
            console.log("pin exists");
            res.status(200).send("Pin exists");
        } else {
            res.status(404).send("Pin does not exist");
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = route;
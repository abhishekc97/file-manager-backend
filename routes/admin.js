const { Router } = require("express");
const route = Router();

const LockPin = require("../models/LockPin");

// create a pin, created only if no pin exists
route.post("/create-pin", async function (req, res, next) {
    try {
        const inputPin = req.body.pin;
        if (!inputPin)
            res.status(400).send("Bad request, check given parameters");

        const newPin = {
            pin: inputPin,
        };

        const results = await LockPin.find({});

        if (results.length === 0) {
            LockPin.create(newPin);
            res.status(200).send("New pin created");
        } else {
            res.status(409).send("Bad request, resource already exists");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// verify pin entered by user
route.post("/verify-pin", async function (req, res, next) {
    try {
        const inputPin = req.body.pin;
        if (!inputPin)
            res.status(400).send("Bad request, check given parameters");

        const results = await LockPin.find({ pin: inputPin });

        if (results.length === 1) {
            res.status(200).send("Pin Verification successful");
        } else {
            res.status(401).send("Pin could not be verified");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// check if a pin exists or not, find pin, status api
route.get("/pin-status", async function (req, res, next) {
    try {
        const results = await LockPin.find({});

        if (results.length !== 0) {
            res.status(200).send("Pin exists");
        } else {
            res.status(404).send("Pin does not exist");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// modify an existing pin
route.post("/change-pin", async function (req, res, next) {
    try {
        const inputPin = req.body.pin;
        if (!inputPin)
            res.status(400).send("Bad request, check given parameters");

        const newPin = {
            pin: inputPin,
        };

        const results = await LockPin.find({});

        if (results.length === 1) {
            await LockPin.updateOne({ $set: { pin: inputPin } });
            res.status(200).send("Pin updated");
        } else {
            res.status(409).send("Bad request, could not update pin.");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = route;

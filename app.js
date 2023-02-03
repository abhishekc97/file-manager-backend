const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const initializeDatabase = require("./config/mongodb.js");
const cors = require("cors");

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const app = express();
app.use(express.json());
app.use(express.urlencoded( { extended: true}));
app.use(cors());

initializeDatabase();

app.listen(port, function(req, res) {
    console.log(`Express server started at https://${host}:${port}`);
});

app.get("/", function(req, res) {
    res.send("App started");
});

app.get("/api/health", function(req, res) {
    res.send(`Backend server is active as of time: ${new Date()}`)
});

/** Admin route. Provides API's to create pin, verify pin, check pin availability status, update pin */
const admin = require("./routes/admin");
app.use("/api/admin", admin);

/** Operations route. provides API's to create folder, create file and update file contents */
const operations = require("./routes/operations");
app.use("/api/operations", operations);


/** DO NOT WRITE ANY REGULAR API BELOW THIS */

// error handler middleware
app.use((req, res, next) => {
    const err = new Error("not found");
    err.status = 404;
    next(err);
});

// express error handler, wherever next is passed, this handles those errors
app.use((err, req, res, next) => {
    res.status(err.status || 500); // sets 500 if no error code is set
    res.send({
        error: { status: err.status || 500, message: err.message },
    });
});

/** DO NOT WRITE ANY API BELOW THIS */
const { Router } = require("express");
const route = Router();

const Folder = require("../models/Folder");
const File = require("../models/File");

// create a folder
route.post("/new-folder", async function (req, res, next) {
    try {
        const folderName = req.body.name;
        if (!folderName)
            res.status(400).send("Bad request, check given parameters");

        const newFolder = {
            name: folderName,
        };

        await Folder.create(newFolder);

        res.status(200).send("New folder created");
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// get all folders
route.get("/folders", async function (req, res, next) {
    try {
        const results = await Folder.find({});
        res.json(results);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// create a file with a name
route.post("/new-file", async function (req, res, next) {
    try {
        const fileName = req.body.name;
        if (!fileName)
            res.status(400).send("Bad request, check given parameters");

        const folderName = req.body.folder;
        if (!folderName)
            res.status(400).send("Bad request, check given parameters");

        const newFile = {
            name: fileName,
            folder: folderName,
        };

        await File.create(newFile);

        res.status(200).send("New file created");
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// add contents to a file
route.post("/edit-file", async function (req, res, next) {
    try {
        const fileId = req.body.id;
        if (!fileId)
            res.status(400).send("Bad request, check given parameters");

        const fileContents = req.body.contents;

        const fileFound = await File.findOne({ _id: fileId });

        if (fileFound) {
            await File.updateOne(
                { _id: fileId },
                { $set: { contents: fileContents } }
            );
            res.status(200).send("Updated the file contents");
        } else {
            res.status(200).send("could not find file to update contents");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// api to get all files in a particular folder
route.get("/folder/:folder/files", async function (req, res, next) {
    try {
        const folderName = req.params.folder;
        if (!folderName)
            res.status(400).send("Bad request, check given parameters");

        const results = await File.find({ folder: { $in: [folderName] } });
        res.json(results);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// api to get a particular file with its id
route.get("/file/:fileId", async function (req, res, next) {
    try {
        const fileId = req.params.fileId;
        if (!fileId)
            res.status(400).send("Bad request, check given parameters");

        const results = await File.find({ _id: fileId });
        res.json(results);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// get all files from files collection
route.get("/files", async function (req, res, next) {
    try {
        const results = await File.find({});

        if (results) res.json(results);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = route;

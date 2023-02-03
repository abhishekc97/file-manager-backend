const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
    {
        name: {type: String, required: true },
        contents: { type: String },
        folder: { type: String, required: true},
    },
    { timestamps: true}
)

const File = mongoose.model("File", fileSchema);

module.exports = File;
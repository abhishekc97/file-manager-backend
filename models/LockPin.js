const mongoose = require("mongoose")

const lockPinSchema = new mongoose.Schema(
    {
        pin: { type: Number, required: true },
    }, 
    { timestamps: true}
);

const LockPin = mongoose.model("LockPin", lockPinSchema);

module.exports = LockPin;
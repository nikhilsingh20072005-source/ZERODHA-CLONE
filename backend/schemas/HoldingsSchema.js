const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
});

module.exports = { HoldingsSchema };









// const { model } = require("mongoose");

// const { HoldingsSchema } = require("../schemas/HoldingsSchema");

// const HoldingsModel = new model("holding", HoldingsSchema);

// module.exports = { HoldingsModel };
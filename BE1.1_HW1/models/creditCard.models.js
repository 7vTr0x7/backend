const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema({
  creditCardNumber: Number,
  cardLimit: Date,
  cardHoldersName: String,
});

const CreditCard = mongoose.model("CreditCard", creditCardSchema);

module.exports = CreditCard;

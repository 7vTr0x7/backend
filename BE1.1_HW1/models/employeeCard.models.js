const mongoose = require("mongoose");

const employeeCarSchema = new mongoose.Schema({
  fullName: String,
  designation: String,
  profileImgURL: String,
  idNumber: Number,
  dob: Date,
  contactNumber: Number,
  address: String,
});

const Employee = mongoose.model("Employee", employeeCarSchema);

module.exports = Employee;

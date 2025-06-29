const mongoose = require("mongoose");

const productDetailsSchema = new mongoose.Schema({ 
    brandModel: { 
        type: String,
    },
    yearOfManufacture: {
        type: String,
    },
    fuelType:{
        type: String,
    },
    transmission: {
        type: String,
    },
    vehicleType: {
        type: String,
    },
    seatingCapacity: {
        type: String,
    },
    mileage: {
        type: String,
    },
    bodyType: {
        type: String,
    },
    color: [{
        type: String,
    }],
    engineCapacity: {
        type: String,
    },
    powerOutput: {
        type: String,
    },
    torque: {
        type: String,
    },
    topSpeed: {
        type: String,
    },
    acceleration: {
        type: String,
    },
    fuelTankCapacity: {
        type: String,
    },
    groundClearance: {
        type: String,
    },
    odometerReading: {
        type: String,
        default: "0",
    },
    numberOfOwners: {
        type: String,
        default: "0",
    },
    accidentHistory: [{
        type: String,
    }],
    serviceHistory: [{
        type: String,
    }],
    tyreType: {
        type: String,
    }
})

module.exports = mongoose.model("ProductDetails", productDetailsSchema)
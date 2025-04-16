require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
/*app.use(cors({
  origin: 'https://kind-dune-0d59eb210.6.azurestaticapps.net/'
}));
*/
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.log("Database connection error: ", err));

const dataSchema = mongoose.Schema({
    _id: Number,
    name: String,
    location: String,
    latitude: Number,
    longitude: Number,
    report: String,
    disaster_level: String,
    date: Date
});

const dataModel = mongoose.model("Classified_Data", dataSchema, "Classified_Data");

app.get("/getData", async (req, res) => {
    const Data = await dataModel.find();
    res.json(Data);
});

app.listen(process.env.PORT ||8080, () => {
    console.log("Server is Running");
});

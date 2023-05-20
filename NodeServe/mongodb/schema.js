// const mongoose = require("mongoose");


const Thought = require("./models/Thought.js");
const Icon = require("./models/Icon.js");
const User = require("./models/User.js");
const Emotion = require("./models/Emotion.js");
const Affair = require("./models/Affair.js");
const AffairRecord = require("./models/AffairRecord.js");


module.exports = {
    Thought,
    Icon,
    User,
    Emotion,
    Affair,
    AffairRecord
};

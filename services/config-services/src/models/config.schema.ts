import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
    param: String,
    value: Number,
});

const Config = mongoose.model("Config", configSchema);

export default Config;
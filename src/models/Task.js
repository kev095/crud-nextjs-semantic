import {Schema, model, models } from "mongoose";

const taskSchema =new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

export default models.Task || model('Task', taskSchema);
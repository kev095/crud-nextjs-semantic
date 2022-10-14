import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const {
        method,
        body,
        query: {id},
    } = req;
    
    switch (method) {
        case "GET":
            try {
                const task = await Task.findById(id);
                if(!task) return res.status(404).json({msg: "task no found."});
                return res.status(200).json(task);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "PUT":
            try {
                const taskUpdate = await Task.findByIdAndUpdate(id, body, {new: true});
                if (!taskUpdate) return res.status(404).json({msg: "Task not found"});
                return res.status(200).json(taskUpdate);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "DELETE":
            try {
                const deletedTask = await Task.findByIdAndDelete(id);
                if(!deletedTask) return res.status(404).json({msg: "Task not found"});
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
        default:
            break;
    }
}
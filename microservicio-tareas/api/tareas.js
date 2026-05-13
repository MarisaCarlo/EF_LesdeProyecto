import connectDB from "../lib/db.js";
import Tarea from "../models/Tarea.js";

export default async function handler(req, res) {
    try {
        await connectDB();

        if (req.method === "GET") {
            const tareas = await Tarea.find();
            return res.status(200).json(tareas);
        }

        if (req.method === "POST") {
            const nueva = await Tarea.create(req.body);
            return res.status(201).json(nueva);
        }

        res.status(405).json({ message: "Método no permitido" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error en tareas API" });
    }
}
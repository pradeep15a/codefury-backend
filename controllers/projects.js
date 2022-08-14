import ProjectData from "../models/projectDataModel.js";

export const createProject = async(req,res) => {
    const project = req.body;
    const newProject = new ProjectData({ ...project, creator : req.clientName, postedAt : new Date().toISOString() });

    try {
        await newProject.save();

        res.status(200).json(newProject);
    } catch (error) {
        res.status(409).json({message :error.message});
    }
} 

export const fetchProjects = async (req, res) => {
    try {
        const projects = await ProjectData.find();

        res.status(203).json(projects);
    } catch (error) {
        res.status(404).json({ message : error.message });
    }
}

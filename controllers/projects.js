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

        res.status(200).json({ data : projects });
    } catch (error) {
        res.status(404).json({ message : error.message });
    }
}

export const invest = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.send(404).json({ message: "Unauthenticated" })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No project with id: ${id}`);

    const project = await ProjectData.findById(id);

    const index = project.investors.findIndex((id) => id === String(req.name));

    if (index === -1) {
        project.investors.push(req.name);
    } 
    else {
        project.investors = project.investors.filter((id) => id !== String(req.name))
    }
    const updatedProject = await PostMessage.findByIdAndUpdate(id, project, { new: true });

    res.json(updatedProject);
}
const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        // With Cloudinary, req.file.path contains the URL
        const image = req.file ? req.file.path : '';

        const newProject = new Project({
            name,
            description,
            image
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error in createProject:', error);
        res.status(500).json({ message: 'Server error creating project', error: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: error.message });
    }
};

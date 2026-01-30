const Client = require('../models/Client');

exports.createClient = async (req, res) => {
    try {
        const { name, description, designation } = req.body;
        // With Cloudinary, req.file.path contains the URL
        const image = req.file ? req.file.path : '';

        const newClient = new Client({
            name,
            description,
            designation,
            image
        });

        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

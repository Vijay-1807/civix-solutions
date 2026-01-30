const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
    try {
        const { fullname, email, mobile, city } = req.body;

        const newContact = new Contact({
            fullname,
            email,
            mobile,
            city
        });

        await newContact.save();
        res.status(201).json({ message: 'Contact saved successfully', contact: newContact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

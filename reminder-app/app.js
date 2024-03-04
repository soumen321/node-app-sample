const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/reminders', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Reminder model
const Reminder = mongoose.model('Reminder', {
    title: String,
    description: String,
    date: Date
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/reminders', async (req, res) => {
    try {
        const reminders = await Reminder.find();
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/reminders', async (req, res) => {
    const { title, description, date } = req.body;

    const reminder = new Reminder({
        title,
        description,
        date
    });

    try {
        const newReminder = await reminder.save();
        res.status(201).json(newReminder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

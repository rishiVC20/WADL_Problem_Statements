const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Student = require('./studentModel');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

// a) Create DB: "student" (auto-created when connecting)

// d) Count + list all students
app.get('/api/students', async (req, res) => {
  const count = await Student.countDocuments();
  const students = await Student.find();
  res.json({ count, students });
});

// e) Students with >20 in DSBDA
app.get('/api/dsbda', async (req, res) => {
  const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
  res.json(students);
});

// f) Update marks of specified student (by roll no) by 10
app.put('/api/update/:roll', async (req, res) => {
  const roll = req.params.roll;
  await Student.updateOne({ Roll_No: roll }, {
    $inc: {
      WAD_Marks: 10,
      CC_Marks: 10,
      DSBDA_Marks: 10,
      CNS_Marks: 10,
      AI_Marks: 10
    }
  });
  res.send('Marks updated by 10');
});

// g) Students with >25 in all
app.get('/api/topall', async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_Marks: { $gt: 25 }
  });
  res.json(students);
});

// h) Less than 40 in both Maths and Science (Assume CNS & AI are these)
app.get('/api/weak', async (req, res) => {
  const students = await Student.find({
    CNS_Marks: { $lt: 40 },
    AI_Marks: { $lt: 40 }
  });
  res.json(students);
});

// i) Remove student by roll
app.delete('/api/delete/:roll', async (req, res) => {
  await Student.deleteOne({ Roll_No: req.params.roll });
  res.send('Student removed');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

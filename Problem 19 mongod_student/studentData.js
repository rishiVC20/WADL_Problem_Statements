const mongoose = require('mongoose');
const Student = require('./studentModel');

mongoose.connect('mongodb://localhost:27017/student', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const data = [
  { Name: "ABC", Roll_No: "111", WAD_Marks: 25, CC_Marks: 25, DSBDA_Marks: 25, CNS_Marks: 25, AI_Marks: 25 },
  { Name: "XYZ", Roll_No: "112", WAD_Marks: 18, CC_Marks: 22, DSBDA_Marks: 29, CNS_Marks: 35, AI_Marks: 39 },
  { Name: "PQR", Roll_No: "113", WAD_Marks: 28, CC_Marks: 27, DSBDA_Marks: 26, CNS_Marks: 45, AI_Marks: 41 }
];

Student.insertMany(data).then(() => {
  console.log("Data inserted");
  mongoose.connection.close();
});

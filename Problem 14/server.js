// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const app = express();
// const PORT = 3000;

// Serve static files from /public
// app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to serve user data
// app.get('/api/users', (req, res) => {
//   fs.readFile('users.json', 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error reading file' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

const express=require('express');
const path=require('path');
const PORT=3000;
const app=express();
const fs=require('fs');

app.get('/api/users', (req,res)=>{
    console.log("^^^^^^^^");
    fs.readFile('users.json','utf-8',(err,data)=>{
        if(err){
            return res.status(500).json({error:'Error reading file'})
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});

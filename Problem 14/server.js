const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname,'public'))); // serve frontend from /public folder

// API to return user data
// app.get('/api/users', (req, res) => {
//   fs.readFile('./users.json', 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).send({ error: 'Could not read user data' });
//     }
//     res.send(JSON.parse(data));
//   });
// });

app.get('/api/users',(req,res)=>{
    fs.readFile('./users.json','utf8',(err,data)=>{
        if(err){
            return res.status(500).send({error:'Could not read user data'});

        }
        return res.status(200).send(JSON.parse(data));
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

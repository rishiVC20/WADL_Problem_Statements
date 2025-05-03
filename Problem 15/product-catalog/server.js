const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// API to get products
app.get('/api/products', (req, res) => {
    fs.readFile('./products.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read products' });
        res.json(JSON.parse(data));
    });
});

// app.get('/api/products',(req,res)=>{
//     fs.readFile('./products.json','utf-8',(err,data)=>{
//         if(err){
//             return res.status(500).json({error:'Failed to read products'});
//         }

//         return res.status(200).json(JSON.parse(data));
//     });
// });

// Start server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
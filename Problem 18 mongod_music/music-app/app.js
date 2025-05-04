// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const PORT = 3000;

// app.set('view engine', 'ejs');  // for rendering HTML
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // 1. Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/music', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("Connected to MongoDB")).catch(err => console.log(err));

// // 2. Define schema
// const songSchema = new mongoose.Schema({
//     songname: String,
//     film: String,
//     music_director: String,
//     singer: String,
//     actor: String,
//     actress: String
// });

// const Song = mongoose.model("Song", songSchema);

// // 3. Insert initial 5 songs only once
// app.get('/insert', async (req, res) => {
//     const songs = [
//         { songname: "A", film: "F1", music_director: "AR Rahman", singer: "Arijit" },
//         { songname: "B", film: "F2", music_director: "Pritam", singer: "KK" },
//         { songname: "C", film: "F3", music_director: "AR Rahman", singer: "Shreya" },
//         { songname: "D", film: "F4", music_director: "Anu Malik", singer: "Arijit" },
//         { songname: "E", film: "F5", music_director: "Pritam", singer: "Arijit" }
//     ];
//     await Song.insertMany(songs);
//     res.send("Inserted 5 songs.");
// });

// // 4. Count & List all songs
// app.get('/', async (req, res) => {
//     const songs = await Song.find();
//     const count = await Song.countDocuments();
//     res.render('index', { songs, count });
// });

// // 5. List songs by Music Director
// app.get('/director/:name', async (req, res) => {
//     const songs = await Song.find({ music_director: req.params.name });
//     res.json(songs);
// });

// // 6. List songs by Music Director + Singer
// app.get('/director/:dir/singer/:singer', async (req, res) => {
//     const { dir, singer } = req.params;
//     const songs = await Song.find({ music_director: dir, singer: singer });
//     res.json(songs);
// });

// // 7. Delete a song (by songname)
// // app.delete('/delete/:songname', async (req, res) => {
// //     await Song.deleteOne({ songname: req.params.name });
// //     res.send("Deleted song.");
// // });

// app.get('/delete/:songName', async (req, res) => {
//     const songName = req.params.songName;
//     try {
//         await Song.deleteOne({ Songname: songName });
//         res.redirect('/');
//     } catch (err) {
//         res.status(500).send("Error deleting song: " + err);
//     }
// });


// // 8. Add new song (favorite)
// app.post('/add', async (req, res) => {
//     const { songname, film, music_director, singer } = req.body;
//     const song = new Song({ songname, film, music_director, singer });
//     await song.save();
//     res.send("Added new song.");
// });

// // 9. List songs by Singer + Film
// app.get('/film/:film/singer/:singer', async (req, res) => {
//     const { film, singer } = req.params;
//     const songs = await Song.find({ film, singer });
//     res.json(songs);
// });

// // 10. Update song with actor + actress
// app.put('/update/:name', async (req, res) => {
//     const { actor, actress } = req.body;
//     await Song.updateOne({ songname: req.params.name }, { actor, actress });
//     res.send("Updated actor and actress.");
// });

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });


// music_app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define song schema
const songSchema = new mongoose.Schema({
    songname: String,
    film: String,
    music_director: String,
    singer: String,
    actor: String,
    actress: String
});

const Song = mongoose.model("Song", songSchema);

// Insert 5 songs initially (only once)
app.get('/insert', async (req, res) => {
    try {
        const existing = await Song.countDocuments();
        if (existing >= 5) return res.send("Songs already inserted.");

        const songs = [
            { songname: "A", film: "F1", music_director: "AR Rahman", singer: "Arijit" },
            { songname: "B", film: "F2", music_director: "Pritam", singer: "KK" },
            { songname: "C", film: "F3", music_director: "AR Rahman", singer: "Shreya" },
            { songname: "D", film: "F4", music_director: "Anu Malik", singer: "Arijit" },
            { songname: "E", film: "F5", music_director: "Pritam", singer: "Arijit" }
        ];
        await Song.insertMany(songs);
        res.send("Inserted 5 songs.");
    } catch (err) {
        res.status(500).send("Error inserting songs: " + err);
    }
});

// Display all songs and count
app.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        const count = await Song.countDocuments();
        res.render('index', { songs, count });
    } catch (err) {
        res.status(500).send("Error retrieving songs: " + err);
    }
});

// List songs by Music Director
app.get('/director/:name', async (req, res) => {
    try {
        const songs = await Song.find({ music_director: req.params.name });
        res.json(songs);
    } catch (err) {
        res.status(500).send("Error fetching songs: " + err);
    }
});

// List songs by Music Director and Singer
app.get('/director/:dir/singer/:singer', async (req, res) => {
    try {
        const { dir, singer } = req.params;
        const songs = await Song.find({ music_director: dir, singer });
        res.json(songs);
    } catch (err) {
        res.status(500).send("Error fetching songs: " + err);
    }
});

// Delete a song
app.delete( '/delete/:songname', async (req, res) => {
    try {
        await Song.deleteOne({ songname: req.params.songname });
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error deleting song: " + err);
    }
});

// Add new favorite song
app.post('/add', async (req, res) => {
    try {
        const { songname, film, music_director, singer } = req.body;
        const song = new Song({ songname, film, music_director, singer });
        await song.save();
        res.send("Added new song.");
    } catch (err) {
        res.status(500).send("Error adding song: " + err);
    }
});

// List songs by Singer and Film
app.get('/film/:film/singer/:singer', async (req, res) => {
    try {
        const { film, singer } = req.params;
        const songs = await Song.find({ film, singer });
        res.json(songs);
    } catch (err) {
        res.status(500).send("Error fetching songs: " + err);
    }
});

// Update song with actor and actress
app.put('/update/:songname', async (req, res) => {
    try {
        const { actor, actress } = req.body;
        await Song.updateOne({ songname: req.params.songname }, { actor, actress });
        res.send("Updated actor and actress.");
    } catch (err) {
        res.status(500).send("Error updating song: " + err);
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

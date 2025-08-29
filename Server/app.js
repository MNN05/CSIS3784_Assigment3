import express from 'express';
import path from 'path'; // For handlinf file paths

const app = express();
const port = 3000; //You can choany available port

//Serve static files (like your HTML, CSS, and JS) from a directory
app.use(express.static(path.join(process.cwd(), 'public')));

//Define a route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
})

//Start the server
app.listen(port, () => {
    console.log(`Server listening ast http://localhost:${port}`)
})
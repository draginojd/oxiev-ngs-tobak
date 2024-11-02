const express = require('express');

const app = express();

const PORT = process.PORT || 4000;



app.use(express.json());

// Route för att logga sidbesök för hem-sidan
app.post('/api/home', (req, res) => {
    console.log("Visited: /home");
    res.send({ message: "Tracked visit to Home" });
});

// Route för att logga sidbesök för om-oss-sidan
app.post('/api/aboutus', (req, res) => {
    console.log("Visited: /about");
    res.send({ message: "Tracked visit to About Us" });
});

// Route för att logga sidbesök för kontakt-sidan
app.post('/api/contact', (req, res) => {
    console.log("Visited: /contact");
    res.send({ message: "Tracked visit to Contact" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

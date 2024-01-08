const express = require("express");
const path = require('path');
const app = express();

app.use(express.static('src'));
const PORT = process.env.PORT | 5000;

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname, 'word-game.html'));
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

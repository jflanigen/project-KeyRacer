const express = require("express");
const path = require('path');
const app = express();

const PORT = process.env.PORT || 443;

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname, 'word-game.html'));
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

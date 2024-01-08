const express = require("express")
const app = express();

const PORT = process.env.PORT | 5000;

const open = require('open');
open('word-game.html');

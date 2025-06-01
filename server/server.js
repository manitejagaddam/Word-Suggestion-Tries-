// import express from "express";
// import fs from "fs";
// import { Trie } from "./logic.js";

// const app = express();
// const PORT = 3000;

// const trie = new Trie();

// const words = fs.readFileSync("./words.txt", "utf-8").split(/\r?\n/);
// for (let word of words) {
// 	if (word.trim()) trie.insert(word.trim());
// }

// app.get("/suggest", (req, res) => {
// 	const prefix = req.query.prefix || "";
// 	const suggestions = trie.getSuggestions(prefix, 10); 
// 	res.json(suggestions);
// });

// app.listen(PORT, () => {
// 	console.log(`Server is running at http://localhost:${PORT}`);
// });



import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Trie } from "./logic.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const trie = new Trie();

// 🧠 Use absolute path to load words.txt safely
const wordsPath = path.join(__dirname, "words.txt");
const words = fs.readFileSync(wordsPath, "utf-8").split(/\r?\n/);

for (let word of words) {
	if (word.trim()) trie.insert(word.trim());
}

app.get("/suggest", (req, res) => {
	const prefix = req.query.prefix || "";
	const suggestions = trie.getSuggestions(prefix, 10); 
	res.json(suggestions);
});

app.listen(PORT, () => {
	console.log(`✅ Server is running at http://localhost:${PORT}`);
});

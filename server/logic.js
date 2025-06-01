export class TrieNode {
	constructor() {
		this.children = {};
		this.isEndOfWord = false;
	}
}

export class Trie {
	constructor() {
		this.root = new TrieNode();
	}

	insert(word) {
		let node = this.root;
		for (let char of word.toLowerCase()) {
			if (!node.children[char]) node.children[char] = new TrieNode();
			node = node.children[char];
		}
		node.isEndOfWord = true;
	}

	getSuggestions(prefix, limit = 5) {
		let node = this.root;
		for (let char of prefix.toLowerCase()) {
			if (!node.children[char]) return [];
			node = node.children[char];
		}

		const results = [];
		const dfs = (currNode, path) => {
			if (results.length >= limit) return;
			if (currNode.isEndOfWord) results.push(path);
			for (let ch in currNode.children) {
				dfs(currNode.children[ch], path + ch);
			}
		};

		dfs(node, prefix.toLowerCase());
		return results;
	}
}

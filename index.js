const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
let documents = [
  {
    name: "Document.md",
    content:
      "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
    createdAt: "01-08-2022",
    id: "1",
  },
  {
    name: "new-doc.md",
    content:
      "### start create your new Mardown document\n- practice \n- stay calm\n- stay focus",
    createdAt: "03-08-2022",
    id: "W2bcGEV",
  },
  {
    name: "untitled-document.md",
    content: "### start create your new Markdown document",
    createdAt: "11-08-2022",
    id: "PJ-DYEb",
  },
];

// METHOD: GET, PATH "/documents"
// getDocuments
app.get("/documents", (req, res) => {
  res.send(documents);
});
// METHOD: GET, PATH "/documents/id"
// getCurrentDoc

app.get("/documents/:id", (req, res) => {
  res.send(documents.find((doc) => doc.id === req.params.id));
});
// METHOD: POST, PATH "/documents"
// createDocument

app.post("/documents", (req, res) => {
  let createdTime = new Date();
  let dd = String(createdTime.getDate()).padStart(2, "0");
  let mm = String(createdTime.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = createdTime.getFullYear();
  createdTime = dd + "-" + mm + "-" + yyyy;
  const newDocument = {
    name: "untitled-document.md",
    content: "### DOCUMENT FROM IPI",
    createdAt: createdTime,
    id: Math.random().toString(16).slice(2),
  };
  res.json(newDocument);
  documents = [...documents, newDocument];
});

// METHOD: PATCH, PATH "/documents"
// Send back: "UPDATE document"

app.patch("/documents/:id", (req, res) => {
  documents = documents.map((doc) => {
    if (doc.id === req.params.id) {
      return req.body;
    } else {
      return doc;
    }
  });
  res.json(req.body);
});

// METHOD: DELETE, PATH "/documents"
app.delete("/documents/:id", (req, res) => {
  res.send("delete something");
  const newDocuments = documents.filter((document) => {
    return document.id !== req.params.id;
  });
  documents = newDocuments;
});

// How to test? use postman

app.listen(port, () => {
  console.log("listening on port", port);
});

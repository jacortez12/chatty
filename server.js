
const express = require("express");
const mongoose = require("mongoose");
const parser = require("body-parser");
const app = express();
const port = 3000;

const mongodbURL = "mongodb://127.0.0.1:27017/chatty";
mongoose.connect(mongodbURL, {useNewUrlParser: true});
mongoose.connection.on("error", () => {
    console.log("connection error");
});

var Schema = mongoose.Schema;
var ChatMessageSchema = new Schema({
  time: Number,
  alias: String,
  message: String
});
var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

app.use(express.static("public_html"));
app.use(parser.json());

app.get("/chats", (req, res) => {
    let p = ChatMessage.find({}, {
        _id: 0,
        time: 1,
        alias: 1,
        message: 1
    }).sort({time: 1}).exec();
    p.then((messages) => {
        processMessages(messages, res);
    });
});

function processMessages(documents, res) {
    let result = "";
    for (let i = 0; i < documents.length; i++) {
        let alias = documents[i].alias;
        let message = documents[i].message;
        result += "<b>" + alias + ": " + "</b>"; 
        result += "<span>" + message + "</span>";
        result += "<br>"
    }
    res.send(result);
}

app.post("/chats/post", (req, res) => {
    let newMessage = new ChatMessage(req.body);
    let p = newMessage.save();
    p.then((response) => {
        res.send("Saved successfully");
    });
    p.catch((err) => {
        console.log("Error Saving message");
        console.log(err);
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});



function postMessage() {
    var alias = document.getElementById("alias").value;
    var message = document.getElementById("message");
    var messageText = message.value;
    message.value = "";

    var reqObj = {time: Date.now(), alias: alias, message: messageText};
    let p = fetch("http://localhost:3000/chats/post", {
        method: "POST",
        body: JSON.stringify(reqObj),
        headers: {"Content-Type": "application/json"}
    });

    p.then((response) => {
        return response.text();
    }).then((text) => {
        console.log(text);
    }).catch((err) => {
        console.log(err);
    });
}

function getMessages() {
    let p = fetch("http://localhost:3000/chats");
    p.then((response) => {
        return response.text();
    }).then((html) => {
        var chatArea = document.getElementById("chatArea");
        chatArea.innerHTML = html;
    }).catch((err) => {
        console.log(err);
    });
}

setInterval(getMessages, 1000);
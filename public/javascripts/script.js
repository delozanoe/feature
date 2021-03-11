const ws = new WebSocket("ws://localhost:3001");

ws.onmessage = (msg) => {
  console.log("Esto esta como interesante");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:3000/chat/api/messages", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      renderMessages(JSON.parse(result));
    })
    .catch((error) => console.log("error", error));
};

const renderMessages = (data) => {
  console.log(data.id);
  const html = data
    .map(
      (item) =>
        `<p> Mensaje:${item.message}, Author: ${item.author}, ts: ${item.ts} `
    )
    .join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    message: document.getElementById("message").value,
    author: document.getElementById("author").value,
    ts: document.getElementById("ts").value,
  });
  console.log(raw);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/chat/api/messages", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  const message = document.getElementById("message");
  const author = document.getElementById("author");
  const ts = document.getElementById("ts");
  ws.send(message.value);
  author.value = "";
  ts.value = "";
  message.value = "";
};
/**
 * For put the message
 */
const handleSubmitPut = (evt) => {
  evt.preventDefault();
  var myHeaders = new Headers();
  const messagePut = document.getElementById("messagePut");
  const authorPut = document.getElementById("authorPut");
  const tsPut = document.getElementById("tsPut");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    message: messagePut,
    author: authorPut,
  });
  console.log(raw);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch("http://localhost:3000/chat/api/messages/"+tsPut, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      if(result == 'The message with the given tf was not found.'){
        document.getElementById("errorPut").textContent = 'Error: tf was not found';
      }
      
    })
    .catch((error) => console.log("error", error));
  
  ws.send(message.value);
  messagePut.value = "";
  tsPut.value = "";
  messagePut.value = "";
};

/**
 * For get message
 */
const handleSubmitGet = (evt) =>{
  evt.preventDefault();
  const tsGet = document.getElementById("tsGet")
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:3000/chat/api/messages/"+ tsGet, requestOptions)
    .then(response => response.text())
    .then(result => {
      if(result == 'The message with the given tf was not found.'){
        document.getElementById("errorPut").textContent = 'Error: tf was not found';
      }
    })
    .catch(error => console.log('error', error));
};
const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

const formPut = document.getElementById("put");
formPut.addEventListener("submit",handleSubmitPut);

//Lets try this

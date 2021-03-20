(function connect() {
  let socket = io.connect("http://localhost:3000");

  let message = document.querySelector("#message");
  let messageBtn = document.querySelector("#messageBtn");
  let messageList = document.querySelector("#message-list");

  messageBtn.addEventListener("click", (e) => {
    console.log(message.value);
    socket.emit("new_message", { message: message.value });
    message.value = "";
  });

  socket.on("receive_message", (data) => {
    console.log(data);
    if (data.message != "") {
      let listItem = document.createElement("div");
      listItem.classList.add("list-group-item");
      messageList.appendChild(listItem);
      listItem.textContent = data.username + ": " + data.message;
    }
  });

  let info = document.querySelector(".typing");

  message.addEventListener("keypress", (e) => {
    socket.emit("typing");
  });

  socket.on("typing", (data) => {
    info.textContent = data.username + " is typing..";
    setTimeout(() => {
      info.textContent = "";
    }, 3000);
  });
})();

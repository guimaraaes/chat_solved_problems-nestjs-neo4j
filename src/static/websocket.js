const socket = io('http://localhost:3001/');
// console.log(location.search);
socket.on('connection', data => console.log(data));
wssCanel = new URL(location.href).searchParams.getAll('id_users');
wssCanel = wssCanel.sort();
wssCanel = wssCanel.map(Number)
console.log((wssCanel));

socket.on(wssCanel, data => {
  if (data.id_user == Number(id)) {
    document.getElementById('chat_people_websoket').innerHTML += `
    <div class="container ">
      <p>${data.chatMessage.name_user}: ${data.chatMessage.message}</p>
      <span class="time-right">${data.chatMessage.date}</span>
    </div>`;
  } else {
    document.getElementById('chat_people_websoket').innerHTML += `
    <div class="container darker">
      <p>${data.chatMessage.name_user}: ${data.chatMessage.message}</p>
      <span class="time-left">${data.chatMessage.date}</span>
    </div>`;
  }
});
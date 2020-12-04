const socket = io('http://localhost:3001/');
// console.log(location.search);
socket.on('connection', data => console.log(data));
wssCanel = new URL(location.href).searchParams.getAll('id_users');
wssCanel = wssCanel.sort();
wssCanel = wssCanel.map(Number)
// console.log((wssCanel));
socket.on('wsChannel', data => console.log(data));

socket.on('wsChannel', data => {
  alert('veio')
  if (data.id_user == Number(125)) {
    document.getElementById('chat_people_websoket').innerHTML += `
    <div class="container ">
      <p>${data.name_user}: ${data.message}</p>
      <span class="time-right">${data.date}</span>
    </div>`;
  } else {
    document.getElementById('chat_people_websoket').innerHTML += `
    <div class="container darker">
      <p>${data.name_user}: ${data.message}</p>
      <span class="time-left">${data.date}</span>
    </div>`;
  }
});
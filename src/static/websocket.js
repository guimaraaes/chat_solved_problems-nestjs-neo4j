const socket = io('http://localhost:3001/');

      socket.on('connection', data => console.log(data));
      socket.on('newMessage', data => {
        // console.log(data);
        document.getElementById('chat_people_websoket').innerHTML += `
        <div class="container darker">
          <p>${data.name_user}: ${data.message}</p>
          <span class="time-left">${data.date}</span>
        </div>
        `;
      });
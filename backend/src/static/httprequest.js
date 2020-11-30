function makeRequest(method, url, data) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    if (method == "POST" && data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  });
}


//GET example
makeRequest('GET', "http://localhost:3000/chat" + location.search).then(function (data) {
  var results = JSON.parse(data);
  console.log(location.search);
  const id = new URL(location.href).searchParams.get('id_current_user');
  results.map(d => {
    if (d.id_user == Number(id)) {
      document.getElementById('chat_people_websoket').innerHTML += `
      <div class="container ">
        <p>${d.chatMessage.name_user}: ${d.chatMessage.message}</p>
        <span class="time-right">${d.chatMessage.date}</span>
      </div>`;
    } else {
      document.getElementById('chat_people_websoket').innerHTML += `
      <div class="container darker">
        <p>${d.chatMessage.name_user}: ${d.chatMessage.message}</p>
        <span class="time-left">${d.chatMessage.date}</span>
      </div>`;
    }
  })
});
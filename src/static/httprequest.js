function makeRequest (method, url, data) {
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
      if(method=="POST" && data){
          xhr.send(data);
      }else{
          xhr.send();
      }
    });
  }
  

//GET example
makeRequest('GET', "http://localhost:3000/chat" + location.search).then(function(data){
var results=JSON.parse(data);
console.log(location.search);
const id = new URL(location.href).searchParams.get('id_current_user');
  results.map(d =>{
    if(d.id_user == id){
      document.getElementById('chat_people_websoket').innerHTML += `
      <div class="container ">
        <p>${d.name_user}: ${d.message}</p>
        <span class="time-right">${d.date}</span>
      </div>`;
    } else{
      document.getElementById('chat_people_websoket').innerHTML += `
      <div class="container darker">
        <p>${d.name_user}: ${d.message}</p>
        <span class="time-left">${d.date}</span>
      </div>`;
    }
  })  
});
const socket = io();


//DOM elements
let nameU = document.querySelector('#infoNameUser');
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let cont = document.getElementById('cont');


username.value = nameU.textContent


btn.addEventListener('click', function ()
{
    
    socket.emit('chat:message', 
        {
            message: message.value,
            username: username.value
        });
        message.value = '';
    
});


message.addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
        socket.emit('chat:message', {
            message: message.value,
            username: username.value
        });
        message.value = '';
        username.style.display = 'none';
    }
    
});

socket.on('messageServer', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`;
    cont.scrollTop = cont.scrollHeight;
});

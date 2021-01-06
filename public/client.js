const socket = io()
const form = document.getElementById('message-container');
const messageInput = document.querySelector('#messageinp');
const messageContainer = document.querySelector('.section');
var audio = new Audio('sms.mp3');




const append = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if (position == 'receivemessage') {
        audio.play();
    }

}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'mymessage');
    socket.emit('send', message)
    scrollToBottom()
    messageInput.value = ''

})

let name;
do {
    name = prompt("Enter your name to join");

} while (!name);

socket.emit('new-user-joined', name)




socket.on('user-joined', name => {
    append(`${name}  : joined the chat`, 'receivemessage')
})


socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'receivemessage')
    scrollToBottom()
})


socket.on('left', name => {
    append(`${name} : Left the chat `, 'receivemessage')
})



function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight
}
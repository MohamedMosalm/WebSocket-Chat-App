const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const typingStatus = document.getElementById('typing-status');
const messages = document.getElementById('messages');

form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('msgToAllUsers', msg => {
  console.log('new message', msg);
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

input.addEventListener('keydown', () => {
  socket.emit('typing');
});

socket.on('someoneIsTyping', id => {
  typingStatus.innerHTML = `${id} typing`;
});

input.addEventListener('keyup', () => {
  socket.emit('notTyping');
});

socket.on('stoppedTyping', () => {
  setTimeout(() => (typingStatus.innerHTML = ''), 1000);
});

'use strict';

const ws = new WebSocket(`ws://${location.host}`);

const chatBodyEl = document.querySelector('.chat__body');
const chatInputEl = document.querySelector('.chat__input');
const chatSubmitEl = document.querySelector('.chat__submit');

const renderMessage = (message) => {
  const messageEl = document.createElement('div');
  messageEl.innerText = message;
  chatBodyEl.appendChild(messageEl);
};

ws.addEventListener('message', (event) => {
  renderMessage(event.data);
});

chatInputEl.focus();
chatSubmitEl.addEventListener('click', (event) => {
  event.preventDefault();
  const message = chatInputEl.value;
  if (message) {
    renderMessage(message);
    chatInputEl.value = '';
    ws.send(message);
  }
});

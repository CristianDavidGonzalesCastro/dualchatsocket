(function () {

  const socket = io();

  function addMsg(data) {
    const {
      username,
      value
    } = data;
    $('#list').append(
      `<p><b>${username}</b>: ${value}</p>`
    );
  }

  function sendMsg() {
    const data = {
      username: $('#username').val(),
      value: $('#value').val()
    };

    if (!data.value) return;
    socket.emit('new:message', data);
    addMsg(data);

    $('#value').val('').focus();
  }
  socket.on('new:message', function (data) {
    addMsg(data);
  });

  $('#send').on('click', function () {
    sendMsg();
  });

  $('#value').on('keypress', function (event) {
    if (event.which === 13) {
      sendMsg();
    }
  });

})();
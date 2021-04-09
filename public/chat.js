$(() => {
	if (!window.WebSocket) {
		alert('No WebSocket!');
		return;
	}

	var $chatlog = $('#chat-log');
	var $chatmsg = $('#chat-msg');

	prependMessage = function (data) {
		$chatlog.prepend(`<div><spen>${data}</span></div>`);
	};

	connect = function () {
		ws = new WebSocket(`ws://${window.location.host}/ws`);
		ws.onopen = function (e) {
			console.log('onopen', arguments);
		};
		ws.onclose = function (e) {
			console.log('onclose', arguments);
		};
		ws.onmessage = function (e) {
			prependMessage(e.data);
		};
	};

	connect();

	var isBlank = (string) => {
		return string == null || string.trim() === '';
	};

	var username;
	while (isBlank(username)) {
		username = prompt("What's your name?");
		if (!isBlank(username)) {
			$('#user-name').html(`<b>${username}</b>`);
		}
	}

	$('#input-form').on('submit', (e) => {
		if (ws.readyState === ws.OPEN) {
			ws.send(
				JSON.stringify({
					type: 'msg',
					data: $chatmsg.val(),
				})
			);
		}
		$chatmsg.val('');
		$chatmsg.focus();
		return false;
	});
});

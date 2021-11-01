const express = require('express');

const app = express();
const httpserver = require('http').createServer(app);
const io = require('socket.io')(httpserver, {
	cors: {
		origin: '*',
		methods: ['*'],
	},
});

const { instrument } = require('@socket.io/admin-ui');

io.on('connection', socket => {
	console.log(socket.id);

	socket.on('key-pressed', (request, cb) => {
		console.log(request);
		setTimeout(() => {
			const result = { value: request * 2 };
			cb(result);
		}, 3000);
	});
});

app.get('/status', (req, res, next) => {
	res.json({
		status: 'OK',
		date: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
	});
});

httpserver.listen(3000);

instrument(io, { auth: false });

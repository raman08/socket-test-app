const express = require('express');

const app = express();
// const httpserver = require('http').createServer(app);

const server = app.listen(process.env.PORT || 3000, () => {
	console.log('App Started at http://localhost:3000');
});

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['*'],
	},
});

//const { instrument } = require('@socket.io/admin-ui');

io.on('connection', socket => {
	console.log(socket.id);

	socket.on('key-pressed', (request, cb) => {
		console.log(request);
		const result = { value: request };
		// socket.emit('key-pressed',result);
		cb(result);
	});
});

app.get('/status', (req, res, next) => {
	res.json({
		status: 'OK',
		date: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
	});
});

// httpserver.listen(3000);

//instrument(io, { auth: false });

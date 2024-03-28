import {Server} from 'socket.io';

const io = new Server( { cors: {
  origin: "http://localhost:3000"
}})

io.on("connection", (socket) => {
  console.log('connected', socket.id)
  socket.on('anything-you-want', (data) => {
    console.log('received an event that the client sent', data)
    console.log('now emitting an event back to all the clients')
    io.emit('something-else', 'test 2');
  })
});

export default io;

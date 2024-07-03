const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

const app = express();

const PORT = 4047;
const PORT_FRONTEND = 4046;
const URL_FRONTEND = `http://localhost:${PORT_FRONTEND}`;

app.use(cors({origin:`${URL_FRONTEND}`}));

app.get('/test', (req, res) => {
    res.send("==yes there")
});

const server = app.listen(PORT, () => {
    console.log("Server Starts at Port "+ PORT)
})

const io = socket(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log("==SocketId=>", socket.id);

    socket.on("join_room", (data) =>{
        console.log("==join_room=>", data);
        socket.join(data);
    })

    socket.on("send_message", (data) => {
        console.log("==send_message=>", data);
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("sendTyping",(data) => {
        io.to(data.room).emit("typing", data)
    });

    socket.on('disconnect', () => {
        console.log("User Disconnect");
    })
});

module.exports = app;
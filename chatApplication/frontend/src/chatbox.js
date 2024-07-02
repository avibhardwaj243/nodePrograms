import React, { useEffect, useState } from 'react';
import socket from './io';

function Chatbox() {

    const [inputField, setInputField] = useState({
        name: '',
        room: '',
        message: ''
    });

    const [isChatting, setIsChatting] = useState(false);
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList([...messageList, data]);
        })

        socket.on("typing", (data) => {
            console.log(data)
        });
    }, [socket])

    const inputHandler = (e) => {
        if(e.target.name == "message"){
            socket.emit("sendTyping", inputField);
        }
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value
        })
    }

    const enterRoom = () => {
        console.log("===Room==", inputField)
        socket.emit("join_room", inputField.room)
        setIsChatting(true);
    }

    const sendMessage = async() => {
         await socket.emit("send_message", inputField);
         setMessageList([...messageList, inputField]);
         setInputField({...inputField, message: ''})
    }

    console.log("messages ===>" + messageList);

    return (
        <div>
            <h1>Chat APP</h1>
            {
                !isChatting ? (
                    <div>
                        <input type='text' placeholder='Enter Name' name='name' onChange={inputHandler} />
                        
                        <input type='text' placeholder='Enter Room' name='room' onChange={inputHandler} />
                        <br></br>

                        <button onClick={enterRoom}>Enter Chat Room</button>

                    </div>
                ) : (
                    <div> 
                        <h2>Chat Box</h2>
                        {
                            messageList.map((item, index) => {
                                return (
                                    <div key={index}>
                                        {item.name} : {item.message}
                                    </div>
                                )
                            })
                        }
                        <input type='text' placeholder='Enter Message' name='message' onChange={inputHandler} value={inputField.message} />

                        <br></br>
                        <button onClick={sendMessage}>Send Message</button>
                    </div>
                )
            }
        </div>
    )
}

export default Chatbox;
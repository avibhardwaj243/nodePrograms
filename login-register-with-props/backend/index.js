import express from 'express';
import cors from 'cors';

const PORT = 9002;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post("/login", (req, res) => {
    //console.log(req.body)
    res.send({message: 'Successfull Login', user: {_id: "asdsa-asdsa"}})
});

app.post("/register", (req, res) => {
    //console.log(req.body)
    res.send({message: 'Successfull Registered'})
});

app.listen(PORT, () =>{
    console.log("Backend Started..")
})

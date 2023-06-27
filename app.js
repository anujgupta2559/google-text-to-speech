require("dotenv").config()
const express = require('express')
const app = express()
const fs = require("fs")
const cors = require("cors")
const getTextToSpeech = require('./index')
const bodyParser = require("body-parser")

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html")
})
app.post("/", async(req, res) => {
    
    if(!req.body?.inputText){
        return res.status(400).json({message : "Input text is required.", statusCode : 400})
    }
    await getTextToSpeech(req.body.inputText)
    return res.status(200).download('output.mp3')
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server started listening on port ${process.env.PORT}`)
})
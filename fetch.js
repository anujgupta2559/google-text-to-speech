const fs = require("fs");
const http = require("http")
const str = fs.createWriteStream("write.mp3");
const res = http.get("http://localhost:3000", (res)=>{
    res.pipe(str)
    str.on('finish', ()=>{
        
    })
})


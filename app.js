const express = require('express')
const socket = require('socket.io')
const http = require('http')
const {Chess} = require('chess.js')
const path = require('path');



const app = express()

const server  = http.createServer(app);

const io = socket(server)

const chess = new Chess();
let players = {};
let currentPlayer = "W";

app.set('view engine' , 'ejs');
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('index',{
        title : "Chess Game"
    })
})

io.on("connection",function(uniquesocket){
    console.log("connected");

    // uniquesocket.on("chutiya",()=>{ //taking evvent from frontend and using in bacckend
        
    //     io.emit("chu-tiya") //sending event from back to front to all front window
    // })

    // uniquesocket.on("disconnect" ,()=>{
    //     console.log("chudgya");
    // })

    if(!players.white){
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole" , "w");
    }
    else if(!players.black){
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole" , "b");
    }
    else{
        uniquesocket.emit("spectatorRole");
    }

    uniquesocket.on("disconnect" , function(){
        if(uniquesocket.id === players.white){
            delete players.white;
        }
        else if(uniquesocket.id === players.black){
            delete players.black;
        }
    });

    uniquesocket.on("move", (move)=>{
        try{
          if(chess.turn() ==="w" && uniquesocket.id !== players.white ) return;  
          if(chess.turn() ==="b" && uniquesocket.id !== players.black ) return;  

            const result = chess.move(move);
            if(result){
                currentPlayer = chess.turn();
                io.emit("move" , move)
                io.emit("boardState" , chess.fen() );

            }
            else{
                console.log("htt bsdk uski bari hai :", move);
                uniquesocket.emit("invalidMove" , move);
            }

        } catch(err){
            console.log(err);
            uniquesocket.emit("jana lavde sab galat hai :" , move)
        }
    })

});


server.listen(3000, function(){
    console.log("server running on httt://localhost:3000");
})
const socket = io();

socket.emit("chutiya")
//sending event from frontend to backend

socket.on("chu-tiya", function(data){
    console.log("chu-tiya");
    })
//recived fromm backend to frontend    
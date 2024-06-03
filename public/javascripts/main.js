
// socket.emit("chutiya")
// //sending event from frontend to backend

// socket.on("chu-tiya", function(data){
//     console.log("chu-tiya");
//     })
// //recived fromm backend to frontend    



const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, i) => {
        row.forEach((square, j) => {
            const squareElement  = document.createElement("div");

            squareElement.classList.add("square" , (i+j)%2 === 0 ? "light" : "dark");
            squareElement.dataset.row = i;
            squareElement.dataset.col = j;

            if(square){
                const pieceElement = document.createElement("div")
                pieceElement.classList.add("piece",
                    square.color === "w" ? "white" : "black"
                );
                pieceElement.innerText = "";
                pieceElement.draggable = playerRole === square.color
            }
        })
    })
}

const handleMove = () => {

}

const getPieceUnicode = () => {

}
renderBoard()
const boxes=document.querySelectorAll(".box");
const game_info=document.querySelector(".game-info");
const newGamebtn=document.querySelector(".btn");

let currentPlayer;
let game_grid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function swapturn(){
    if(currentPlayer==="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }
    game_info.innerText=`Current Player-${currentPlayer}`;
}
function init_game(){
    currentPlayer="X";
    game_grid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList=`box box${index+1}`
    })
    newGamebtn.classList.remove("active");
    game_info.innerText=`Current Player-${currentPlayer}`;
}

init_game();

function check_game_over(){
    // newGamebtn.classList.add("active");
    let answer="";

    winningPosition.forEach((position)=>{
        if((game_grid[position[0]]!==""|| game_grid[position[1]]!=="" || game_grid[position[2]]!=="") && (game_grid[position[0]]==game_grid[position[1]] && (game_grid[position[1]]===game_grid[position[2]]))){
            if(game_grid[position[0]]=="X")
                answer="X";
            else
                answer="0";
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })
    if(answer!==""){
        game_info.innerText=`Winner Player ${currentPlayer}`;
        newGamebtn.classList.add("active");
        return;
    }
    let emptyCount=0;
    game_grid.forEach((box)=>{
        if(box!=="")
            emptyCount++;
    })
    if(emptyCount==9){
        game_info.innerText="game tied";
        newGamebtn.classList.add("active");
    }
}

function handle_click(index){
    if(game_grid[index]===""){
        boxes[index].innerText=currentPlayer;
        game_grid[index]=currentPlayer;
        boxes[index].getElementsByClassName.pointerEvents="none";
        swapturn();
        check_game_over();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handle_click(index);
    })
})

newGamebtn.addEventListener("click",init_game);

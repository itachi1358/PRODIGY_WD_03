let reset = document.querySelector('.reset');
let boxes=document.querySelectorAll('.box');
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]; 
let char;
let canBeDraw=true;
let x=0;
let computer_won=false;
const Win = (bool)=>{
    won=false;
    for(let pattern of winPatterns){
        let pos1 =boxes[pattern[0]].innerHTML;
        let pos2=boxes[pattern[1]].innerHTML;
        let pos3= boxes[pattern[2]].innerHTML;
        if(pos1!='' && pos2!='' && pos3!=''){
            if( pos1===pos2 && pos2===pos3){
                won=true;
                char=pos1;
                break;
            }
        }
    }
    return won;
}
const computerMove = () => {
    let emptyBoxes = [];
    boxes.forEach((box, idx) => {
        if (box.innerHTML === '') {
            emptyBoxes.push(idx);
        }
    });
    if(emptyBoxes.length==0){
        return;
    }
    let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    let randomBoxIndex = emptyBoxes[randomIndex];
    boxes[randomBoxIndex].innerHTML = 'O';
    boxes[randomBoxIndex].classList.add("box-disabled");
    x++;
}

boxes.forEach((box)=> {
    box.addEventListener("click", ()=>{
        box.innerHTML='X';
        x++;
        box.classList.add("box-disabled");
        computerMove();
        if(x>=9 && canBeDraw){
            setTimeout(function() {
                alert("Draw");
                reset_clicked();
            }, 500); 
        }
        if(Win()){
            canBeDraw=false;
            setTimeout(function(){
            alert(`Congratulations!! The Winner is ${char}`);
            reset_clicked();
        },500);
    }
    })
})
const reset_clicked =() => {
    boxes.forEach((box)=> {
        box.innerHTML='';
        box.classList.remove("box-disabled");
        x=0;
        canBeDraw=true
    })
}

reset.addEventListener('click',reset_clicked);
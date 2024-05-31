const blocks = document.querySelectorAll(".block");
let insertValue = "X";
let p1 = Array(9).fill(" ");

// player's score
const p1Score = document.getElementById("p1Score");
const p2Score = document.getElementById("p2Score");

// modal
const wrapperModal = document.querySelector(".wrapper-modal");
const modalBtn = document.querySelector("#modalOk").addEventListener('click', (e)=>{
  wrapperModal.style.display = "none"
  document.querySelector('.wel').style.display = 'none'
  document.querySelector('.info').style.display = 'inline-block'
  document.querySelector('.status').innerText ='Remainder'

})

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// X - O click handled...
function clickEvent() {
  blocks.forEach((e) => {
    e.addEventListener("click", clickFunction);
  });
}

clickEvent();

function clickFunction(eve) {
  eve.target.innerText = insertValue;
  p1[eve.target.dataset.index] = insertValue;
  //   debugger;
  evalauate(insertValue);
  insertValue = insertValue == "X" ? "O" : "X";
  // debugger;\
  eve.target.removeEventListener("click", clickFunction);
}

function evalauate(val) {
  let tie = 1;
  winningCombination.forEach((comb) => {
    // console.log(comb);
    if ((p1[comb[0]] == val) & (p1[comb[1]] == val) & (p1[comb[2]] == val)) {
      tie = 0;
      setTimeout(() => {
        console.log(tie)
        reset();
        clickEvent();
        p1 = Array(9).fill(" ");

        // increasing score

        if (val != "X") {
          // debugger;
          p2Score.innerText = Number(p2Score.innerText) + 1;
          showModal(document.querySelector(".player2 #p2").innerText+' won this round..!');
          return;
        } else {
          // debugger;
          showModal(document.querySelector(".player1 #p1").innerText+' won this round..!');
          p1Score.innerText = Number(p1Score.innerText) + 1;
          return;
        }
      }, 300);
    }
  });

  // debugger
  if (tie==1) {
  
    if (!p1.includes(" ")) {
      setTimeout(() => {
        // alert("Tie....!");
        wrapperModal.style.display = "block";
        showModal("Tie match..!");
        reset();
        clickEvent();
        p1 = Array(9).fill(" ");
      }, 300);
    }
  }
}

function reset() {
  blocks.forEach((block) => {
    block.innerText = " ";
  });
}

// enable modal wrapper

function showModal(str) {
  wrapperModal.style.display = "block";
  document.querySelector(".modalBox .info").innerText = str;
}

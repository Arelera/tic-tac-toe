// Dirth code, the usual :(

let gameboard = ['', '', '', '', '', '', '', '', ''];
let winnerItem = '';
let gamePlaying = false;
const Gameboard = (() => {
  // add a resetBoard function later, i couldn't do it rn
  let resetBoard = () => gameboard.forEach((spot, i) => (gameboard[i] = ''));

  // add eventlistener to every spot
  const boardStarter = () => {
    for (let i = 0; i < 9; i++) {
      let aSpot = document.getElementById('spot-' + i);
      aSpot.addEventListener('click', () => {
        if (gamePlaying) {
          Game.playSpot(i);
          //console.log('clicked: ' + i);
        }
      });
    }
  };

  // win/draw check
  const winCheck = (gameboard) => {
    console.log('winCheck time: ' + gameboard);
    for (let i = 0; i < 3; i++) {
      // vertical check
      if (
        gameboard[i] !== '' &&
        gameboard[i] !== undefined &&
        gameboard[i] === gameboard[i + 3] &&
        gameboard[i + 3] === gameboard[i + 6]
      ) {
        console.log(gameboard[i] + ' WON!');
        winnerItem = gameboard[i];
      }
    }
    for (let i = 0; i < 10; i += 3) {
      // horizontal check
      if (
        gameboard[i] !== '' &&
        gameboard[i] !== undefined &&
        gameboard[i] === gameboard[i + 1] &&
        gameboard[i + 1] === gameboard[i + 2]
      ) {
        console.log(gameboard[i] + ' WON!');
        winnerItem = gameboard[i];
      }
    }
    // diagonal check
    if (
      gameboard[0] !== '' &&
      gameboard[0] !== undefined &&
      gameboard[0] === gameboard[4] &&
      gameboard[0] === gameboard[8]
    ) {
      console.log(gameboard[0] + ' WON!');
      winnerItem = gameboard[0];
    } else if (
      gameboard[2] !== '' &&
      gameboard[2] !== undefined &&
      gameboard[2] === gameboard[4] &&
      gameboard[2] === gameboard[6]
    ) {
      console.log(gameboard[2] + ' WON!');
      winnerItem = gameboard[2];
    }
    // draw check, everything filled but winnerItem still '' empty
    let fullness = 0;
    for (let i = 0; i < 9; i++) {
      if (gameboard[i] !== '') {
        fullness += 1;
      }
    }
    //console.log('fullness ' + fullness);
    if (fullness !== 9 && gamePlaying) {
      fullness = 0;
    } else if (fullness == 9 && gamePlaying && winnerItem === '') {
      winnerItem = 'draw';
    }

    //console.log('fullness ' + fullness);
    //console.log(winnerItem);

    if (winnerItem !== '') {
      console.log('Someone won or draw');
      gamePlaying = false;
      Game.winnerEvaluator(winnerItem);
    }
    console.log(gameboard);
  };

  // newgame button event listener, THIS PART NEEDS WORK
  const newGame = (theGameboard) => {
    let newGameBtn = document.getElementById('start-game');
    newGameBtn.addEventListener('click', () => {
      gamePlaying = true;
      console.log('gamePlaying: ' + gamePlaying);
      for (let i = 0; i < 9; i++) {
        document.getElementById('spot-' + i).firstChild.textContent = ' ';
        theGameboard[i] = '';
        winnerItem = '';
      }
      console.log('NEWGAMEBTN ');
      document.querySelector('.pb0').classList.remove('winner');
      document.querySelector('.pb1').classList.remove('winner');
    });
  };

  // who won tho?

  return { resetBoard, boardStarter, winCheck, newGame };
})();

const Player = (item, name) => {
  const play = (i) => (gameboard[i] = item);

  return { play, item, name };
};

// change textcontent of the spot on click
const Game = (() => {
  const playSpot = (spotIndex) => {
    // get the clicked spot by id
    let aSpot = document.getElementById('spot-' + spotIndex).firstChild;
    // if the clicked spot is taken, don't play
    if (
      aSpot.textContent === player1.item ||
      aSpot.textContent === player2.item
    ) {
      0;
    } else {
      gameboard[spotIndex] = currentPlayer.item;
      aSpot.textContent = currentPlayer.item;

      Gameboard.winCheck(gameboard);
      // change the current player after a person plays
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  };

  const winnerEvaluator = (winnerItem) => {
    if (winnerItem === player1.item) {
      console.log(player1.name + 'WON!');
      document.querySelector('.pb0').classList.toggle('winner');
    } else if (winnerItem === player2.item) {
      console.log(player2.name + 'WON!');
      console.log('LOOKATMEEE');
      document.querySelector('.pb1').classList.add('winner');
    } else if (winnerItem === 'draw') {
      console.log("IT'S A DRAW!!");
      document.querySelector('.pb0').classList.toggle('winner');
      document.querySelector('.pb1').classList.toggle('winner');
    }
  };

  return { playSpot, winnerEvaluator };
})();

const player1 = Player('X', 'player1-name');
const player2 = Player('O', 'player2-name');
let currentPlayer = player1;

Gameboard.boardStarter();
Gameboard.newGame(gameboard);

document.querySelector('.player-name-0').placeholder = player1.name;
document.querySelector('.player-name-1').placeholder = player2.name;

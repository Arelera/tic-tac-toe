const Gameboard = (() => {
  let gameboard = ['', '', '', '', '', '', '', '', ''];
  let winnerItem = '';
  let gamePlaying = false;
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
    console.log('winCheck time');
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
      }
      console.log('NEWGAMEBTN ');
    });
  };

  // who won tho?

  return { gameboard, resetBoard, boardStarter, winCheck, newGame, winnerItem };
})();

const Player = (item, name) => {
  const play = (i) => (Gameboard.gameboard[i] = item);

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
      Gameboard.gameboard[spotIndex] = currentPlayer.item;
      aSpot.textContent = currentPlayer.item;

      Gameboard.winCheck(Gameboard.gameboard);
      // change the current player after a person plays
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  };

  return { playSpot };
})();

Gameboard.boardStarter();
Gameboard.newGame(Gameboard.gameboard);

const player1 = Player('X', 'player1-name');
const player2 = Player('O', 'player2-name');

document.querySelector('input').placeholder = player1.name;

let currentPlayer = player1;

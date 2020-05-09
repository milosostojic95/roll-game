const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const newGameBtn = document.querySelector('.btn-new');
let input;
let winningScore;
let activePlayer;
let score;
let roundScore;
let lastDiceOne;
let lastDiceTwo;

init();
// events
btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);
newGameBtn.addEventListener('click', init);

// functions
function roll() {
  // taking random number
  const diceOne = Math.floor(Math.random() * 6) + 1;
  const diceTwo = Math.floor(Math.random() * 6) + 1;
  // changing img of roll
  const diceImgOne = document.querySelector('#dice-1');
  const diceImgTwo = document.querySelector('#dice-2');

  //set first img
  diceImgOne.style.display = 'block';
  diceImgOne.src = 'dice-' + diceOne + '.png';
  //set second img
  diceImgTwo.style.display = 'block';
  diceImgTwo.src = 'dice-' + diceTwo + '.png';
  //reset roll if roll = 1
  if(diceOne === 6 && lastDiceOne === 6 || diceTwo === 6 && lastDiceTwo === 6 || diceOne ===6 && diceTwo === 6) {
    scores[activePlayer] = 0;
    document.querySelector('#score-'+activePlayer).textContent = '0';
    nextPlayer();

  } else if(diceOne > 1 && diceTwo > 1) {
    // add score
    roundScore += (diceOne + diceTwo);
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    // next player
    nextPlayer();
  }
  lastDiceOne = diceOne;
  lastDiceTwo = diceTwo;
}

function hold() {
  //add globac score
  scores[activePlayer] += roundScore;
  document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
  // check winner
  input = document.querySelector('.final-score').value;
  // cheking is '' or undefind
  if(input) {
    winningScore = input;
  } else {
    winningScore = 100;
  }

  if(scores[activePlayer] >= winningScore) {
    document.querySelector('#name-'+ activePlayer).textContent = 'Player ' + (activePlayer + 1) + ' WINNER!';
    removeDice();
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    btnRoll.style.pointerEvents = 'none';
    btnHold.style.pointerEvents = 'none';
  } else {
    //changing player
    nextPlayer();
  }

}

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

function init() {
  activePlayer = 0;
  scores = [0,0];
  roundScore = 0;
  //reset values
  removeDice();
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  btnRoll.style.pointerEvents = 'all';
  btnHold.style.pointerEvents = 'all';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
}

function removeDice() {
  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';
}

const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const newGameBtn = document.querySelector('.btn-new');
let input;
let winningScore;
let activePlayer;
let score;
let roundScore;
let lastDice;

init();

// events
btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);
newGameBtn.addEventListener('click', init);

// functions
function roll() {
  // taking random number
  const dice = Math.floor(Math.random() * 6) + 1;
  // changing img of roll
  const diceImg = document.querySelector('.dice');
  diceImg.style.display = 'block';
  diceImg.src = 'dice-' + dice + '.png';
  //reset roll if roll = 1

  if(dice === 6 && lastDice === 6) {
    scores[activePlayer] = 0;
    document.querySelector('#score-'+activePlayer).textContent = '0';
    nextPlayer();
  } else if(dice > 1) {
    // add score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    // next player
    nextPlayer();
  }
  lastDice = dice;
}

function hold() {
  //add globac score
  scores[activePlayer] += roundScore;
  document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
  // check winner
  input = document.querySelector('.final-score').value;

  if(input) {
    winningScore = input;
  } else {
    winningScore = 10;
  }

  if(scores[activePlayer] >= winningScore) {
    document.querySelector('#name-'+ activePlayer).textContent = 'Player ' + (activePlayer + 1) + ' WINNER!';
    document.querySelector('.dice').style.display = 'none';
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
  document.querySelector('.dice').style.display = 'none';
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

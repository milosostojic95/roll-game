const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
let activePlayer = 0;
const scores = [0,0];
let roundScore = 0;

btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);

//reset values
document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


// functions

function roll() {
  // taking random number
  const dice = Math.floor(Math.random() * 6) + 1;
  // changing img of roll
  const diceImg = document.querySelector('.dice');
  diceImg.style.display = 'block';
  diceImg.src = 'dice-' + dice + '.png';
  //reset roll if roll = 1
  if(dice > 1) {
    // add score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    // next player
    nextPlayer();
  }
}

function hold() {
  scores[activePlayer] += roundScore;
  document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
  nextPlayer();
}

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

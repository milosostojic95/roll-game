const btnRoll = document.querySelector('.btn-roll');

btnRoll.addEventListener('click', roll);


document.querySelector('.dice').style.display = 'none';
function roll() {
  const dice = Math.floor(Math.random() * 6) + 1;
  const diceImg = document.querySelector('.dice');
  diceImg.style.display = 'block';
  diceImg.src = 'dice-' + dice + '.png';

}

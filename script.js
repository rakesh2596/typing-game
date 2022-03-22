const word = document.getElementById('word');   // random words
const text = document.getElementById('text');   // input
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'tooth',
  'tense',
  'airplane',
  'ball',
  'basket',
  'juice',
  'bike',
  'bad',
  'north',
  'dependent',
  'zebra',
  'silver',
  'nightingale',
  'superficial',
  'acquitance',
  'eight',
  'pebble',
  'admit',
  'drag',
  'random'
];

// Init word
let randomWord;

// Init score
let score = 0;    // let because we will reassign the score

// Init time
let time = 10;

// Set difficulty to value in ls or easy
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'easy';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'easy';

// Focus on text when clicked
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);  

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
  // console.log(getRandomWord);
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';  

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show timeout popup
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Oops! Time out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play Again</button>    
  `;
  // add inline event listeners

  endgameEl.style.display = 'flex';   // in css we have assigned display to none and calling here
}

addWordToDOM();

// Event listeners

// Typing the word in text
text.addEventListener('input', e => {
  const insertedText = e.target.value;
  console.log(insertedText);

  if (insertedText === randomWord) {   // checking of input typed by user and random words generated and add words again also update score
    addWordToDOM();
    updateScore();

    // Clear the text 
    e.target.value = '';   // after correction of first word, next word changes and text input clears

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 4;
    }

    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));   // in css translate y late is -100% in hide class

// When clicked o setting button
settingsForm.addEventListener('change', e => {difficulty = e.target.value;
  // console.log(difficulty); 
  localStorage.setItem('difficulty', difficulty);   // storing the data
});

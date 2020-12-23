// подключаем radioPlayer.js
import { radioPlayerInit } from './radioPlayer.js';
// подключаем musicPlayer.js    
import { musicPlayerInit } from './musicPlayer.js';
// подключаем videoPlayer.js 
import { videoPlayerInit } from './videoPlayer.js';

// задаем переменные и присваеваем им значения селекторов кнопок и блоков
const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

// создаем функцию, которая будет отключать все плееры кроме активного
const deactivationPlayer = () => {
  temp.style.display = 'none';
  playerBtn.forEach(item => item.classList.remove('active'));
  playerBlock.forEach(item => item.classList.remove('active'));
};

// создаем функцию, которая при щелчке мыши будет открывать нужный плеер
playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
  deactivationPlayer();
  btn.classList.add('active');
  playerBlock[i].classList.add('active');
}));


// вызов ранее подключенных импортов в виде функций
radioPlayerInit();
musicPlayerInit();
videoPlayerInit();
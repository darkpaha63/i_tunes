// экспортируем videoPlayerInit в index.js
export const videoPlayerInit = () => {
  // получаем все элементы видеоплеера
  // video-player
  // video-button__play
  // video-button__stop
  // video-time__passed
  // video-progress
  // video-time__total

  // создаем для всех полученных элементов соответствующие им переменные
  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoVolume = document.querySelector('.video-volume');

  /*создаем функцию, которая при запуске или остановки плеера щелчком
  будет менять значек плей на паузу и на оборот*/
  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  };

  // пуск и пауза видеоплеера при клике
  const togglePlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
    // вызов функции toggleIcon
    toggleIcon();
  };

  // останавливать видеоплеер при нажатии квадратика и обнуление таймера видео
  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  // создаем функцию добавления ноликов
  const addZero = n => n < 10 ? '0' + n : n;


  // запускаем функцию togglePlay при клике и на экран и на кнопку
  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  // останавливать видеоплеер при нажатии квадратика
  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    // перемещение ползунка вместе с видео
    videoProgress.value = (currentTime / duration) * 100;

    // создасем бегущий таймер времени в формате мм:сс
    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    // создаем статичный таймер времени в формате мм:сс
    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    // оформляем наши таймеры в формат мм:сс с функцией добавления нулей
    videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed);
    videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal);
  });

  // при нажатии на ползунок в любом местее перемещает видео на эту позицию
  videoProgress.addEventListener('change', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  });

  videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100;
  });
};

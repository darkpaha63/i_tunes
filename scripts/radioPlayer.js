// экспортируем radioPlayerInit
export const radioPlayerInit = () => {
  // задаем переменные и получаем в них все неообходимые элементы
  const radio = document.querySelector('.radio');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioHeaderBig = document.querySelector('.radio-header__big');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');
  const radioVolume = document.querySelector('.radio-volume');

  // присваиваем переменной аудио метод Audio в формате /aac
  const audio = new Audio();
  audio.type = 'audio/aac';

  // деактивируем кнопку пуск
  radioStop.disabled = true;

  // меняем кнопку "пуск" на кнопку "стоп"
  // и запускаем анимацию большой картинки
  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');
    }
  };

  // добавляем активной радиостанции серую обводку
  const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  };

  // запускаем плеер
  // при этом вся информация из ячейки: Картинка, название станции
  // перемещается в заголовок страницы
  radioNavigation.addEventListener('change', event => {
    const target = event.target;
    const parrent = target.closest('.radio-item');
    selectItem(parrent);

    const title = parrent.querySelector('.radio-name').textContent;
    radioHeaderBig.textContent = title;

    const urlImg = parrent.querySelector('.radio-img').src;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false;
    audio.src = target.dataset.radioStantion;
    audio.play();
    changeIconPlay();
  });

  // останавливаем плеер
  radioStop.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  });

  radioVolume.addEventListener('input', () => {
    audio.volume = radioVolume.value / 100;
  });
};
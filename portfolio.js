'use strict';
{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp(){
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = d.getMinutes();
    const s = d.getSeconds();
    const ms = d.getMilliseconds();
    timer.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  setButtonStateInitial();

  start.addEventListener('click', () => {
    if(start.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  })

  stop.addEventListener('click', () => {
    if(stop.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  })

  reset.addEventListener('click', () => {
    if(reset.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  })

  // 生まれてからの時間
  var myBirthTime = new Date(2000, 11, 22, 12, 30);
  function updateParagraph(){
    var now =new Date();
    var seconds = (now.getTime() - myBirthTime.getTime()) / 1000;
    document.getElementById('birth-time').innerText = '生まれてから' + seconds + '秒経過。';
  }
  setInterval(updateParagraph, 50);

  // 地球はまわる
  var header = document.getElementById('header');
  var degree = 0;
  function rotateHeader() {
    degree = degree + 6;
    degree = degree % 360;
    if((0 <= degree && degree < 90) || (270 <= degree && degree < 360)) {
      header.className = 'face';
    } else {
      header.className = 'back';
    }
    header.style.transform = 'rotateX(' + degree + 'deg)';
  }
  setInterval(rotateHeader, 20);
}

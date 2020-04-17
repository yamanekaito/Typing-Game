'use strict'
{
  const words = [
    'apple',
    'sky',
    'blue',
    'middle',
    'set',
  ];
  let word = words[Math.floor(Math.random() * words.length)];
  let loc = 0;
  let score = 0;
  let miss = 0;
  const timeLimit = 3 * 1000;
  let startTime;

  const target =document.getElementById('target');
  const scoreLabel =document.getElementById('score');
  const missLabel =document.getElementById('miss');
  const timerLabel =document.getElementById('timer');


  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i <loc ;i ++ ) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
    //文字列.substring(x);  文字列のx番目から後を表示
  }

  function updateTimer() {
    const timeLeft = startTime +  timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);
    const timeoutId = setTimeout( () => {
      updateTimer();
    },10);

    if (timeLeft < 0) {
      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      setTimeout(() => {
        alert('Game Over');  //alertが出ている間は処理がブロックされる
      },100);   //アラートの処理を1003ミリ秒後にする
    }
  }

  window.addEventListener('click',() => { 
    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });

  // window.addEventListener('keydown',(e) => {
  window.addEventListener('keydown',e => {
    console.log(e.key);
    if (e.key === word[loc]) {
      console.log('score')
      loc ++;
      if(loc === word.length) {
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      updateTarget();
      score ++;
      scoreLabel.textContent = score;
    }else {
      console.log('miss');
      miss ++ ;
      missLabel.textContent = miss;
    }
  });
}
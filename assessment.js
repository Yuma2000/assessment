'use strict';

{
//   document.write('1足す2は');
//   document.write(1 + 2);
//   document.write('です');

  var age = 16;
  var member = true;
  var fee = 1800;

  if(age <= 15) fee = 800;
  else if(member) fee = 1000;
//   document.write(fee);

  var names = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ'];
  for(var i = 0; i < names.length; i++){
    for(var j = 0; j < names.length; j++){
      // document.write('<p>' + names[i] + names[j] + '</p>');
    }
  }

  var myBirthTime = new Date(2000, 11, 22, 12, 30);
  function updateParagraph(){
    var now =new Date();
    var seconds = (now.getTime() - myBirthTime.getTime()) / 1000;
    document.getElementById('birth-time').innerText = '生まれてから' + seconds + '秒経過。';
  }
  setInterval(updateParagraph, 50);

  var game = {
    startTime: null,
    displayArea: document.getElementById('display-area'),
    start: function() { 
      game.startTime = Date.now();
      document.body.onkeypress = game.stop;
    },
    stop: function() {
      var currentTime = Date.now();
      var seconds = (currentTime - game.startTime) / 1000;
      if(9.5 <= seconds && seconds <= 10.5) {
        game.displayArea.innerText = seconds + '秒でした。すごい。';
      } else {
        game.displayArea.innerText = seconds + '秒でした。残念。';
      }
    },
  };
  if(confirm('OKを押して10秒だと思ったら何かキーを押してください')){
    game.start();
  }

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

  const userNameInput = document.getElementById('user-name');
  const assessmentButton = document.getElementById('assessment');
  const resultDivided = document.getElementById('result-area');
  const tweetDivided = document.getElementById('tweet-area');

  /**
   * 指定した要素の子どもを全て削除する
   * @param {HTMLElement} element HTMLの要素
   */
  function removeAllChildren(element) {
    while(element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if(userName.length === 0) { //名前が空の時は処理を終了する
      return;
    }

    // 診断結果表示エリア
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリア
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
      + encodeURIComponent('あなたのいいところ')
      + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    //widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
  };

  userNameInput.onkeydown = (event) => { //テキストフィールド上でEnterが押されると診断する
    if(event.key === 'Enter') {
      assessmentButton.onclick();
    }
  };

  const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
  ];

  /**
   * 名前の文字列を渡すと診断結果を返す関数
   * @param {string} userName ユーザーの名前
   * @return {string} 診断結果
   */
  function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for(let i = 0; i < userName.length; i++) {
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字コード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName}/g, userName);
    return result;
  }

  //テストコード
  console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
}

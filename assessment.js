 'use strict';//エラー表示
 //以下定数の代入祭
const userNameInput=document.getElementById('user-name');
const assessmentButton=document.getElementById('assessment');
const resultDivided=document.getElementById('result-area');
const tweetDivided=document.getElementById('tweet-area');

assessmentButton.onclick=()=>{
    //無名関数　assessmentButtonオブジェクトのonclickプロパティに設定
    const userName=userNameInput.value;//テキストエリアの文字列を表示　valueは中身
    if(userName.length===0){
        return;//名前が空なら処理を終了　戻り値なし
    }
    //診断表示エリアの作成
    resultDivided.innerText=" ";//resuleDevidedエリアの文字列を空白に変更
    const header=document.createElement('h3');//先に要素だけを作成 createElement
    header.innerText='診断結果';//内側のテキスト innerText
    resultDivided.appendChild(header);//divが親要素　h3は子要素

    const paragraph=document.createElement('p');
    const result=assessment(userName);//assessent関数
    paragraph.innerText=result;
    resultDivided.appendChild(paragraph);
    //ツイートエリアの作成
    tweetDivided.innertext=" ";
    const anchor=document.createElement('a');//aの要素作り aタグ
    const hrefValue='https://twitter.com/intent/tweet?button_hashtag='+encodeURIComponent('あなたのいいところ')+'&ref＿src＝twsrc％5Etfw';//URIエンコード
    anchor.setAttribute('href',hrefValue);//href属性
    anchor.className='tweeter-hashtag-button';//class属性(html)は特別　してることはanchor.setAttribute(名前,値)と同じ
    anchor.setAttribute('date-text','result');
    anchor.innerText='Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    //widgets.js の設定
    const script=document.createElement('script');//scriptの要素作り　scriptタグ
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
}
//Enterでも動くように
userNameInput.onkeydown=event=>{
    if(event.key==='Enter'){
        assessmentButton.onclick();
    }
};
const answers=[
    //配列　後から要素を変更できない定数　const
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
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数 //関数の処理内容
 * @param{string} userName ユーザーの名前 //引数
 * @return{string} 診断結果 //戻り値
 */
function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode=0;
    for(let i=0;i<userName.length;i++){
        sumOfCharCode=sumOfCharCode+userName.charCodeAt(i);
    }
    //文字のコード番号の合計を回答の数で割って添字の数字を求める
    const index=sumOfCharCode%answers.length;
    let result=answers[index];
    result=result.replaceAll('{userName}',userName);//resultの{userName}部分を全てuserNameに置き換えてresultに再代入する関数　replaceAll
    return result;
}
//テストコード
console.assert(
    //テストをする関数　console.assert
    assessment('太郎')===assessment('太郎'),//true
    'どっか間違えてる'//false
);
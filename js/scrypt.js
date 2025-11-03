let username = null;
do{
    username = prompt("введіть ваше ім'я", "Гравець");
}while(username === null || username.trim() === "" )
document.getElementById("username").innerText = username;
 let balance = 5000;
balanceAnimation (balance);
let  cardImg = [[
    "../image/cards/Clubs/clubsJack.png",
    "../image/cards/Clubs/clubsQeen.png",
    "../image/cards/Clubs/clubsKing.png",
    "../image/cards/Clubs/clubs6.png",
    "../image/cards/Clubs/clubs7.png",
    "../image/cards/Clubs/clubs8.png",
    "../image/cards/Clubs/clubs9.png",
    "../image/cards/Clubs/clubs10.png",
    "../image/cards/Clubs/clubsAce.png"
  ],
  [
    "../image/cards/diamonds/diamondsJack.png",
    "../image/cards/diamonds/diamondsQeen.png",
    "../image/cards/diamonds/diamondsKing.png",
    "../image/cards/diamonds/diamonds6.png",
    "../image/cards/diamonds/diamonds7.png", 
    "../image/cards/diamonds/diamonds8.png",
    "../image/cards/diamonds/diamonds9.png",
    "../image/cards/diamonds/diamonds10.png",
    "../image/cards/diamonds/diamondsAce.png"
  ],
  [
    "../image/cards/hearts/heartJack.png",
    "../image/cards/hearts/heartQeen.png",
    "../image/cards/hearts/heartKing.png",
    "../image/cards/hearts/heart6.png",
    "../image/cards/hearts/heart7.png", 
    "../image/cards/hearts/heart8.png",
    "../image/cards/hearts/heart9.png",
    "../image/cards/hearts/heart10.png",
    "../image/cards/hearts/heartAce.png"
  ],
  [
    "../image/cards/spades/spadesJack.png",
    "../image/cards/spades/spadesQeen.png",
    "../image/cards/spades/spadesKing.png",
    "../image/cards/spades/spades6.png",
    "../image/cards/spades/spades7.png", 
    "../image/cards/spades/spades8.png",
    "../image/cards/spades/spades9.png",
    "../image/cards/spades/spades10.png",
    "../image/cards/spades/spadesAce.png"
  ]];
  let arryValue = [2,3,4,6,7,8,9,10,11];
  let frontCard = ["cardFront1User","cardFront2User","cardFront3User","cardFront1Computer","cardFront2Computer","cardFront3Computer"];
  let backCard = ["cardBack1User","cardBack2User","cardBack3User","cardBack1Computer","cardBack2Computer","cardBack3Computer"];
  let frontImg = ["front1","front2","front3","front1Computer","front2Computer","front3Computer"];
 let statisticUser =0;
  let statisticComputer =0;
 let typeBet = document.querySelector("#bet");
let btn = document.querySelector("#btn");
btn.addEventListener('click', () => {
  let bet = parseInt(typeBet.value);
   if(!checkBet(bet) || !checkBalance(balance, bet) ){
        typeBet.disabled = false;
        return;
    }
  statisticUser = 0;
statisticComputer = 0;
    btn.disabled = true;
for(let i =0; i < 6; i++){
  let cardValue = Math.floor(Math.random() * 9);
  let suit = Math.floor(Math.random() * 4);
  let image = document.querySelector(`#${frontImg[i]}`);
 image.src = cardImg[suit][cardValue];
  let front = document.getElementById(frontCard[i]);
  let back = document.getElementById(backCard[i]);
  back.style.transform = "rotateY(-180deg)";
  front.style.transform = "rotateY(0deg)";
  back.style.transition = "transform .6s linear";
  front.style.transition = "transform .6s linear";
  if(i <=2 ){
    statisticUser += arryValue[cardValue];
   
  }else if(i>2 && i<=5 ){
   statisticComputer += arryValue[cardValue]; 
  }
  
}
let res = document.getElementById("res");
if(checkWin(statisticUser, statisticComputer)){
   balanceAnimationPlus(bet,balance)
   balance += bet;
   res.style.backgroundColor = "rgb(0, 255, 0)";
   res.innerText = "win";
  }else if (!checkWin(statisticUser, statisticComputer)){
    balanceAnimationMinus(bet, balance);
    balance -= bet;
    res.style.backgroundColor = "rgba(255, 0, 0, 1)";
    res.innerText = "lose";
  }
 document.getElementById("statisticUser").innerText = statisticUser;
 document.getElementById("statisticComputer").innerText = statisticComputer;
 setTimeout (()=> {
  for(let i =0; i < 6; i++){
    front = document.getElementById(frontCard[i]);
    back = document.getElementById(backCard[i]);
 back.style.transform = "rotateY(0deg)";
  front.style.transform = "rotateY(180deg)";
  back.style.transition = "transform .6s linear";
  front.style.transition = "transform .6s linear";
   document.getElementById("statisticUser").innerText = "0";
 document.getElementById("statisticComputer").innerText = "0";
    btn.disabled = false;
     res.style.backgroundColor = "rgba(0, 0, 0, 0)";
    res.innerText = "";
}  
  },2000 )
})

function balanceAnimation (userBalance){
        const time = 1000;
        const step = 10;
        let startBalance = 0;
        let countStep = Math.round(time/(userBalance/step));
        let animation = setInterval (()=>{
            startBalance += step;
            if (startBalance === userBalance){
                clearInterval(animation);
            }
            document.getElementById('balance').innerHTML = `Ваш баланс: <br> ${startBalance}₴`;
        }, countStep)
 }
 function checkBet(bet){
  if( isNaN(bet)){
        alert("нема ставки нема гри");
        return false;
    }else if ( bet <= 0){
        alert("В кредит не граємо");
        return false;
    }else{
    return true;}
}
function checkBalance(balance, bet){
 if(balance === 0 || balance < bet){
        alert("Не вистачає грошей");
        return false;
    }else{
        return true;
    }
    

}
function checkWin(statisticUser, statisticComputer){
  if (statisticUser >statisticComputer ){
    return true;
  }else if (statisticUser < statisticComputer ){
    return false;
  }
}
function balanceAnimationPlus(bet,balance){
     const time = 100;
     
     let countStep = Math.max(10, Math.round(time / (bet / 5)));
     const stop = balance + bet;
     let animation = setInterval (()=>{
        balance += 1;
         if(balance ===  stop){
            clearInterval (animation);
     }
        document.getElementById('balance').innerHTML = `Ваш баланс: <br> ${balance}₴`;
     }, countStep);
}
function balanceAnimationMinus(bet,balance){
     const time = 100;
     let countStep = Math.max(10, Math.round(time / (bet / 5)));
   
     const stop = balance - bet;
     let animation = setInterval (()=>{
        balance -= 1;
         if(balance === stop){
            clearInterval (animation);
     }
        document.getElementById('balance').innerHTML = `Ваш баланс: <br> ${balance}₴`;
     }, countStep);
}

fun

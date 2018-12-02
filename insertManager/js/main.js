let color=Math.random()*360;
let thing=document.querySelector('#actionItem');
let time=document.querySelector('#time');
let submit=document.querySelector('#submit');
document.querySelector('.wrapper').style.backgroundColor="hsl("+color+",70%,70%)";

function returned(data){
    console.log(data);
    if(data="success"){
        location.reload(true);
        console.log('zxcv');
    }
}

function submitAct(){
    coldAjax("GET","php/sendVal.php?thing="+thing.value+"&time="+time.value,returned)
}

submit.addEventListener("click",submitAct,false);
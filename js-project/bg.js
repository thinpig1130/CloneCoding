
const body = document.querySelector("body");

const IMAGE_NUMBER = 7;

function paintImage(imgNum){
    const img = new Image();
    img.src = `images/${imgNum}.jpg`;
    img.classList.add("bgImg");
    body.appendChild(img);
}


function genRandom(){
    const num = Math.floor(Math.random()*IMAGE_NUMBER);
    return num;
}

function init(){
    const imageNumber = genRandom();
    paintImage(imageNumber);
};

init();
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    HIDING_CN ="hiding";



function paintGreeting(text){
    form.classList.add(HIDING_CN);
    greeting.classList.remove(HIDING_CN);
    greeting.innerText = `Hello, ${text}`;
};

function saveName(text){
    localStorage.setItem(USER_LS, text);
};

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
};

function askForName(){
    greeting.classList.add(HIDING_CN);
    form.addEventListener("submit", handleSubmit);
};

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }else{
       paintGreeting(currentUser);
    }
};

function init(){
    loadName();
};

init();
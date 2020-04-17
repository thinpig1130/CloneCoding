const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

function deleteToDo(event){
    const currentBtn = event.target,
        currentLi = currentBtn.parentNode;

    toDoList.removeChild(currentLi);
    
    // id 번호가 중복될 때 발생하는 오류를 수정.
    const cleanToDos = toDos.filter(function(toDo){
        const curLi =  parseInt(currentLi.id);
        const ret = toDo.id !== curLi;
        if(toDo.id > curLi){
            const doId = `${toDo.id}`;
            const changeNode = document.getElementById(doId);
            (toDo.id)--;
            changeNode.id = `${toDo.id}`;
        }
        return ret;
    });

    toDos = cleanToDos;
    saveToDos();

};



function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    li.id = newId;
    delBtn.innerText = "X";
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);

    delBtn.addEventListener("click", deleteToDo);

    const todoObj = {
        text : text,
        id : newId
    };

    toDos.push(todoObj);
    saveToDos();
}


function handleSubmit(event){
    
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    
    toDoInput.value ="";
   
};

function loadToDos(){
    const loadedToDo = localStorage.getItem(TODOS_LS);
    if(loadedToDo !== null){
        const parsedToDos = JSON.parse(loadedToDo);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        }); 
    }
};


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}    

init();
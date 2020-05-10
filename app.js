const clear = document.querySelector(".clear");
const dateElement = document.querySelector(".date");
const list = document.querySelector(".list");
const add = document.querySelector(".add-circle");
const input = document.getElementById("item");

const check = "radio_button_checked";
const uncheck = "radio_button_unchecked";
const line_through = "line-through";

let items, id;

let data = localStorage.getItem("toDo");

if(data){
    items = JSON.parse(data);
    id = items.length;
    loadItems(items);
}else{
    items=[];
    id=0;
}


function loadItems(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

const options={weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML =today.toLocaleDateString("en-US", options);

 function addToDo(toDo, id, done, trash){
     if (trash){return;}

     let Done = done ? check : uncheck;
     let Line = done ? line_through : "";

     const text = ` <li class="item row">
                <i id="${id}" class="material-icons col s2 circle ${Done}" job="complete">${Done}</i>
                <p class="text col col s9 ${Line}">${toDo}</p>
                <i id="${id}" class="material-icons col s1 delete" job="delete">delete</i>
            </li>`

            const position = "beforeend";
    list.insertAdjacentHTML(position, text);   
    items.push(
        {
            name:toDo,
            id: id,
            done: false,
            trash:false
        }
    );

    localStorage.setItem("toDo", JSON.stringify(items));
    id++;

 };

 function removeToDo(element){
     element.parentNode.parentNode.removeChild(element.parentNode);
     items[element.id].trash = true;
 }

 function completeToDo(element){
    
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);
    items[element.id].done = items[element.id].done ? false : true;

}

 document.addEventListener("keyup", function(event){
     if(event.keyCode == 13){
         const toDo = input.value;
         if(toDo){
             addToDo(toDo,id, false,false);
             items.push(
                 {
                     name:toDo,
                     id: id,
                     done: false,
                     trash:false
                 }
             );

             localStorage.setItem("toDo", JSON.stringify(items));
             id++;
         }
         input.value = "";
         
     }
 });

 list.addEventListener("click", function(event){
     let element = event.target;
     const elementJob = event.target.attributes.job.value;
     if(elementJob == "complete"){
         completeToDo(element);
     }
     else if (elementJob == "delete"){
         removeToDo(element);
     }
     localStorage.setItem("toDo", JSON.stringify(items));
 })


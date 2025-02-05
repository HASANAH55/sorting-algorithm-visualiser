let container = document.getElementById("container");
let units = container.children;
let unitsarray = [];
let unitsid = [];
let i = 0;
let inputbtn = document.getElementById("input-btn"); 
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
styleunits();
function addunits(){
    unitsarray = [];
    let x = document.getElementById('input').value;
    if(x<10){return window.alert('min is 10 max is 250')};
    if(x>250){return window.alert('min is 10 max is 250')}
    let unit = '<div class="h-unit bg-primary"></div>';
    while(container.childElementCount != 0){
        container.removeChild(container.firstElementChild);
    };
    for(let z = 0;z<x;z++){
        container.innerHTML += unit;
        //console.log(unit);
    };
    styleunits();
}
function styleunits(){
    let height = 290;
    if(document.body.clientWidth < 371){
        height = 240;
    }
    for(unit of units){
        let r = Math.ceil(Math.random()*height) +10;
        let width = 100 / units.length;
        unit.style.height = r+'px';
        unit.style.width = width+'%';
        unit.style.marginRight = "1px";
        unit.style.marginLeft = "1px";
        unitsarray.push(unit);
        unit.id = unit.style.height;
    }
    unitsarray.forEach(unit =>{
        unit.addEventListener("mouseover", event=>{
            if(units.length<15){
                return unit.innerHTML = `<div class="alert alert-light border fs-5 p-0 text-center pt-1 position-absolute" style="height:40px; transform: translate(-0% ,-120%); width:70px;" role="alert">${unit.id}</div>`;
            }
            unit.innerHTML = `<div class="alert alert-light border fs-5 p-0 text-center pt-1 position-absolute" style="height:40px; transform: translate(-20% ,-120%); width:65px;" role="alert">${unit.id}</div>`;
            console.log()
        })
        unit.addEventListener("mouseout", event=>{
                unit.innerHTML = "";
        })
    });
    unitsarray;
}
function sorting1(){
    let speed = document.getElementById('speed').value;
    if(speed<0){return window.alert("The minmum is 0");}
    let correct = unitsid.map(unit=>{return unit;});
    correct.sort((a,b) => a-b);
    loop();
    async function loop(){
        if(i==unitsid.length-1){i=0}
        if(unitsid[i]>unitsid[i+1]){
            [unitsid[i],unitsid[i+1]] = [unitsid[i+1],unitsid[i]];
            await display();
        }else{
            i++; 
        }
        if(JSON.stringify(unitsid) !== JSON.stringify(correct)){
            loop();
        }else{return ;}
    }
    function display(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                [unitsarray[i],unitsarray[i+1]] = [unitsarray[i+1],unitsarray[i]];
                i++;
                while(container.childElementCount != 0){
                    container.removeChild(container.firstElementChild)
                }
                unitsarray.forEach(child => container.appendChild(child));
                resolve();
            }, speed);
        })
    }
}
async function sorting2(arr){
    let speed = document.getElementById('speed').value;
    if(speed<0){return window.alert("The minmum is 0");}
    for(let i = 0;i<arr.length;i++){
        let min = i
        for(let j = i+1;j<arr.length;j++){
            if(arr[j]<arr[min]){
                min = j;
            }
        }
        if(min !== i){
            [arr[i],arr[min]] = [arr[min],arr[i]];
            await display(i,min);
        }
    }
    function display(i,min){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                [unitsarray[i],unitsarray[min]] = [unitsarray[min],unitsarray[i]];
                while(container.childElementCount != 0){
                    container.removeChild(container.firstElementChild)
                }
                unitsarray.forEach(child => container.appendChild(child));
                resolve();
            }, speed);
        })
    }
}
async function sorting3(arr) {
    let speed = document.getElementById('speed').value;
    if(speed<0){return window.alert("The minmum is 0");}
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            await display(j + 1, j + 2);
        }
        arr[j + 1] = key;
    }

    function display(i, j) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                [unitsarray[i], unitsarray[j]] = [unitsarray[j], unitsarray[i]];
                while (container.childElementCount != 0) {
                    container.removeChild(container.firstElementChild);
                }
                unitsarray.forEach(child => container.appendChild(child));
                resolve();
            }, speed);
        });
    }
}
btn1.onclick = function(){
    unitsid = unitsarray.map(element => {
        return parseFloat(element.id);
    });
    sorting1();
}
btn2.onclick = function(){
    unitsid = unitsarray.map(element => {
        return parseFloat(element.id);
    });
    sorting2(unitsid);
}
btn3.onclick = function(){
    unitsid = unitsarray.map(element => {
        return parseFloat(element.id);
    });
    sorting3(unitsid);
}
inputbtn.onclick = addunits;
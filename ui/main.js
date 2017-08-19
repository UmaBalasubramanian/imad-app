console.log('Loaded!');

var element = document.getElementById('main-text');
element.innerHTML = "Hola!!";

var img = document.getElementById('img');
img.onclick = function(){
    img.style.marginLeft = "10 px";
};
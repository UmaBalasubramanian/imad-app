console.log('Loaded!');

var element = document.getElementById('main-text');
element.innerHTML = "Hola!!";

var marginLeft = 0;
var img = document.getElementById('img');
function moveRight(){
        marginLeft = marginLeft +1;
     img.style.marginLeft = marginLeft+"px";
}

img.onclick = function(){
    var interval = setInterval(moveRight, 100);
};


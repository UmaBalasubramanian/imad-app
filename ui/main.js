console.log('Loaded!');

var element = document.getElementById('main-text');
element.innerHTML = "Hola!!";


var img = document.getElementById('img');
var marginLeft = 0;
function moveRight(){
        marginLeft = marginLeft +1;
     img.style.marginLeft = marginLeft+"px";
}

img.onclick = function(){
    var interval = setInterval(moveRight, 100);
};


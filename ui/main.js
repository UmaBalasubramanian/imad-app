console.log('Loaded!');

var element = document.getElementById('main-text');
element.innerHTML = "Hola!!";


var img = document.getElementById('img');
function moveRight(){
        marginLeft = marginLeft +1;
     img.style.marginLeft = marginLeft+"px";
}

img.onclick = function(){
    var interval = setInteval(moveRight, 100);
};


console.log('Loaded!');

var counter =0;
var btnCounter = document.getElementById('btnCounter');
var spanCounter = document.getElementById('counter');

btnCounter.onclick = function(){
    counter = counter +1;
    spanCounter.innerHTML = counter.toString();
};

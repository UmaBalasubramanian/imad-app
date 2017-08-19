console.log('Loaded!');

var btnCounter = document.getElementById('btnCounter');
var spanCounter = document.getElementById('counter');

btnCounter.onclick = function(){
    //counter = counter +1;
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpRequest.DONE){
            if(request.status == 200){
              var  counter = request.responseText;
              spanCounter.innerHTML = counter.toString();
            }
        }
    }
    request.open('GET', 'http://umabalu93.imad.hasura-app.io/counter', true);
    request.send(null);
    
};

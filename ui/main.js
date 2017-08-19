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

var name = document.getElementById('name');
var btnSubmit = document.getElementById('btnSubmit');
btnSubmit.onclick = function(){
    var names = ['name1','name2','name3'];
    var list = '';
    for(var i=0; i<names.length;i++){
        list += '<li>' + names[i] +'</li>';
       
    }
     var ul = document.getElementById('listNames');
     ul.innerHTML = list;
}
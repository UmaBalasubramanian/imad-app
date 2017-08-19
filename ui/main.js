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

var name = document.getElementById('name').value;
var btnSubmit = document.getElementById('btnSubmit');
btnSubmit.onclick = function(){
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpRequest.DONE){
            if(request.status == 200){
                var names = JSON.parse(request.responseText);
                var list = '';
                for(var i=0; i < names.length;i++){
                    list += '<li>' + names[i].toString() +'</li>';
                }
                 var ul = document.getElementById('listNames');
                 ul.innerHTML = list;
            }
        }
    };
    request.open('GET','http://umabalu93.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
    
}
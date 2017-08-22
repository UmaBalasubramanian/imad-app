console.log('Loaded!');

var btnSubmit = document.getElementById('btnSubmit');
btnSubmit.onclick = function(){
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        
        if(request.readyState == XMLHttpRequest.DONE){
            if(request.status === 200){
               console.log("User logged in successfully!!");
               alert('Login successful');
            }
            else if(request.status === 403){
                alert('Password is incorrect');
            }
            else if(request.status === 500){
                alert('Some error occured');
            }
        }
    };
    
    var nameElement = document.getElementById('username');
    var name = nameElement.value;
    var passwordElement = document.getElementById('password');
    var password = passwordElement.value;
    console.log(name +" "+ password);
    request.open('POST','http://umabalu93.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type',' application/json');
    request.send(JSON.stringify({username: name, password: password}));
    
}
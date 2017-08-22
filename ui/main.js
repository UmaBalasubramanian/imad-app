console.log('Loaded!');

var btnLogin = document.getElementById('btnLogin');
var btnRegister = document.getElementById('btnRegister');
btnLogin.onclick = function(){
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        
        if(request.readyState == XMLHttpRequest.DONE){
            if(request.status === 200){
               console.log("User logged in successfully!!");
               alert('Login successful');
               var login = document.getElementById("login");
               login.innerHTML = "Welcome "+name;
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
btnRegister.onclick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.status == 200){
            alert('User created successfully');
        }
        else if(request.status == 500){
            alert('Some error occured!!');
        }
    }
    var nameElement = document.getElementById('username');
    var name = nameElement.value;
    var passwordElement = document.getElementById('password');
    var password = passwordElement.value;
    console.log(name +" "+ password);
    request.open('POST','http://umabalu93.imad.hasura-app.io/create-user', true);
    request.setRequestHeader('Content-Type',' application/json');
    request.send(JSON.stringify({username: name, password: password})); 
}
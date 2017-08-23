var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyparser = require('body-parser');
var session = require('express-session');

var counter = 0;
var port = 80;
var names = [];

var app = express();
app.use(morgan('combined'));
app.use(bodyparser.json());
app.use(session({
    secret: 'someRandomValue',
    cookie: {maxAge: 1000*60*60*24*30}
}));

var config={
    user: 'umabalu93',
    database: 'umabalu93',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password : 'db-umabalu93-75012'
}


function template(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `<html>
  <title>
    ${title}
  </title>
  <body>
      <a href="/">Home</a>
    <h1>
     ${heading}
    </h1>
    <div>
        ${date.toDateString()}
    </div>
    ${content}
    
   </body>
</html>`;

return htmlTemplate;

}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/counter', function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});

var pool = new Pool(config);
app.get('/test-db', function(req, res){
    pool.query("SELECT * FROM test", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
});

app.get('/submit-name', function(req,res){
    var name = req.query.name;
    
    names.push(name);
    res.send(JSON.stringify(names));
});

function hash(input, salt){
   var hashed =  crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
   return ["pbkdf2","10000", salt, hashed.toString('hex')].join('$');
}

app.post('/create-user', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function(err,result){
        if(err){
            
            var json = JSON.stringify({
                error: "Some error occured"
            });
            res.status(500).send(json);
        }
        else{
            var json = JSON.stringify({
                message : "User Created Successfully"
            });
            res.send(json);
        }
    });
});

app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
  
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], function(err,result){
        if(err){
            res.status(500).send(err.toString);
        }
        else{
            if(result.rows.length === 0){
                res.status(403).send("User is forbidden");
            }
            else{
                var dbString = result.rows[0].password;
                var salt =dbString.split('$')[2];
                var hashedPassword = hash(password, salt);
                if(hashedPassword === dbString){
                    req.session.auth = {userId: result.rows[0].id, userName: result.rows[0].username};
                    var json = JSON.stringify({
                        message : "Credentials are correct"
                    });
                    res.send(json);
                }
                else{
                     var json = JSON.stringify({
                        error : "Credentials Invalid"
                    });
                    res.status(403).send(json);
                }
                
            }
            
        }
    });
});

app.get('/check-login', function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId){
        
        res.status(200).send(req.session.auth.userName);
    }
    else{
        res.status(403).send('You are not logged in ');
    }
});

app.get('/logout', function(req,res){
    delete req.session.auth;
    res.send('You are logged out successfully');
});
app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input, 'a-random-string');
    res.send(hashedString);
});

app.get('/articles/:articlename', function(req,res){
    var articlename = req.params.articlename;
    var articleData = pool.query("SELECT * FROM article WHERE title = $1", [articlename], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length == 0){
                res.status(404).send("Article not found");
            }
            else{
                articleData = result.rows[0];
                res.send(template(articleData));
            }
        }
    } );
    
    
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80


app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

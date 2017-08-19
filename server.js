var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne ={
    title: 'Article One | Uma',
    heading: 'Article - One',
    date: 'Aug 19, 2017',
    content: `<p>
        My contents are very simple and I am the first article of this web-app.
    </p>`
}
var articleTwo ={
    title: 'Article Two | Uma',
    heading: 'Article - Two',
    date: 'Aug 20, 2017',
    content: `<p>
        My contents are very simple and I am the second article of this web-app.
    </p>`
}
var articleThree ={
    title: 'Article Three | Uma',
    heading: 'Article - Three',
    date: 'Aug 21, 2017',
    content: `<p>
        My contents are very simple and I am the third article of this web-app.
    </p>`
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
        ${date}
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

app.get('/article-one', function(req,res){
    res.send(template(articleOne));
});

app.get('/article-two', function(req,res){
    res.send(template(articleTwo));
});

app.get('/article-three', function(req,res){
    res.send(template(articleThree));
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

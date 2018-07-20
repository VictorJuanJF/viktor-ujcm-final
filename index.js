var express=require('express');
var app=express();

app.set('view engine','ejs');


app.get('/',function(req,res){
    res.render('student',{name:students[req.params.id],id:req.params.id});
    
})

// app.get('/',function(req,res){
//     res.sendFile(__dirname   +'/index.html');
// })

app.get('/about',function(req,res){
    res.send('Hola EJS XD');
})

var students={
    1:'Mark',
    2:'TOm',
    3:'Json'
}


app.listen(3000,function(){
    console.log('Our server is live in port 3000');
})
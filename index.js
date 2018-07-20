var express=require('express');
var app=express();


app.set('port',(process.env.PORT || 5000));
app.set('view engine','ejs');


app.get('/student/:id',function(req,res){
    res.render('student',{name:students[req.params.id],id:req.params.id});
    
})
//holaa
 app.get('/',function(req,res){
     res.render('login');
 })

app.get('/about',function(req,res){
    res.send('Hola EJS XD');
})

var students={
    1:'Mark',
    2:'TOm',
    3:'Json'
}

app.listen(app.get('port'),function(){
    console.log('Node app is running in port',app.get('port'));
});
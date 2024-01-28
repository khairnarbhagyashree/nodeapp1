var express = require('express')
var bp= require('body-parser')
var _ = require('underscore')
var interceptor= require('./middleware')
const cors= require('cors')
var app = express()
app.use(bp.urlencoded({extended:true}))


app.use(interceptor.authUser)
var userdata = []
var uid=1
app.use(cors())
app.use(express.static('public'))

app.get('/loadusers', interceptor.logger, (req, res) => {
    res.send(userdata);
})
app.get('/loaduser/:id',(req,res)=>{
var uid=parseInt(req.params.id)
 var mtd= _.findWhere(userdata,{id:uid})
 /* userdata.forEach(function(todo){
     if(uid== todo.id ){
         mtd=todo
     }
 }) */
 if(mtd){
     res.send(mtd)
 }

})
app.delete('/deleteuser/:id',(req,res)=>{
    var uid=parseInt(req.params.id)
    var mtd= _.findWhere(userdata,{id:uid})
   
    if(mtd){
        userdata=_.without(userdata,mtd)
        res.send(mtd)
    }
})
app.put('/updateuser/:id',(req,res)=>{
    
})

app.post('/adduser',(req,res)=>{
var data= req.body
data.id=uid++
userdata.push(data)
res.send('user added...!')
})

app.listen(4000, () => {
    console.log('server is ready...!');

})

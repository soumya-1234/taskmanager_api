const express=require('express');
const bodyParser=require('body-parser');
const { urlencoded } = require('express');
const routes=require('express').Router();
const taskinfo=require("./src/routes/taskinfo");

const app=express();
app.use(routes);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const PORT=3000;

routes.get('/',(req,res)=>{
    res.status(200).send("Welcome to task-manager app");
})

routes.use('/tasks',taskinfo);

app.listen(PORT,(error)=>{
    if(!error){
        console.log("Server is running successfully on running port"+PORT);
    }
    else{
        console.log("Server not started due to error",error);
    }
});

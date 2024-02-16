import express from 'express';
import mysql from 'mysql';
import bodyparser from 'body-parser';
var app =express();
app.use(bodyparser.json());

// export default app;
var port = process.env.port||3000;

app.listen(port,()=>{
    console.log(`Port loaded successfully ${port}`);
});

var connect = mysql.createConnection({
    host:"localhost",
    user :"root",
    password:"admin@123",
    database:"crud_api"
})

connect.connect((error)=>{
    if(error){
        throw error;
    }
    else{
        console.log("connection done successfully");
    }
})

app.get("/users",
        (reqest,response,next)=>{
            console.log("hello");
            next();
        }
    ,   (request,response)=>{
    connect.query(`SELECT * FROM users`,(error,data)=>{
        console.log("enter in get query");
        if(error){
            throw new error;
        }
        else{
            response.send(data);
        }
    })
});

app.post("/users",(request,response)=>{
    const {name,phone_number,flight_number,flight_name}=request.body;
    connect.query("insert into users (name,phone_number,flight_number,flight_name) value (?,?,?,?)",[name,phone_number,flight_number,flight_name],error=>{
        if(error){
            console.error(error);
            response.status(500).send('error sended');
        }
        else{
            response.send('user inserted successfully');
        }
    })
});

app.put("/users/:id",(request,response)=>{
    const id= request.params;
    const {name,phone_number,flight_number,flight_name} = request.body;
    connect.query("update users set name=?,phone_number=?,flight_number=?,flight_name=? where id =?",[name,phone_number,flight_number,flight_name,id],error=>{
        if(error){
            console.error(error);
            response.status(500).send("error in updating");
        }
        else{
            response.send("updated successfully");
        }
    });
});

app.delete("/users/:id",(request,response)=>{
    const id =request.params;
    connect.query("delete  from users where id=?",[id],error=>{
        if(error){
            console.error(error);
            request.status(500).send("cannot deleted");
        }
        else{
            response.send("deleted successfully");
        }
    })
})


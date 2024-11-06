const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const session = require("express-session");
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({ 
    secret: 'your-secret-key', // Zmien na bardziej bezpieczny klucz 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todoapp"
});

db.connect(err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connected!");
});

app.listen(8000, (err) => {
    if (err) console.log(err);
    console.log("Server started");
});

app.post("/signup", (req, res)=>{
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/login", (req, res)=>{
    const sql = "SELECT * FROM login WHERE `email` =? AND `password`=?"
    db.query(sql, [req.body.email, req.body.password], (err, data)=>{
        console.log(sql)
        if(err) return res.json(err)
        if(data.length>0){
            return res.json("zalogowano")
        }else{
            return res.json("Cos poszlo nie ta")
        }
    })
})

app.get("/", (req, res) => {
    const sql = "SELECT * FROM tasks";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO tasks (task_name, task_desc) VALUES (?)";
    const values = [req.body.task, req.body.desc];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.log("Error in SQL query:", err);
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE tasks SET task_name = ?, task_desc = ? WHERE task_id = ?";
    const values = [req.body.task, req.body.desc];
    const id = req.params.id
    db.query(sql, [...values, id], (err, result) => {
        if (err) {
            console.log("Error in SQL query:", err);
            return res.json("Error");
        }
        return res.json(result);
    });
});

app.delete('/student/:id', (req, res)=>{
    const sql = "DELETE from tasks WHERE task_id = ?"
    const id = req.params.id
    db.query(sql, [id], (err, data) =>{
        if(err) return res.json("Error")
        return res.json(data)
    })
})

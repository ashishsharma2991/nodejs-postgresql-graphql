const app = require("express")();
const bodyParser = require("body-parser");
const { Client } = require("pg");
const dotenv = require("dotenv");
const client = new Client({
   user: 'postgres',
   host: 'localhost',
   database: 'DummyDB',
   password: '12345678',
   port: 5432,
 })
app.use(bodyParser.urlencoded({ extended: true }));
const { Sequelize } = require("sequelize");
const port = process.env.PORT || 3000;
dotenv.config();

app.get('/', async (req,resp)=>{
    
   await client.connect();
   
    try {
      //   const res = await client.query(`INSERT INTO marksheet (student_id, first_name, last_name, email, marks_obtained)
      //   VALUES (102, 'Ash', 'Shar', 'ashh@gmail.com', 85)`);
     const res = await client.query(`Select * from marksheet`);
        console.log(res.rows) // Hello world!
     } catch (err) {
        console.error(err);
     } finally {
        await client.end()
     }
     resp.send('connection succeffully established');
})
app.listen(3000, function () {
   console.log("server is running on port http://localhost:" + port);
});



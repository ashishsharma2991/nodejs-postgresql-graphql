const app = require("express")();
const bodyParser = require("body-parser");
const { Client } = require("pg");
const dotenv = require("dotenv");
var { graphql, buildSchema } = require("graphql")
const {gql} = require('apollo-server');
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

app.get('/gpl', async (req,res)=>{
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
   hello: () => {
     return "Hello world!"
   },
 }

 // Run the GraphQL query '{ hello }' and print out the response
graphql({
   schema,
   source: "{ hello }",
   rootValue,
 }).then(response => {
   console.log(response)
   res.send(response);
 })
})

app.get('/', async (req,resp)=>{
    
   await client.connect();
   let query= `CREATE TABLE marksheet(student_id INT PRIMARY KEY NOT NULL, first_name TEXT NOT NULL, last_name  TEXT NOT NULL, email CHAR(50), marks_obtained REAL)`;
    try {
      //   const res = await client.query(`INSERT INTO marksheet (student_id, first_name, last_name, email, marks_obtained)
      //   VALUES (101, 'Ashish', 'Sharma', 'ashish@gmail.com', 80)`);
   //   const res = await client.query(`${query}`);
   const res = await client.query(`select * from marksheet`);
        console.log(res.rows) // Hello world!
        resp.send(res.rows);
     } catch (err) {
        console.error(err);
     } finally {
        await client.end()
     }
     //resp.send('connection succeffully established');
})
app.listen(3000, function () {
   console.log("server is running on port http://localhost:" + port);
});


// CREATE TABLE marksheet(
//    student_id INT PRIMARY KEY     NOT NULL,
//    first_name           TEXT    NOT NULL,
//    last_name            TEXT     NOT NULL,
//    email        CHAR(50),
//    marks_obtained         REAL
// );
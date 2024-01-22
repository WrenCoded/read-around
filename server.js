const express = require("express");
const PORT = process.env.PORT || 8080;

//Create an instance of an express application
const app = express();

//Adds JSON middleware so the server can understand the json data that gets sent to it
app.use(express.json());

app.listen(PORT, function(){
  console.log(`Server is listening on http://localhost:${PORT}`);
})
  

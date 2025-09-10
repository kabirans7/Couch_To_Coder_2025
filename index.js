const express = require("express"); //Import express 
const app = express(); //call express function 
const port = 3000;
const fs = require("fs"); //fs stands for file system
const path = require("path");
const cors = require("cors");

app.use(cors());

app.use(express.json());

const recipesFilePath = path.join(__dirname, "recipes.json"); //find path of json

//Get homeroute
app.get("/", (request, response) => {
    response.send("Hello World!")

});  //Inline function 

app.get("/recipes", (request, response) => {
    //  read in json file to get the recipes
    fs.readFile(recipesFilePath, "utf-8", (err, data) => {
        // We read in the file through the filepath, encoding is added as security measure
        // err variable holds errors if there are any 
        // data variable holds data read in from file
        // We need to parse JSON data to be turned into plain JavaScript
        const recipes = JSON.parse(data);
        //we send recipes like before
        response.json(recipes);
    })
    
});

//Creating new recipe; use powershell
app.post("/recipes", (request, response) => {
    const newRecipe = request.body; 
    
    fs.readFile(recipesFilePath, "utf8", (err, data) => {
        const recipes = JSON.parse(data);
        recipes.push(newRecipe);

        fs.writeFile(recipesFilePath, JSON.stringify(recipes), () => {})
    })
    
    response.send("Recipe added, storing your fav dishes!")
});

app.listen(port, () => {
    console.log("Server is running on http://localhost:", port)
});
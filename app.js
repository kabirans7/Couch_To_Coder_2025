//document is website itself but counterpart to HTML 
// (allows JS to communicate with HTML)
//create element create exact element from JS to HTML
//Port 3000 in backend and 5500 is frontend in client server

// const { setServers } = require("dns");
// const { application } = require("express");

//JS gets loaded into HTML file
//get request and fetch method
document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:3000/recipes");
    const recipes = await response.json();
    for (recipe of recipes) {

        //Create container that will hold recipe
        const recipeContainer = document.createElement("div");

        //3 steps of elements nested inside element (e.g. h3)
        //1. Create element 
        // 2. Give element content 
        // 3. Append it to the parent element (element above element we are working with)


        //Use CSS for text format not h1, h2, h3
        //1. Create Element
        const nameTag = document.createElement("h3");

        //2. Element content 
        nameTag.innerText = recipe.name;

        //3. Append to parent element to avoid being in the void
        recipeContainer.appendChild(nameTag);


        const cuisineTag = document.createElement("p");
        cuisineTag.innerText = recipe.cuisine;
        recipeContainer.appendChild(cuisineTag);

        const timeTag = document.createElement("p");
        timeTag.innerText = recipe.time;
        recipeContainer.appendChild(timeTag);


        //Create unordered list element for ingredients 
        const ingredientsListTag = document.createElement("ul");

        //create the list items for the ingredients list
        // arrays nested for loop
        for (ingredient of recipe.ingredients) {
            const ingredientsListItemTag = document.createElement("li");
            ingredientsListItemTag.innerText = ingredient;
            ingredientsListTag.appendChild(ingredientsListItemTag);
        }

        recipeContainer.appendChild(ingredientsListTag);

        recipeContainer.appendChild(document.createElement("br"));

        //create the ordered list element for the steps of the recipe
        const stepsListTag = document.createElement("ol");

        //create list items for steps list
        for (step of recipe.steps) {
            const stepsListItemTag = document.createElement("li");
            stepsListItemTag.innerText = step;
            stepsListTag.appendChild(stepsListItemTag);

        }

        recipeContainer.appendChild(stepsListTag);


        //Put to HTML
        //CSS Selector
        const recipeList = document.querySelector("#recipe-list");
        recipeList.appendChild(recipeContainer)



    }

    const recipeForm = document.querySelector("form");
    recipeForm.addEventListener("submit", (event) => {
        event.preventDefault(); //Block default behavior //No reloading page
        
        const newRecipe = {};

        newRecipe.name = event.target.name.value;
        newRecipe.cuisine = event.target.cuisine.value;
        newRecipe.time = event.target.time.value;
        
        const ingredientsText = event.target.ingredients.value;
        //Use regex
        newRecipe.ingredients = ingredientsText.split(/\r?\n/); //break it down
       
        const stepsText = event.target.steps.value;
        newRecipe.steps = stepsText.split(/\r?\n/);

        fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" //Telling backend to prepare for Json Data
            },
            //Actual message
            body: JSON.stringify(newRecipe) 
        }
        )


    })
    
    





})



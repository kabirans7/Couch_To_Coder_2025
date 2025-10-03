document.addEventListener("DOMContentLoaded", async () => {
    // Fetch recipes
    const response = await fetch("http://localhost:3000/recipes");
    const recipes = await response.json();
    
    for (recipe of recipes) {
        const recipeContainer = document.createElement("div");
        const nameTag = document.createElement("h3");
        nameTag.innerText = recipe.name;
        recipeContainer.appendChild(nameTag);

        const cuisineTag = document.createElement("p");
        cuisineTag.innerText = recipe.cuisine;
        recipeContainer.appendChild(cuisineTag);

        const timeTag = document.createElement("p");
        timeTag.innerText = recipe.time;
        recipeContainer.appendChild(timeTag);

        const ingredientsListTag = document.createElement("ul");
        for (ingredient of recipe.ingredients) {
            const ingredientsListItemTag = document.createElement("li");
            ingredientsListItemTag.innerText = ingredient;
            ingredientsListTag.appendChild(ingredientsListItemTag);
        }
        recipeContainer.appendChild(ingredientsListTag);
        recipeContainer.appendChild(document.createElement("br"));

        const stepsListTag = document.createElement("ol");
        for (step of recipe.steps) {
            const stepsListItemTag = document.createElement("li");
            stepsListItemTag.innerText = step;
            stepsListTag.appendChild(stepsListItemTag);
        }
        recipeContainer.appendChild(stepsListTag);

        const recipeList = document.querySelector("#recipe-list");
        recipeList.appendChild(recipeContainer);
    }

    // Form submission
    const recipeForm = document.querySelector("form");
    recipeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const newRecipe = {};
        newRecipe.name = event.target.name.value;
        newRecipe.cuisine = event.target.cuisine.value;
        newRecipe.time = event.target.time.value;
        
        const ingredientsText = event.target.ingredients.value;
        newRecipe.ingredients = ingredientsText.split(/\r?\n/);
       
        const stepsText = event.target.steps.value;
        newRecipe.steps = stepsText.split(/\r?\n/);

        fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecipe) 
        })
    })
    
    // CHART SECTION - WITH DEBUGGING
    console.log("Fetching cuisine data...");
    
    try {
        const cuisineResponse = await fetch("http://localhost:3000/cuisine-data");
        console.log("Response status:", cuisineResponse.status);
        
        const cuisineData = await cuisineResponse.json();
        console.log("Cuisine data received:", cuisineData);
        
        const xValues = cuisineData.map(item => item.cuisine);
        const yValues = cuisineData.map(item => item.count);
        
        console.log("xValues:", xValues);
        console.log("yValues:", yValues);

        const canvas = document.getElementById("myChart");
        console.log("Canvas element found:", canvas);
        
        if (!canvas) {
            console.error("Canvas element not found!");
            return;
        }

        const ctx = canvas.getContext("2d");
        console.log("Canvas context:", ctx);

        const chart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: xValues,
                datasets: [{
                    data: yValues,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Cuisine Popularity"
                    }
                }
            }
        });
        
        console.log("Chart created successfully:", chart);
        
    } catch (error) {
        console.error("Error creating chart:", error);
    }
});



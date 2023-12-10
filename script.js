const recipesListElement = document.querySelector('.recipesList');
const inputElement = document.querySelector('.recipeSearchBar');
var recipesList;

// ## Recipes Fetching from Tasty API ##
async function fetchRecipes() {
    const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=1000';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'debb754d89mshab2643a4fbcb08ap173fe0jsnd48da3d99f24',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };

    try {
        const res = await fetch(url, options)
        const parsedResponsed = await res.json();
        return parsedResponsed.results
    }
    catch (err) {
        console.error(err);
    }
}

// ## Recipes Parsing ##
function recipeElementStringFromObject(recipeObject) {
    const recipeCard = ` <a class="recipeCard" href="https://tasty.co/recipe/${recipeObject.slug}">
    <img class="recipeImage" src="${recipeObject.thumbnail_url}">
    <div class="recipeText">
        <h2><b>${recipeObject.name}</b></h2>
        <p>${recipeObject.description}</p>
    </div>
    </a>`
    return recipeCard;
}

function filterRecipesListByName(inputName, recipeList) {
    /*
    Given a name to filter by, and a list of recipe objects, returns the corresponding innerHTML for the recipes to be displayed.
    */
    let recipesListItemsElement = ''
    recipesList.forEach(recipeObject => {
        if (recipeObject.name.startsWith(inputName)) {
            recipeElementString = recipeElementStringFromObject(recipeObject);
            recipesListItemsElement += recipeElementString
        }
    });
    return recipesListItemsElement;
}

function displayRecipes(recipesListElement, recipesListItemsElement) {
    recipesListElement.innerHTML = recipesListItemsElement;
}


// ## Main ## fetches from the api, shows the entire list to the screen, adds functionality to the search bar

// recipesList = fetchRecipes();
recipesList = [
    { name: "milanesas de pollo", description: "de carne", thumbnail_url: "", slug: "" },
    { name: "galletitas de maicena", description: "con chips", thumbnail_url: "", slug: "" },
    { name: "galletitas de avena", description: "yummy", thumbnail_url: "", slug: "" },
    { name: "milanesas de carne", description: "de bola de lomo", thumbnail_url: "", slug: "" },
    { name: "Sopa de calabaza", description: "para el invierno", thumbnail_url: "", slug: "" },
    { name: "Jugo de naranja", description: "Recien exprimido", thumbnail_url: "", slug: "" }
]

let recipeListItemsElement = filterRecipesListByName('', recipesList);
displayRecipes(recipesListElement, recipeListItemsElement);

// ## Search Bar ##
inputElement.onkeyup = (e) => {
    let userInput = e.target.value;
    let filteredRecipesListItemsELement = filterRecipesListByName(userInput, recipesList);
    displayRecipes(recipesListElement, filteredRecipesListItemsELement);
}
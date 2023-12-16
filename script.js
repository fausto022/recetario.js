const recipesListElement = document.querySelector('.recipesList');
const inputElement = document.querySelector('.recipeSearchBar');
let recipesList;

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
        const parsedResponse = await res.json();
        console.log(parsedResponse.results);
        return parsedResponse.results
    }
    catch (err) {
        console.error(err);
    }
}

// ## Recipes Parsing ##
function recipeElementStringFromObject(recipeObject) {
    recipeDescription = recipeObject.description != "" ? recipeObject.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const recipeCard = ` 
    <a class="recipeCard" href="https://tasty.co/recipe/${recipeObject.slug}">
        <div class="recipeContent">
            <div class="recipeImageFrame">
                <img class="recipeImage" src="${recipeObject.thumbnail_url}">
            </div>
            <div class="recipeText">
                <h2><b>${recipeObject.name}</b></h2>
                <p>${recipeDescription}</p>
            </div>
        </div>
    </a>`
    return recipeCard;
}

function filterRecipesListByName(inputName, recipesList) {
    /*
    Given a name to filter by, and a list of recipe objects, returns the corresponding innerHTML for the recipes to be displayed.
    */
    let recipesListItemsElement = ''
    recipesList.forEach(recipeObject => {
        if (recipeObject.name.toLowerCase().includes(inputName.toLowerCase())) {
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

fetchRecipes().then((fetchedRecipesList) => {
    let recipeListItemsElement = filterRecipesListByName('', fetchedRecipesList);
    displayRecipes(recipesListElement, recipeListItemsElement);
    console.log("fetchedRecipesList inside then: ")
    console.log(fetchedRecipesList);
    console.log("assigning fetchedRecipesList to recipesList...");
    recipesList = fetchedRecipesList;
    console.log("recipesList: ");
    console.log(recipesList);
});

// recipesList = [
//     { name: "Tomato And Anchovy Pasta", description: "Savor the bold flavors of this Tomato and Anchovy Pasta, a perfect weeknight meal that's both simple and satisfying. With a zesty tomato sauce and umami-packed anchovies, this dish will have your taste buds dancing in no time!", thumbnail_url: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216182.jpg", slug: "tomato-and-anchovy-pasta" },
//     { name: "Blueberry Cream Muffins", description: "", thumbnail_url: "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/4e9524578f544c888af761e10630593b.jpeg", slug: "blueberry-cream-muffins" },
//     { name: "One-Pot Lemon Garlic Shrimp Pasta", description: "This easy 30-minute pasta recipe transforms ingredients that you already have in your kitchen into a posh, seafood dish you’ll want to serve at your next dinner party. And since the whole dish is made in a single pot, clean-up is easy. Don’t be surprised if this becomes your favorite quick go-to. ", thumbnail_url: "https://img.buzzfeed.com/video-api-prod/assets/9ee2dadcbfcb4095872e6cdbaa24ff14/Thumb_A_FB.jpg", slug: "one-pot-lemon-garlic-shrimp-pasta" },
//     { name: "One-Pot Garlic Parmesan Pasta", description: "One pot. Garlic. Parmesan. Pasta. Need we say more? This dish is the ultimate in easy weeknight meals, with all the flavor and none of the fuss", thumbnail_url: "one-pot-garlic-parmesan-pasta", slug: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/f69a7f4192b94d8395757b365ac6d866/GarlicParmPasta.jpg" },
//     { name: "Low-Carb Avocado Chicken Salad", description: "This chicken salad is a lunchtime delight! Packed with creamy avocado, tender chicken, and crunchy veggies, it's a healthy and satisfying meal that won't weigh you down. Tossed in a tangy yogurt dressing with a hint of spice, it's a flavor explosion that's perfect for a light meal.", thumbnail_url: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/45b4efeb5d2c4d29970344ae165615ab/FixedFBFinal.jpg", slug: "low-carb-avocado-chicken-salad" },
// ]
// let initialRecipeListInnerHTML = filterRecipesListByName('', recipesList);
// displayRecipes(recipesListElement, initialRecipeListInnerHTML);

// ## Search Bar ##
inputElement.onkeyup = (e) => {
    let userInput = e.target.value;
    let filteredRecipesListInnerHTML = filterRecipesListByName(userInput, recipesList);
    displayRecipes(recipesListElement, filteredRecipesListInnerHTML);
}
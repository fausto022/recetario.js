const recipesListElement = document.querySelector('.recipesList')
let recipesList;


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

function recipeElementFromObject(recipeObject) {
    let recipeCard = document.createElement("a")
    recipeCard.classList.add("recipeCard")
    recipeCard.href = `https://tasty.co/recipe/${recipeObject.slug}`
    recipeCard.innerHTML = `<img class="recipeImage" src=${recipeObject.thumbnail_url}>
    <div class="recipeText">
        <h2><b>${recipeObject.name}</b></h2>
        <p>${recipeObject.description}</p>
    </div>`
    return recipeCard;
}

fetchRecipes().then(
    (recipesArrayFetch) => {
        console.log(recipesArrayFetch.length);
        recipesArrayFetch.forEach(recipeObject => {
            recipeElement = recipeElementFromObject(recipeObject)
            recipesListElement.appendChild(recipeElement);
        });
    }
);
console.log("Recipes fetched")
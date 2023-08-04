const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "6fbba79d";
const APP_key = "d3c177549bb04d3f1a7248767a004320";
const baseURL = `https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key=${APP_key}`;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
  const response = await fetch(url);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  let generatedHTML = "";
  results.forEach((result) => {
    generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="${result.recipe.label}" />
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" href="${result.recipe.url}" target="_blank">
              View Recipe
            </a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(
            2
          )}</p>
        </div>
      `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}

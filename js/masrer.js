$(document).ready(() => {
    $(".loading-screen").show();
    $("body").css("overflow", "hidden");
    setTimeout(() => {
        $(".loading-screen").fadeOut(500, () => {
            $("body").css("overflow", "visible");
        });
    }, 1500);
})

//* هنا انا بتحكم في مكان الناف بار وكمان بغير الايقونه
$("#icon2").click(function() {
    $(".sidebar").toggleClass("left-0");
    if ($(this).hasClass('fa-bars')) {
        $(this).removeClass("fa-bars");
        $(this).addClass("fa-xmark");
    } else {
        $(this).removeClass("fa-xmark");
        $(this).addClass("fa-bars");
    }
});
$(".dark-mode").click(function() {
    $("body").toggleClass("bg-black");
    $(".sidebar-data").toggleClass("bg-black");
    if ($(this).hasClass('fa-moon')) {
        $(this).removeClass("fa-moon");
        $(this).addClass("fa-sun");
    } else {
        $(this).removeClass("fa-sun");
        $(this).addClass("fa-moon");
    }
});


//!_______________________(START Categories)_________________________________
let allCategories = document.querySelector(".all-Categories");

async function getCategories() {
    allCategories.innerHTML = ""
    $(".inner-loading-screen").fadeIn(1500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    let categories = response.categories;
    categories.map(function(e) {
        allCategories.innerHTML += `
                <div class="col-lg-3 col-md-4 col-12">
                    <div onclick="getCategoryMeals('${e.strCategory}')" class="Categori position-relative p-2 start-0 top-0 text-black overflow-hidden rounded-2">
                        <img src="${e.strCategoryThumb}" alt="" width="100%">
                        <div class="text-Categori position-absolute text-center d-flex justify-content-center align-items-center flex-column gap-1 p-2">
                            <h2 class="h6 name fw-bold">${e.strCategory} </h2>
                            <p class="Description">${e.strCategoryDescription} </p>
                        </div>
                    </div>
                </div>
        `
    })

}
getCategories();

async function getCategoryMeals(link) {
    allCategories.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${link}`);
    response = await response.json();
    let meals = response.meals;
    meals.map(function(e) {
        allCategories.innerHTML += `
                <div class="col-lg-3 col-md-4 col-12">
                    <div onclick="getMealDetails('${e.idMeal}')" class="Categori position-relative p-2 start-0 top-0 text-black overflow-hidden rounded-2">
                        <img src="${e.strMealThumb}" alt="" width="100%">
                        <div class="text-Categori position-absolute text-center d-flex justify-content-center align-items-center flex-column gap-1 p-2">
                            <h2 class="h6 name fw-bold">${e.strMeal} </h2>
                        </div>
                    </div>
                </div>
        `
    })
}
async function getMealDetails(id) {
    allCategories.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    response = await response.json(response);
    let detels = response.meals;
    console.log(detels)
    detels.map(function(d) {
                let ingredients = ``;
                for (let i = 1; i <= 20; i++) {
                    if (d[`strIngredient${i}`]) {
                        ingredients += `<li class="text-bg-info p-3 rounded-2">${d[`strMeasure${i}`]} ${d[`strIngredient${i}`]}</li>`;
            }
        }
        allCategories.innerHTML += `
            <div class="col-12">
                    <div class="details d-flex justify-content-between p-3 text-warning flex-column flex-lg-row">
            <div class="imaggg">
                <img class="d-block" src="${d.strMealThumb} " alt="" width="100%">
                <h3 class="text-warning my-3 p-2">${d.strMeal} </h3>
            </div>
            <div class="all-details">
                <p class="fs-3 fw-bold text-warning">Instructions</p>
                <p class="des">${d.strInstructions}</p>
                <p class="Area"><span class=" h4 my-3">Area :</span>${d.strArea}</p>
                <p class="Category"><span class=" h4 my-3">Category :</span> ${d.strCategory}</p>
                <p class="Recipes h4 my-3">Recipes :</p>
                <ul class=" d-flex align-items-center justify-content-center gap-4 flex-wrap my-2">
                ${ingredients}
                </ul>
                <p class="Tags h4 my-3">Tags :</p>
                <a href="${d.strSource}" class="btn btn-outline-success px-5 py-2 fs-6 fw-bold rounded-2">source</a>
                <a href="${d.strYoutube}" class="btn btn-outline-danger px-5 py-2 fs-6 fw-bold rounded-2">youtube </a>
            </div>
        </div>
            </div>`
    })
}

//!_______________________(END Categories)_________________________________



//!_______________________(START Area)_________________________________

let allAreas = document.querySelector(".all-Areas");

async function getArea() {
    allAreas.innerHTML="";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    let data = respone.meals.slice(0, 20);
    data.map(function(e) {
    allAreas.innerHTML += `
        <div class=" col-lg-3 col-md-4 col-6">
            <div onclick="getAreaMeals('${e.strArea}')" class="Area position-relative p-2 start-0 top-0 text-black rounded-2 text-center">
                <i class="fa-solid fa-house-laptop fa-4x text-white mb-3"></i>
                <h2 class=" fw-bold text-white">${e.strArea} </h2>
            </div>
        </div>
    `
    })
}
getArea();

async function getAreaMeals(area) {
    allAreas.innerHTML= "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    console.log(response)
        response.meals.map(function(e) {
        allAreas.innerHTML += `
                <div class="col-lg-3 col-md-4 col-12">
                    <div onclick="getAreaDetails('${e.idMeal}')" class="Categori position-relative p-2 start-0 top-0 text-black overflow-hidden rounded-2">
                        <img src="${e.strMealThumb}" alt="" width="100%">
                        <div class="text-Categori position-absolute text-center d-flex justify-content-center align-items-center flex-column gap-1 p-2">
                            <h2 class="h6 name fw-bold">${e.strMeal} </h2>
                        </div>
                    </div>
                </div>
        `
    })
}
async function getAreaDetails(id) {
    allAreas.innerHTML= ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    response = await response.json(response);
    let detels = response.meals;
    console.log(detels)
    detels.map(function(d) {
                let ingredients = ``;
                for (let i = 1; i <= 20; i++) {
                    if (d[`strIngredient${i}`]) {
                        ingredients += `<li class="text-bg-info p-3 rounded-2">${d[`strMeasure${i}`]} ${d[`strIngredient${i}`]}</li>`;
            }
        }
        allAreas.innerHTML += `
            <div class="col-12">
                    <div class="details d-flex justify-content-between p-3 text-warning flex-column flex-lg-row">
            <div class="imaggg">
                <img class="d-block" src="${d.strMealThumb} " alt="" width="100%">
                <h3 class="text-warning my-3 p-2">${d.strMeal} </h3>
            </div>
            <div class="all-details">
                <p class="fs-3 fw-bold text-warning">Instructions</p>
                <p class="des">${d.strInstructions}</p>
                <p class="Area"><span class=" h4 my-3">Area :</span>${d.strArea}</p>
                <p class="Category"><span class=" h4 my-3">Category :</span> ${d.strCategory}</p>
                <p class="Recipes h4 my-3">Recipes :</p>
                <ul class=" d-flex align-items-center justify-content-center gap-4 flex-wrap my-2">
                ${ingredients}
                </ul>
                <p class="Tags h4 my-3">Tags :</p>
                <a href="${d.strSource}" class="btn btn-outline-success px-5 py-2 fs-6 fw-bold rounded-2">source</a>
                <a href="${d.strYoutube}" class="btn btn-outline-danger px-5 py-2 fs-6 fw-bold rounded-2">youtube </a>
            </div>
        </div>
            </div>`
    })
}
//!_______________________(END Area)_________________________________

//!_______________________( start Ingredients)_________________________________
let ingredients = document.querySelector(".all-Ingredients");

async function getIngredients() {
    ingredients.innerHTML= ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    let data = respone.meals.slice(0, 20);
    data.map(function(e) {
    ingredients.innerHTML += `
        <div class="col-lg-3 col-md-6 col-12">
            <div onclick="getIngredientsMeals('${e.strIngredient}')" class="text-center text-white">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h2 class="fw-bold">${e.strIngredient} </h2>
                <p class="Description">${e.strDescription}</p>
            </div>
        </div>
    `
    })
}
getIngredients()


async function getIngredientsMeals(ingredi) {
    ingredients.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredi}`)
    response = await response.json()
    let data=response.meals
    console.log(data)
    data.map(function(i) {
        ingredients.innerHTML += `
                <div class="col-lg-3 col-md-4 col-12">
                    <div  onclick="getingredientsDetails('${i.idMeal}')" class="Categori position-relative p-2 start-0 top-0 text-black overflow-hidden rounded-2">
                        <img src="${i.strMealThumb}" alt="" width="100%">
                        <div class="text-Categori position-absolute text-center d-flex justify-content-center align-items-center flex-column gap-1 p-2">
                            <h2 class="h6 name fw-bold">${i.strMeal} </h2>
                        </div>
                    </div>
                </div>
        `
    })
}
async function getingredientsDetails(id) {
    ingredients.innerHTML= ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    response = await response.json(response);
    let detels = response.meals;
    console.log(detels)
    detels.map(function(d) {
                let ingredientsss = ``;
                for (let i = 1; i <= 20; i++) {
                    if (d[`strIngredient${i}`]) {
                        ingredientsss += `<li class="text-bg-info p-3 rounded-2">${d[`strMeasure${i}`]} ${d[`strIngredient${i}`]}</li>`;
            }
        }
        ingredients.innerHTML += `
            <div class="col-12">
                    <div class="details d-flex justify-content-between p-3 text-warning flex-column flex-lg-row">
            <div class="imaggg">
                <img class="d-block" src="${d.strMealThumb} " alt="" width="100%">
                <h3 class="text-warning my-3 p-2">${d.strMeal} </h3>
            </div>
            <div class="all-details">
                <p class="fs-3 fw-bold text-warning">Instructions</p>
                <p class="des">${d.strInstructions}</p>
                <p class="Area"><span class=" h4 my-3">Area :</span>${d.strArea}</p>
                <p class="Category"><span class=" h4 my-3">Category :</span> ${d.strCategory}</p>
                <p class="Recipes h4 my-3">Recipes :</p>
                <ul class=" d-flex align-items-center justify-content-center gap-4 flex-wrap my-2">
                ${ingredientsss}
                </ul>
                <p class="Tags h4 my-3">Tags :</p>
                <a href="${d.strSource}" class="btn btn-outline-success px-5 py-2 fs-6 fw-bold rounded-2">source</a>
                <a href="${d.strYoutube}" class="btn btn-outline-danger px-5 py-2 fs-6 fw-bold rounded-2">youtube </a>
            </div>
        </div>
            </div>`
    })
}

//!_______________________(END Ingredients)_________________________________


//!_______________________( start Ingredients)_________________________________
let Search = document.querySelector(".all-Search");

async function searchByName(term) {
    Search.innerHTML= ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    respone = await respone.json()
    let data = respone.meals.slice(0, 20);
    console.log(data)
    data.map(function(i) {
    Search.innerHTML += `
        <div class="col-lg-3 col-md-4 col-12">
            <div onclick="getsearchDetails('${i.idMeal}')" class="Categori position-relative p-2 start-0 top-0 text-black overflow-hidden rounded-2">
                <img src="${i.strMealThumb}" alt="${i.strMeal}" width="100%">
                <div class="text-Categori position-absolute text-center d-flex justify-content-center align-items-center flex-column gap-1 p-2">
                    <h2 class="h6 name fw-bold">${i.strMeal} </h2>
                </div>
            </div>
        </div>
    `
    })
}
let searchInputByName = document.querySelector("#by-name");
searchInputByName.addEventListener("input", function() {
    let newLink = searchInputByName.value;
    searchByName(newLink);
});

//!_____________________________________________________
async function searchFirstLetter(term) {
    Search.innerHTML= "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    respone = await respone.json()
    let data = respone.meals.slice(0, 20);
    console.log(data)
    data.map(function(i) {
    Search.innerHTML += `
        <div class="col-lg-3 col-md-4 col-12">
            <div onclick="getsearchDetails('${i.idMeal}')" class="Categori position-relative p-2 start-0 top-0 text-black overflow-hidden rounded-2">
                <img src="${i.strMealThumb}" alt="${i.strMeal}" width="100%">
                <div class="text-Categori position-absolute text-center d-flex justify-content-center align-items-center flex-column gap-1 p-2">
                    <h2 class="h6 name fw-bold">${i.strMeal} </h2>
                </div>
            </div>
        </div>
    `
    })
}
let searchInputByfirstLetter = document.querySelector("#first-letter")
searchInputByfirstLetter.addEventListener("input", function() {
    let newLink = searchInputByfirstLetter.value;
    searchByName(newLink);
})

async function getsearchDetails(id) {
    Search.innerHTML= "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    response = await response.json(response);
    let detels = response.meals;
    console.log(detels)
    detels.map(function(d) {
                let ingredientsss = ``;
                for (let i = 1; i <= 20; i++) {
                    if (d[`strIngredient${i}`]) {
                        ingredientsss += `<li class="text-bg-info p-3 rounded-2">${d[`strMeasure${i}`]} ${d[`strIngredient${i}`]}</li>`;
            }
        }
        Search.innerHTML += `
            <div class="col-12">
                    <div class="details d-flex justify-content-between p-3 text-warning flex-column flex-lg-row">
            <div class="imaggg">
                <img class="d-block" src="${d.strMealThumb} " alt="" width="100%">
                <h3 class="text-warning my-3 p-2">${d.strMeal} </h3>
            </div>
            <div class="all-details">
                <p class="fs-3 fw-bold text-warning">Instructions</p>
                <p class="des">${d.strInstructions}</p>
                <p class="Area"><span class=" h4 my-3">Area :</span>${d.strArea}</p>
                <p class="Category"><span class=" h4 my-3">Category :</span> ${d.strCategory}</p>
                <p class="Recipes h4 my-3">Recipes :</p>
                <ul class=" d-flex align-items-center justify-content-center gap-4 flex-wrap my-2">
                ${ingredientsss}
                </ul>
                <p class="Tags h4 my-3">Tags :</p>
                <a href="${d.strSource}" class="btn btn-outline-success px-5 py-2 fs-6 fw-bold rounded-2">source</a>
                <a href="${d.strYoutube}" class="btn btn-outline-danger px-5 py-2 fs-6 fw-bold rounded-2">youtube </a>
            </div>
        </div>
            </div>`
    })
}

//!_______________________(END Ingredients)_________________________________
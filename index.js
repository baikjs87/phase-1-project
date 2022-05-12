document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#button");
    // button.addEventListener("click", callHeroes);
    const form = document.querySelector("#search-form");
    form.addEventListener("submit", searchHero);
});

function callHeroes() {
    fetch(
        "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=100"
    )
        .then((result) => result.json())
        .then((data) => console.log(data.data.results));
}

fetch(
    "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=100"
)
    .then((result) => result.json())
    .then((data) => {
        for (const hero of data.data.results) {
            displayHeroes(hero);
        }
    });

function searchHero(e) {
    e.preventDefault();
    const searchText = e.target.name.value.toLowerCase();

    fetch(
        "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=100"
    )
        .then((result) => result.json())
        .then((data) => {
            for (const hero of data.data.results) {
                if (hero.name.toLowerCase() === searchText) {
                    console.log(hero);
                    showResult(hero);
                }
                // else {
                //     const errorResult =
                //         document.querySelector(".search-result");
                //     const errorMsg = document.createElement("h1");
                //     errorMsg.className = "error-msg";
                //     errorMsg.textContent = "No Hero Found :(";
                //     console.log(errorMsg);
                //     errorResult.appendChild(errorMsg);
                // }
            }
        });

    function showResult(data) {
        const searchResult = document.querySelector(".search-result");

        //------ Create search result card
        const resultBox = document.createElement("div");
        resultBox.className = "result-box";

        const resultName = document.createElement("h2");
        resultName.className = "result-hero-name";
        resultName.textContent = `${data.name}`;

        const resultDetails = document.createElement("div");
        resultDetails.className = "result-description";
        const heroDesc = document.createElement("p");
        resultDetails.className = "details";
        resultDetails.className = "hero-description";
        const description = document.createTextNode(`${data.description}`);

        const closeBox = document.createElement("button");
        closeBox.className = "close-btn";
        closeBox.textContent = "x";

        //------ Fetch and create search result image
        const searchImg = document.createElement("img");
        const searchName = searchText.toLowerCase();
        if (searchName === data.name.toLowerCase()) {
            searchImg.setAttribute(
                "src",
                `${data.thumbnail.path}/portrait_fantastic.${data.thumbnail.extension}`
            );
            searchImg.className = "search-image";
        }

        closeBox.addEventListener("click", () => {
            const removeResult = document.querySelector(".result-box");
            removeResult.remove();
        });

        heroDesc.appendChild(description);
        resultDetails.appendChild(heroDesc);
        resultBox.appendChild(searchImg);
        resultBox.appendChild(resultName);
        resultBox.appendChild(resultDetails);
        resultBox.appendChild(closeBox);
        searchResult.appendChild(resultBox);

        const form = document.querySelector("#search-form");
        form.reset();
    }
    const removeResult = document.querySelector(".result-box");
    removeResult.remove();
}

function displayHeroes(hero) {
    const heroList = document.querySelector("#hero-collection");
    const heroCard = document.createElement("div");
    heroCard.className = "card";
    // heroCard.setAttribute("href", `${hero.urls[0].url}`);

    const heroImg = document.createElement("img");
    heroImg.setAttribute(
        "src",
        `${hero.thumbnail.path}/portrait_fantastic.${hero.thumbnail.extension}`
    );
    heroImg.className = "heroImg";

    const heroTitle = document.createElement("h2");
    heroTitle.className = "hero-name";
    const heroName = document.createTextNode(`${hero.name}`);

    heroTitle.appendChild(heroName);
    heroCard.appendChild(heroImg);
    heroCard.appendChild(heroTitle);
    // heroDesc.appendChild(description);
    // heroDetails.appendChild(heroDesc);
    // heroCard.appendChild(heroDetails);

    heroList.appendChild(heroCard);
}

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#button");
    // button.addEventListener("click", callHeroes);
    const form = document.querySelector("#search-form");
    form.addEventListener("submit", searchHero);
});

// function callHeroes() {
//     fetch(
//         "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=100"
//     )
//         .then((result) => result.json())
//         .then((data) => console.log(data.data.results));
// }

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
                } else {
                    const errorResult =
                        document.querySelector(".search-result");
                    const errorMsg = document.createElement("h1");
                    errorMsg.className = "error-msg";
                    errorMsg.textContent = "No Hero Found :(";
                    console.log(errorMsg);
                    errorResult.appendChild(errorMsg);
                }
            }
            // for (const hero of data.data.results) {
            //     const resultName = hero.name.toLowerCase();
            //     const obj = { name: resultName };
            //     const hasVal = Object.values(obj).includes(`${searchText}`);
            // }
            // if (hasVal === true) {
            //     showResult(hero);
            // } else {
            //     const errorResult = document.querySelector(".search-result");
            //     const errorMsg = document.createElement("h1");
            //     errorMsg.className = "error-msg";
            //     errorMsg.textContent = "Hero Not Found :(";
            //     console.log(errorMsg);
            //     errorResult.appendChild(errorMsg);
            // }

            // }
            // for (const hero of data.data.results) {
            //     if (hero.name.toLowerCase() === searchText) {
            //         asdf = true;
            //     }
            // }
            // if (asdf === true) {
            //     console.log(hero);
            //     showResult(hero);
            // } else if (asdf === false) {
            //     const errorResult = document.querySelector(".search-result");
            //     const errorMsg = document.createElement("h1");
            //     errorMsg.className = "error-msg";
            //     errorMsg.textContent = "No Hero Found :(";
            //     // const msgCount = document.get
            //     // if(errorMsg < 2)
            //     console.log(errorMsg);
            //     errorResult.appendChild(errorMsg);
            // }
        });

    function showResult(data) {
        const searchResult = document.querySelector(".search-result");

        //------ Create search result area
        const resultBox = document.createElement("div");
        resultBox.className = "result-box";

        //------ Create details container
        const detailContainer = document.createElement("div");
        detailContainer.className = "detail-container";

        //------ Create result hero name
        const resultName = document.createElement("h2");
        resultName.className = "result-hero-name";
        resultName.textContent = `${data.name}`;

        //------ Create result hero description
        const resultDetails = document.createElement("div");
        resultDetails.className = "result-description";
        const heroDesc = document.createElement("p");
        resultDetails.className = "details";
        resultDetails.className = "hero-description";
        const description = document.createTextNode(`${data.description}`);

        //------ Create comic book list
        const comicBookBox = document.createElement("div");
        comicBookBox.className = "comic-book-container";
        const bookList = document.createElement("ul");
        bookList.className = "comic-book-list";
        const bookListTitle = document.createElement("h2");
        bookListTitle.className = "book-list-title";
        bookListTitle.textContent = `${data.name} has been featured in these comic books:`;
        const comicBooks = document.createElement("li");
        for (const books of data.comics.items) {
            comicBooks.textContent = `${books.name}`;
            bookList.appendChild(comicBooks);
        }
        comicBookBox.appendChild(bookListTitle);
        comicBookBox.appendChild(bookList);

        //------ Create result hero link
        const link = document.createElement("a");
        link.className = "result-link";
        link.setAttribute("href", `${data.urls[1].url}`);
        link.textContent = `More information on ${data.name}!`;

        //------ Create result close button
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

        //------ Close search result
        closeBox.addEventListener("click", () => {
            const removeResult = document.querySelector(".result-box");
            removeResult.remove();
        });

        heroDesc.appendChild(description);
        resultDetails.appendChild(heroDesc);

        detailContainer.appendChild(resultName);
        detailContainer.appendChild(resultDetails);
        detailContainer.appendChild(closeBox);
        detailContainer.appendChild(comicBookBox);
        detailContainer.appendChild(link);

        resultBox.appendChild(searchImg);
        resultBox.appendChild(detailContainer);

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
    // heroCard.addEventListener('click', showResult)

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

    heroList.appendChild(heroCard);
}

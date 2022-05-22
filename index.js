document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("#search-form")
	form.addEventListener("submit", searchHero)
})

const urls = [
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=0",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=100",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=200",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=300",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=400",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=500",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=600",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=700",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=800",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=900",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=1000",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=1100",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=1200",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=1300",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=1400",
	"https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=1500",
]
async function getAllUrls(urls) {
	try {
		const data = await Promise.all(urls.map((url) => fetch(url).then((response) => response.json())))
		let newData = []
		for (let i = 0; i < data.length; i++) {
			// console.log(data[i].data.results)
			const herosArray = data[i].data.results
			for (const heros of herosArray) {
				newData.push(heros)
			}
		}
		console.log(newData)
		for (const hero of newData) {
			displayHeroes(hero)
		}
	} catch (error) {
		console.log(error)

		throw error
	}
}
getAllUrls(urls)
// fetch("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=100")
// 	.then((result) => result.json())
// 	.then((data) => {
// 		for (const hero of data.data.results) {
// 			displayHeroes(hero)
// 		}
// 	})

function displayHeroes(hero) {
	const pagination = document.querySelector("#pagination")
	const heroList = document.querySelector("#hero-collection")
	const heroCard = document.createElement("div")
	const heroLink = document.createElement("a")
	heroCard.className = "card"
	heroLink.className = "card-link"
	heroLink.setAttribute("href", `${hero.urls[1].url}`)

	const heroImg = document.createElement("img")
	heroImg.setAttribute("src", `${hero.thumbnail.path}/portrait_fantastic.${hero.thumbnail.extension}`)
	heroImg.className = "heroImg"

	const heroTitle = document.createElement("h2")
	heroTitle.className = "hero-name"
	const heroName = document.createTextNode(`${hero.name}`)

	heroCard.appendChild(heroLink)
	heroTitle.appendChild(heroName)
	heroLink.appendChild(heroImg)
	heroLink.appendChild(heroTitle)

	heroList.appendChild(heroCard)
}

function searchHero(e) {
	e.preventDefault()
	const searchText = e.target.name.value.toLowerCase()

	async function getAllUrls(urls) {
		try {
			const data = await Promise.all(urls.map((url) => fetch(url).then((response) => response.json())))
			let newData = []
			for (let i = 0; i < data.length; i++) {
				// console.log(data[i].data.results)
				const herosArray = data[i].data.results
				for (const heros of herosArray) {
					newData.push(heros)
				}
			}
			for (const hero of newData) {
				if (hero.name.toLowerCase() === searchText) {
					console.log(hero)
					showResult(hero)
				}
			}
		} catch (error) {
			console.log(error)

			throw error
		}
	}
	getAllUrls(urls)

	// fetch("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9f97a17b4e1fd4bf54be654cb96c7dc6&hash=e207a58c1870cacd8130bd66715662a0&limit=100&offset=100")
	// 	.then((result) => result.json())
	// 	.then((data) => {
	// 		for (const hero of data.data.results) {
	// 			if (hero.name.toLowerCase() === searchText) {
	// 				console.log(hero)
	// 				showResult(hero)
	// 			}
	// 		}
	// 	})

	function showResult(data) {
		const searchResult = document.querySelector(".search-result")

		//------ Create search result area
		const resultBox = document.createElement("div")
		resultBox.className = "result-box"

		//------ Create details container
		const detailContainer = document.createElement("div")
		detailContainer.className = "detail-container"

		//------ Create result hero name
		const resultName = document.createElement("h2")
		resultName.className = "result-hero-name"
		resultName.textContent = `${data.name}`

		//------ Create result hero description
		const resultDetails = document.createElement("div")
		resultDetails.className = "result-description"
		const heroDesc = document.createElement("p")
		resultDetails.className = "details"
		resultDetails.className = "hero-description"
		const description = document.createTextNode(`${data.description}`)

		//------ Create comic book list
		const comicBookBox = document.createElement("div")
		comicBookBox.className = "comic-book-container"
		const bookList = document.createElement("ul")
		bookList.className = "comic-book-list"
		const bookListTitle = document.createElement("h2")
		bookListTitle.className = "book-list-title"
		bookListTitle.textContent = `${data.name} has been featured in these comic books:`
		for (const books of data.series.items) {
			const comicBooks = document.createElement("li")
			comicBooks.textContent = `${books.name}`
			bookList.appendChild(comicBooks)
		}
		comicBookBox.appendChild(bookListTitle)
		comicBookBox.appendChild(bookList)

		//------ Create result hero link
		const link = document.createElement("a")
		link.className = "result-link"
		link.setAttribute("href", `${data.urls[1].url}`)
		link.textContent = `More information on ${data.name}!`

		//------ Create result close button
		const closeBox = document.createElement("span", "button")
		closeBox.setAttribute("type", "button")
		closeBox.className = "close-btn"
		closeBox.textContent = "x"

		//------ Fetch and create search result image
		const searchImg = document.createElement("img")
		searchImg.className = "search-image"
		const searchName = searchText.toLowerCase()
		if (searchName === data.name.toLowerCase()) {
			searchImg.setAttribute("src", `${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`)
			searchImg.className = "search-image"
		}

		//------ Close search result
		closeBox.addEventListener("click", () => {
			const removeResult = document.querySelector(".result-box")
			removeResult.remove()
		})

		heroDesc.appendChild(description)
		resultDetails.appendChild(heroDesc)

		detailContainer.appendChild(resultName)
		detailContainer.appendChild(resultDetails)
		detailContainer.appendChild(closeBox)
		detailContainer.appendChild(comicBookBox)
		detailContainer.appendChild(link)

		resultBox.appendChild(searchImg)
		resultBox.appendChild(detailContainer)

		searchResult.appendChild(resultBox)

		const form = document.querySelector("#search-form")
		form.reset()
	}
	const removeResult = document.querySelector(".result-box")
	removeResult.remove()
}

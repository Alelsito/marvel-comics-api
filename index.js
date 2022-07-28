// FETCH
// import fetch from "node-fetch";

// SELECTORs
const reload = document.querySelector("#reload");
const containerCards = document.querySelector("#containerCards");
const form = document.querySelector("#searcher");
const characterInformation = document.querySelector("#characterInformation");
const containerCharacter = document.querySelector(".container-character");
const containerSeriesComicsCards = document.querySelector(".container-series-comics-cards");
const comicsTitle = document.querySelector("#comicsTitle");
const comicsCards = document.querySelector("#comics");
const seriesTitle = document.querySelector("#seriesTitle");
const seriesCards = document.querySelector("#series");

// RELOAD
reload.addEventListener("click", () => {
  location.reload();
});

// API DATA FOR RENDER CARDS
const marvelData = {
  render: () => {
    const marvelAPI =
      "http://gateway.marvel.com/v1/public/characters?ts=2022&apikey=4af096836a1b7a7c3b2658feeec3ae3a&hash=0725b34b13436807e63352ce699e265f";

    fetch(marvelAPI)
      .then((respuesta) => respuesta.json())
      .then((data) => renderCards(data.data.results));
  },
};

marvelData.render();

// RENDER CARDS
const renderCards = (characters) => {
  containerCards.innerHTML = "";
  if (characters.size !== 0) {
    characters.forEach((character) => {
      let card = document.createElement("div");
      let titleCard = document.createElement("div");
      let title = document.createElement("span");
      let idCard = document.createElement("div");
      let id = document.createElement("span");
      let img = document.createElement("img");
      let imgDegradado = document.createElement("div");
      let bar = document.createElement("div");
      let emptybar = document.createElement("div");
      let filledbar = document.createElement("div");

      card.classList.add("col-2", "card", "mb-3");
      card.setAttribute("id", character.id);
      titleCard.classList.add("title-card");
      title.classList.add("title");
      title.innerText = character.name;
      idCard.classList.add("id-card");
      id.classList.add("id");
      id.innerText = character.id;
      img.classList.add("image");
      img.setAttribute(
        "src",
        `${character.thumbnail.path}.${character.thumbnail.extension}`
      );
      img.setAttribute("alt", character.name);
      imgDegradado.classList.add("image-degradado");
      bar.classList.add("bar");
      emptybar.classList.add("emptybar");
      filledbar.classList.add("filledbar");

      card.appendChild(titleCard);
      titleCard.appendChild(title);
      card.appendChild(idCard);
      idCard.appendChild(id);
      card.appendChild(img);
      card.appendChild(imgDegradado);
      card.appendChild(bar);
      bar.appendChild(emptybar);
      bar.appendChild(filledbar);
      containerCards.appendChild(card);

      // EventListener for each card
      card.addEventListener("click", (e) => {
        eventListenerSearch(e.currentTarget.id);
      });
    });
  } else {
    containerCards.innerHTML += `
    <div class="col-8 error">
      <span class="fs-1 d-flex justify-content-center">404</span> <br>
      <span class="fs-4 d-flex justify-content-center">Ooops, character not found</span>
    </div>`;
  }
};

// ------------

// EVENT LISTENER SEARCH
const eventListenerSearch = (e) => {
  const marvelAPI = `http://gateway.marvel.com/v1/public/characters/${e}?ts=2022&apikey=4af096836a1b7a7c3b2658feeec3ae3a&hash=0725b34b13436807e63352ce699e265f`;
  const marvelComicsAPI = `http://gateway.marvel.com/v1/public/characters/${e}/comics?ts=2022&apikey=4af096836a1b7a7c3b2658feeec3ae3a&hash=0725b34b13436807e63352ce699e265f`;
  const marvelSeriesAPI = `http://gateway.marvel.com/v1/public/characters/${e}/series?ts=2022&apikey=4af096836a1b7a7c3b2658feeec3ae3a&hash=0725b34b13436807e63352ce699e265f`;

  fetch(marvelAPI)
    .then((respuesta) => respuesta.json())
    .then((data) => renderCharacterInformation(data.data.results[0]));

  fetch(marvelComicsAPI)
    .then((respuesta) => respuesta.json())
    .then((data) => renderCharacterComics(data.data.results));

  fetch(marvelSeriesAPI)
    .then((respuesta) => respuesta.json())
    .then((data) => renderCharacterSeries(data.data.results));

};

// -Render Character Information
const renderCharacterInformation = (character) => {
  containerCharacter.classList.add("container-visibility");
  containerCards.innerHTML = "";

  characterInformation.innerHTML += `            
  <div class="col d-flex justify-content-end">
    <img class="specific-character-image"
      src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="name">
  </div>
  <div class="col column-main">
    <div class="col-6">
      <span class="fs-1 specific-character-title">${character.name}</span>
    </div>
    <div class="col-5">
      <span class="specific-character-description">${character.description}</span>
    </div>
  </div>`;
};

// -Render Character Comics
const renderCharacterComics = (character) => {
  comicsTitle.innerHTML += `
  <div class="col-12 principal d-flex justify-content-center">
    <span class="fs-3 principal-title">COMICS</span>
  </div>
  <div class="col-12 division">
  </div>`;

  character.forEach((comic) => {
    comicsCards.innerHTML += `
    <div class="col-2 cards">
      <img class="cards-image" src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="">
      <span class="cards-title">${comic.title}</span>
    </div>`;
  });
};

// -Render Character Series
const renderCharacterSeries = (character) => {
  seriesTitle.innerHTML += `
  <div class="col-12 principal d-flex justify-content-center">
    <span class="fs-3 principal-title">SERIES</span>
  </div>
  <div class="col-12 division">
  </div>`;

  character.forEach((serie) => {
    seriesCards.innerHTML += `
    <div class="col-2 cards">
      <img class="cards-image" src="${serie.thumbnail.path}.${serie.thumbnail.extension}" alt="">
      <span class="cards-title">${serie.title}</span>
    </div>`;
  });
};


// ------------------------------------

// SEARCHER
// -EventListener
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  search(evt.target.character.value);
});

// -Event Listener Searcher
const search = (characterSearch) => {
  const marvelAPI =
    "http://gateway.marvel.com/v1/public/characters?ts=2022&apikey=4af096836a1b7a7c3b2658feeec3ae3a&hash=0725b34b13436807e63352ce699e265f";

  fetch(marvelAPI)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      let characterName = filterByName(data, characterSearch);
      let characterId = filterById(data, characterSearch);

      let unique = new Set([...characterName, ...characterId]);
      renderCards(unique);
      console.log(unique);
    });
};

// -Filter by name
const filterByName = (data, characterSearch) => {
  let array = data.data.results;
  let name = array.filter((character) => {
    return character.name.toLowerCase().includes(characterSearch.toLowerCase());
  });
  return name;
};

// -Filter by id
const filterById = (data, characterSearch) => {
  let array = data.data.results;
  let id = array.filter((character) => {
    let id = String(character.id);
    return id.includes(characterSearch);
  });
  return id;
};

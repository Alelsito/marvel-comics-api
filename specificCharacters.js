// SELECTORs
const searcherAll = document.querySelector("#searcherAll");
const characterInformation = document.querySelector("#characterInformation");
const containerCharacter = document.querySelector(".container-character");
const comicsTitle = document.querySelector("#comicsTitle");
const comicsCards = document.querySelector("#comics");
const seriesTitle = document.querySelector("#seriesTitle");
const seriesCards = document.querySelector("#series");

// EVENT LISTENER SEARCH
const eventListenerSearch = (e) => {
  containerSeriesComicsCards.classList.remove("display");
  searcherAll.classList.add("visibility");

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

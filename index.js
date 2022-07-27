// FETCH
// import fetch from "node-fetch";

// SELECTORs
const containerCards = document.querySelector("#containerCards");

const marvelData = {
  render: () => {
    const marvelAPI =
      "http://gateway.marvel.com/v1/public/characters?ts=2022&apikey=4af096836a1b7a7c3b2658feeec3ae3a&hash=0725b34b13436807e63352ce699e265f";

    fetch(marvelAPI)
      .then((respuesta) => respuesta.json())
      .then((data) => renderCards(data));
  },
};

marvelData.render();

const renderCards = (characters) => {
    // console.log(characters);
    characters.data.results.forEach((character) => {
        console.log(character);
        containerCards.innerHTML +=
        `<div class="col-2 card mb-3">
            <div class="title-card">
                <span class="title">${character.name}</span>
            </div>
            <img class="image" src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <div class="image-degradado"></div>
            <div class="bar">
                <div class="emptybar"></div>
                <div class="filledbar"></div>
            </div>
        </div>` 
    })
}
// FETCH
// import fetch from "node-fetch";

// SELECTORs
const containerCards = document.querySelector("#containerCards");
const form = document.querySelector("#searcher");

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

const renderCards = (characters) => {
  containerCards.innerHTML = "";
  if (characters.size !== 0) {
    characters.forEach((character) => {
      containerCards.innerHTML += `<div class="col-2 card mb-3">
              <div class="title-card">
                  <span class="title">${character.name}</span>
              </div>
              <img class="image" src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
              <div class="image-degradado"></div>
              <div class="bar">
                  <div class="emptybar"></div>
                  <div class="filledbar"></div>
              </div>
          </div>`;
    });
} else {
      console.log("No hay resulados")
  }
};

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  search(evt.target.character.value);
});

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
      console.log(unique)
    });
};

const filterByName = (data, characterSearch) => {
    let array = data.data.results;
    let name = array.filter((character) => {
        return character.name.toLowerCase().includes(characterSearch.toLowerCase());
    })
    return name;
};

const filterById = (data, characterSearch) => {
    let array = data.data.results;
    let name = array.filter((character) => {
        let id = String(character.id);
        return id.includes(characterSearch);
    })
    return name;
};

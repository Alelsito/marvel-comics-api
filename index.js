// FETCH
// import fetch from "node-fetch";

// SELECTORs
const containerCards = document.querySelector("#containerCards");
const form = document.querySelector("#searcher");

// API DATA FOR RENDER
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
  // containerCards.innerHTML = "";
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

// EVENT LISTENER SEARCH

const eventListenerSearch = (e) => {
  console.log(e);
  const marvelComicsAPI =
    `http://gateway.marvel.com/v1/public/characters/${e}/comics?ts=2022&apikey=4af096836a1b7a7c3b2658feeec3ae3a&hash=0725b34b13436807e63352ce699e265f`;

  const marvelSeriesAPI =
    `http://gateway.marvel.com/v1/public/characters/${e}/series?ts=2022&apikey=4af096836a1b7a7c3b2658feeec3ae3a&hash=0725b34b13436807e63352ce699e265f`;

  fetch(marvelComicsAPI)
    .then((respuesta) => respuesta.json())
    .then((data) => console.log(data))

  fetch(marvelSeriesAPI)
    .then((respuesta) => respuesta.json())
    .then((data) => console.log(data))


};

const renderCharacerInformation = (character) => {
  console.log(character)
  containerCards.innerHTML = "";
}

// SEARCH
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

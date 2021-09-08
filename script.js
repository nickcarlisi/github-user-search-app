const btn = document.body.querySelector(".btn");
const mode = document.body.querySelector(".mode");
const modeText = document.body.querySelector(".mode-text");
const modeImage = document.body.querySelector(".mode-img");
const noResultError = document.body.querySelector(".no-result-error");
let searchResult = document.body.querySelector(".input");

const getUser = async function (searchResult) {
  const res = await fetch(`https://api.github.com/users/${searchResult}`);

  if (!res.ok) {
    const message = `An error has returned: ${res.status}`;
    showError();
    throw new Error(message);
  } else {
    removeError();
    const json = await res.json();
    return json;
  }
};

const showError = function () {
  noResultError.textContent = "No result";
};

const removeError = function () {
  noResultError.textContent = "";
};

const createCard = (data) => {
  const card = document.body.querySelector(".card");
  card.innerHTML = "";

  const date = data.created_at.slice(0, 10);
  const year = date.slice(0, 4);
  const day = date.slice(8, 10);
  const month = date.slice(5, 7);

  const markUp = `
      <div class="card-header">
        <img class="placeholder-img" src="${
          data.avatar_url
        }" alt="placeholder image" />
        <h1 class="header-name">${data.name}</h1>
        <p class="username-At">@${data.login}</p>
        <p class="joined">Joined ${day} ${month} ${year}</p>
        <div class="bio">
        ${data.bio ? data.bio : "This profile has no bio"}
      </div>
      </div>
      
      <div class="repos-card">
        <div class="repos">
          <p>Repos</p>
          <p class="numbers">${data.public_repos}</p>
        </div>
        <div class="followers">
          <p>Followers</p>
          <p class="numbers">${data.followers}</p>
        </div>
        <div class="following">
          <p>Following</p>
          <p class="numbers">${data.following}</p>
        </div>
      </div>
      <div class="info-and-icons">
        <div class="col col-1">
          <div>
            <img class="icon location-icon" src="./assets/icon-location.svg">
            <p class="location">${
              data.location ? data.location : "Not Available"
            }</p>
          </div>
          <div>
            <img class="icon website-icon" src="./assets/icon-website.svg">
            <p class="website">${data.blog ? data.blog : "Not Available"}</p>
          </div>
        </div>
        <div class="col col-2">
          <div>
            <img class="icon twitter-icon" src="./assets/icon-twitter.svg">
            <p class="twitter">${
              data.twitter_username ? data.twitter_username : "Not Available"
            }</p>
          </div>
          <div>
            <img class="icon company-icon" src="./assets/icon-company.svg">
            <p class="company">${
              data.company ? data.company : "Not Available"
            }</p>
          </div>
      </div>
    </div> 
  `;

  card.insertAdjacentHTML("afterbegin", markUp);
};

const displayCard = async function (searchResult) {
  const res = await getUser(searchResult);
  createCard(res);
};

mode.addEventListener("click", () => {
  console.log("Clicked mode button");
  if (modeText.innerText === "LIGHT") {
    modeText.innerText = "DARK";
    modeImage.src = "./assets/icon-moon.svg";
  } else {
    modeText.innerText = "LIGHT";
    modeImage.src = "./assets/icon-sun.svg";
  }

  document.body.classList.toggle("dark");
});

//
btn.addEventListener("click", (event) => {
  event.preventDefault();

  if (!searchResult.value) {
    showError();
  } else {
    displayCard(searchResult.value);
  }

  searchResult.value = "";
});

// load initial user
displayCard("octocat");

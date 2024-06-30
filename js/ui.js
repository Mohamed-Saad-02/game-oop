const spinner = document.getElementById("spinner");
const detailsSection = document.querySelector("section.details");
const detailsContent = document.getElementById("detailsContent");

let currentDisplay = 20;
let currentDisplayData = [];

let showBtn = true;

export class Ui {
  resetCurrentDisplay() {
    currentDisplay = 20;
  }

  displayGames(data) {
    const gamesContent = document.getElementById("gamesContent");
    gamesContent.innerHTML = "";

    currentDisplayData = structuredClone(data);

    for (
      let i = 0;
      currentDisplayData.length > 20
        ? i < currentDisplay
        : i < currentDisplayData.length;
      i++
    ) {
      const div = document.createElement("div");
      div.className = "col-md-6 col-lg-4 col-xl-3 col-12";

      const {
        id,
        title,
        genre,
        short_description,
        thumbnail: imageCover,
        platform,
      } = currentDisplayData[i];
      div.innerHTML = `
          <div class="card bg-transparent text-white h-100" role="button" data-id="${id}">
              <div class="image px-3 pt-3">
                <img
                  src="${imageCover}"
                  class="card-img-top rounded-top-3 d-block"
                  alt="${title}, ${short_description}"
                  loading="lazy"
                />
                <video src="https://www.freetogame.com/g/${id}/videoplayback.webm" class="w-100 d-none rounded-top-3" loop muted>
                    Your browser does not support the video tag.
                </video>
              </div>
              <div class="card-body px-3 pt-3">
                <div
                  class="card-title m-0 d-flex align-items-center justify-content-between"
                >
                  <h5>${title}</h5>
                  <span class="badge text-bg-primary py-2">Free</span>
                </div>
                <p class="text-center description m-0 opacity-50">
                  ${short_description.split(" ", 8)}
                </p>
              </div>
              <div
                class="card-footer d-flex align-items-center justify-content-between"
              >
                <div class="badge p-1">${genre}</div>
                <div class="badge p-1">${platform}</div>
              </div>
            </div>
      `;

      gamesContent.appendChild(div);
    }
    const cards = document.querySelectorAll(".card");

    cards.forEach((el) => this.showVideoHover(el));

    spinner.classList.contains("active") && spinner.classList.remove("active");
  }

  displayDetails(data) {
    const {
      id,
      title,
      genre,
      game_url,
      thumbnail: imageCover,
      statue,
      description,
      publisher,
      platform,
      screenshots,
    } = data;

    detailsContent.innerHTML = `
      <div class="row box-detail-content mt-5 flex-grow-1">
              <div class="col-lg-4 mb-4 image" style="height: fit-content";>
                <img
                  src="${imageCover}"
                  alt="${title}"
                  class="img-fluid rounded-1 d-block"
                  loading="lazy"
                />
                <video src="https://www.freetogame.com/g/${id}/videoplayback.webm" class="d-none rounded-top-3" loop muted>
                    Your browser does not support the video tag.
                </video>
              </div>
              <div class="col-lg-8 info">
                <ul class="m-0 list-unstyled list-statue">
                  <li class="fs-3 mb-2 d-flex align-items-center justify-content-between w-100">
                  <div>Title: <span>${title}</span></div>
                  <div>Publisher: <span>${publisher}</span></div>
                  </li>
                  <li class="mb-3">
                    Category: <span class="badge text-bg-info">${genre}</span>
                  </li>
                  <li class="mb-3">
                    Platform: <span class="badge text-bg-info">${platform}</span>
                  </li>
                  <li class="mb-3">
                    Status: <span class="badge text-bg-info">${statue}</span>
                  </li>
                </ul>
                <p title="${description}">${description}</p>
                <button class="btn btn-outline-warning d-block mx-auto">
                  <a href="${game_url}" target="_blank" class="text-decoration-none text-white">Show Game</a>
                </button>
              </div>
            </div>
            <ul
              class="list-unstyled mb-4 d-flex align-items-center justify-content-center mt-4 gap-4"
              id="imageStore"
            >
            </ul>
    `;

    for (const [index, image] of screenshots.entries()) {
      if (index > 2) break;
      const li = document.createElement("li");
      li.innerHTML = `
         <img
          src="${image.image}"
          alt="${title}"
          class="img-fluid rounded"
          />
      `;

      document.getElementById("imageStore").appendChild(li);
    }

    const imageDetail = document.querySelector(".box-detail-content .image");

    this.showVideoHover(imageDetail);

    detailsSection.classList.add("active");
    spinner.classList.remove("active");
  }

  showMoreData() {
    if (showBtn) {
      const showMoreBtn = document.createElement("button");
      showMoreBtn.className = "show-more btn btn-primary d-flex mx-auto mt-4";
      showMoreBtn.textContent = "Show more";

      document
        .querySelector(".games-cards .container")
        .appendChild(showMoreBtn);

      showMoreBtn.addEventListener("click", () => {
        if (currentDisplayData.length <= currentDisplay) {
          document.querySelector(".show-more").classList.add("d-none");
          return;
        } else {
          this.check();
          this.displayGames(currentDisplayData);
        }
      });

      showBtn = false;
    }

    if (currentDisplayData.length < currentDisplay) {
      document
        .querySelector(".show-more")
        ?.classList.replace("d-flex", "d-none");

      return;
    } else
      document
        .querySelector(".show-more")
        ?.classList.replace("d-none", "d-flex");
  }

  showVideoHover(element) {
    const img = element.querySelector(".image img");
    const video = element.querySelector(".image video");

    element.addEventListener("mouseenter", () => {
      video.style.height = `${img.getBoundingClientRect().height}px`;
      video.style.width = `${img.getBoundingClientRect().width}px`;

      img.classList.replace("d-block", "d-none");
      video.classList.replace("d-none", "d-block");

      video.setAttribute("preload", "auto");
      video.play();
    });

    element.addEventListener("mouseleave", () => {
      img.classList.replace("d-none", "d-block");
      video.classList.replace("d-block", "d-none");
      video.pause();
    });
  }

  check() {
    if (currentDisplayData.length > currentDisplay) {
      let num = currentDisplay - currentDisplayData.length;

      console.log(currentDisplay);
      console.log(num);

      if (num <= -20) {
        currentDisplay += 20;
      } else {
        currentDisplay = currentDisplayData.length;
      }
    } else {
      currentDisplay = currentDisplayData.length;
    }
  }
}

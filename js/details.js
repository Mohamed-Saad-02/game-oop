import { Ui } from "./ui.js";

const closeIcon = document.querySelector(".details .operation .close");
const detailsSection = document.querySelector(".details");
const spinner = document.getElementById("spinner");

export class Details {
  constructor(id) {
    this.ui = new Ui();
    this.getDetail(id);
    this.handleCloseDetailContent();
  }

  async getDetail(gameId) {
    spinner.classList.add("active");

    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f55f09d026msh6ffda4fa9a55876p1d5864jsn60896e9d759b",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    this.ui.displayDetails(data);
  }

  handleCloseDetailContent() {
    closeIcon.addEventListener("click", () =>
      detailsSection.classList.remove("active")
    );
  }
}

import { Details } from "./details.js";
import { Ui } from "./ui.js";

export class Games {
  constructor() {
    this.getGames("mmorpg");
    this.ui = new Ui();

    // Link Category
    document.querySelectorAll("nav ul li").forEach((el) => {
      el.addEventListener("click", async (e) => {
        document.querySelector("nav ul .active").classList.remove("active");
        e.target.classList.add("active");
        this.ui.resetCurrentDisplay();
        await this.getGames(e.target.dataset.category);
        this.ui.showMoreData();
      });
    });
  }

  async getGames(category) {
    document.getElementById("spinner").classList.add("active");

    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f55f09d026msh6ffda4fa9a55876p1d5864jsn60896e9d759b",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    this.ui.displayGames(data);
    this.ui.showMoreData();
    this.showDetails();
  }

  showDetails() {
    document
      .querySelectorAll(".card")
      .forEach((el) =>
        el.addEventListener("click", () => new Details(el.dataset.id))
      );
  }
}

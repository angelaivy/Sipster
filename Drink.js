export class Drink {
  constructor(name, thumb, container) {
    this.name = name;
    this.thumb = thumb;
    this.container = container;
  }

  generateDrink() {
    const detailShort = `
      <li class="detailShort">
        <a href="details.html">
          <h3>${this.name}</h3>
          <img src="${this.thumb}/small" alt=""/>
        </a>
      </li>
    `
    this.container.insertAdjacentHTML('afterbegin', detailShort);
  }
}
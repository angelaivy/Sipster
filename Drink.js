export class Drink {
  constructor(name, thumb, container) {
    this.name = name;
    this.thumb = thumb;
    this.container = container;
  }

  generateDrink() {
    const detailShort = `
      <div class="detailShort">
        <a href="">
          <h3>${this.name}</h3>
          <img src="${this.thumb}/small" alt=""/>
        </a>
      </div>
    `
    
    this.container.insertAdjacentHTML('afterbegin', detailShort);
  }
}
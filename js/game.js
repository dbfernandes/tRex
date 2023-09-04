(function () {

  const FPS = 300;
  const HEIGHT = 300;
  const WIDTH = 1024;
  const PROB_NUVEM = 1;

  let gameLoop;
  let deserto;
  let dino;
  let nuvens = [];
  let frame = 0;

  function init() {
    gameLoop = setInterval(run, 1000 / FPS)
    deserto = new Deserto();
    dino = new Dino();
  }

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      if (dino.status === 0) dino.status = 1;
    }
  })

  class Deserto {
    constructor() {
      this.element = document.createElement("div")
      this.element.className = "deserto";
      this.element.style.width = `${WIDTH}px`;
      this.element.style.height = `${HEIGHT}px`;
      document.getElementById("game").appendChild(this.element)

      this.chao = document.createElement("div")
      this.chao.className = "chao"
      this.chao.style.backgroundPositionX = 0;
      this.element.appendChild(this.chao)
    }
    mover() {
      this.chao.style.backgroundPositionX = `${parseInt(this.chao.style.backgroundPositionX) - 1}px`
    }
  }

  class Dino {
    #status
    constructor() {
      this.backgroundPositionsX = {
        correndo1: "-1391px",
        correndo2: "-1457px",
        pulando: "-1259px"
      }
      this.#status = 0; // 0-correndo, 1-subindo, 2-descendo
      this.altumaMinima = 2;
      this.altumaMaxima = 100;
      this.element = document.createElement("div")
      this.element.className = "dino";
      this.element.style.backgroundPositionX = this.backgroundPositionsX.correndo1;
      this.element.style.backgroundPositionY = "-2px";
      this.element.style.bottom = `${this.altumaMinima}px`
      deserto.element.appendChild(this.element)
    }
    /**
     * @param {number} value
     */
    set status(value) {
      if (value >= 0 && value <= 2) this.#status = value;
    }
    get status() {
      return this.#status;
    }
    correr() {
      if (this.#status === 0 && frame % 20 === 0) this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.backgroundPositionsX.correndo1 ? this.backgroundPositionsX.correndo2 : this.backgroundPositionsX.correndo1;
      else if (this.#status === 1) {
        this.element.style.backgroundPositionX = this.backgroundPositionsX.pulando;
        this.element.style.bottom = `${parseInt(this.element.style.bottom) + 1}px`;
        if (parseInt(this.element.style.bottom) >= this.altumaMaxima) this.status = 2;
      }
      else if (this.#status === 2) {
        this.element.style.bottom = `${parseInt(this.element.style.bottom) - 1}px`;
        if (parseInt(this.element.style.bottom) <= this.altumaMinima) this.status = 0;
      }
    }
  }

  class Nuvem {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "nuvem";
      this.element.style.right = 0;
      this.element.style.top = `${parseInt(Math.random() * 200)}px`
      deserto.element.appendChild(this.element);
    }
    mover() {
      this.element.style.right = `${parseInt(this.element.style.right) + 1}px`;
    }
  }

  function run() {
    frame = frame + 1
    if (frame === FPS) frame = 0;
    deserto.mover()
    dino.correr()
    if (Math.random() * 100 <= PROB_NUVEM) nuvens.push(new Nuvem());
    if (frame % 2 === 0) nuvens.forEach(nuvem => nuvem.mover());
  }

  init()

})()
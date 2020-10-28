import { createState, produce } from 'solid-js';

export default class AppState {
  constructor(initState = {}) {
    const initStateDefault = { day: 0, bases: [{ active: true }], food: 3000, foodMaxInit: 3000, wood: 0, woodMaxInit: 1500, stone: 0 };
    this.stateInit = { ...initStateDefault, ...initState };
    const [state, setState] = createState(localStorage && localStorage.app ? JSON.parse(localStorage.app) : { ...this.stateInit });
    this.state = state;
    this.setState = setState;

    this.baseStates = [new BaseState(this, 'base0', { loggerMax: 30, quarrierMax: 30 })];
  }

  effect() {
    localStorage.app = JSON.stringify(this.state);
    this.baseStates.forEach((baseState) => baseState.effect());
  }

  reset() {
    this.setState(this.stateInit);
    this.baseStates.forEach((baseState) => baseState.reset());
  }

  day() {
    return this.state.day;
  }

  bases() {
    return this.state.bases;
  }

  baseState(index) {
    return this.baseStates[index];
  }

  food() {
    return this.state.food;
  }

  foodMax() {
    return this.state.foodMaxInit;
  }

  farmer() {
    return this.baseStates.map((baseState) => baseState.farmer()).reduce((sum, current) => sum + current, 0);
  }

  foodRate() {
    return this.farmer() * 4;
  }

  population() {
    return this.baseStates.map((baseState) => baseState.population()).reduce((sum, current) => sum + current, 0);
  }

  eatRate() {
    return this.population();
  }

  wood() {
    return this.state.wood;
  }

  woodMax() {
    return this.state.woodMaxInit;
  }

  logger() {
    return this.baseStates.map((baseState) => baseState.logger()).reduce((sum, current) => sum + current, 0);
  }

  woodRate() {
    return this.logger() * 5;
  }

  stone() {
    return this.state.stone;
  }

  stoneMax() {
    return this.woodMax();
  }

  quarrier() {
    return this.baseStates.map((baseState) => baseState.quarrier()).reduce((sum, current) => sum + current, 0);
  }

  stoneRate() {
    return this.quarrier() * 3;
  }

  endDay() {
    const bound = (min, max, value) => Math.max(min, Math.min(max, value));
    this.setState({
      day: this.day() + 1,
      food: bound(0, this.foodMax(), this.food() + this.foodRate() - this.population()),
      wood: bound(0, this.woodMax(), this.wood() + this.woodRate()),
      stone: bound(0, this.stoneMax(), this.stone() + this.stoneRate()),
    });
    this.baseStates.forEach((baseState) => baseState.endDay());
  }
}

class BaseState {
  constructor(app, id, initState = {}) {
    this.app = app;
    this.id = id;
    const initStateDefault = { house: 1, worker: 1, logger: 0, farm: 0, farmer: 0, quarrier: 0 };
    this.stateInit = { ...initStateDefault, ...initState };
    const [state, setState] = createState(localStorage && localStorage[id] ? JSON.parse(localStorage[id]) : { ...this.stateInit });
    this.state = state;
    this.setState = setState;
  }

  effect() {
    localStorage[this.id] = JSON.stringify(this.state);
  }

  reset() {
    this.setState(this.stateInit);
  }

  house() {
    return this.state.house;
  }

  populationMax() {
    return this.house() * 2;
  }

  worker() {
    return this.state.worker;
  }

  population() {
    return this.worker() + this.farmer() + this.logger() + this.quarrier();
  }

  loggerMax() {
    return this.state.loggerMax;
  }

  logger() {
    return this.state.logger;
  }

  farm() {
    return this.state.farm;
  }

  farmerMax() {
    return this.farm() * 2;
  }

  farmer() {
    return this.state.farmer;
  }

  quarrierMax() {
    return this.state.quarrierMax;
  }

  quarrier() {
    return this.state.quarrier;
  }

  /**
   * Assigns a free worker to a specific type.
   *
   * @param {string} job The type of worker.
   * @returns {boolean} Whether the assign command was successful.
   */
  assign(job) {
    const jobSignal = this[job].bind(this);
    const maxKey = `${job}Max`;
    const maxSignal = this[maxKey].bind(this);
    if (this.worker() > 0 && jobSignal() < maxSignal()) {
      this.setState({
        worker: this.worker() - 1,
        [job]: jobSignal() + 1,
      });
      return true;
    }
    return false;
  }

  /**
   * Unassigns a worker of a specific type.
   *
   * @param {string} job The type of worker.
   * @returns {boolean} Whether the unassign command was successful.
   */
  unassign(job) {
    const jobSignal = this[job].bind(this);
    if (jobSignal() > 0) {
      this.setState({
        worker: this.worker() + 1,
        [job]: jobSignal() - 1,
      });
      return true;
    }
    return false;
  }

  /**
   * Calculates cost for the next building of a specific type.
   *
   * @param {string} building The type of building.
   * @returns {{wood?: number, stone?: number}} The map of `{material: cost}`.
   */
  buildCost(building) {
    let price = {};
    if (building === 'farm') {
      // TODO: build time 20 days
      price = {
        wood: [200, 300, 450, 650, 1000],
      };
    }
    if (building === 'house') {
      // TODO: build time 20 days
      price = {
        wood: [100, 100, 150, 150, 200, 250],
        stone: [100, 100, 150, 150, 200, 250],
      };
    }

    return Object.keys(price)
      .map((material) => {
        let existingBuildings = this[building]();
        let thisPrice = price[material][price[material].length - 1];
        if (existingBuildings < price[material].length) {
          thisPrice = price[material][existingBuildings];
        }
        return [material, thisPrice];
      })
      .reduce((result, [material, price]) => ((result[material] = price), result), {});
  }

  /**
   * Verifies that there are sufficient resources to for the next building of a specific type.
   *
   * @param {string} building The type of building.
   * @returns {?{wood?: number, stone?: number}} The map of `{material: deductedValue}` that will be overwritten to be new state, or null if insufficient resources.
   */
  buildValid(building) {
    let price = this.buildCost(building);

    let costs = {};
    const sufficient = Object.keys(price).every((material) => {
      if (this.app[material]() >= price[material]) {
        costs[material] = this.app[material]() - price[material];
        return true;
      }
      return false;
    });

    return sufficient ? costs : null;
  }

  /**
   * Builds the next building of a specific type.
   *
   * @param {string} building The type of building.
   * @returns {boolean} Whether the build command was successful.
   */
  build(building) {
    let costs = this.buildValid(building);
    if (costs) {
      this.app.setState(costs);
      this.setState({ [building]: this[building]() + 1 });
      return true;
    }
    return false;
  }

  endDay() {
    this.setState(
      produce((state) => {
        state.worker = this.worker() + +(this.population() < this.populationMax() && this.app.food() > 0);
      }),
    );
  }
}

import { createState, produce } from 'solid-js';

export default class AppState {
  constructor(initState = {}) {
    const initStateDefault = { bases: [{ active: true }], food: 500, wood: 0 };
    const [state, setState] = createState({ ...initStateDefault, ...initState });
    this.state = state;
    this.setState = setState;

    this.baseStates = [new BaseState({ loggerMax: 30 })];
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

  population() {
    return this.baseStates.map((baseState) => baseState.population()).reduce((sum, current) => sum + current, 0);
  }

  wood() {
    return this.state.wood;
  }

  logger() {
    return this.baseStates.map((baseState) => baseState.logger()).reduce((sum, current) => sum + current, 0);
  }

  endDay() {
    this.setState(
      produce((state) => {
        state.food = this.food() - this.population();
        state.wood = this.wood() + this.logger() * 5;
      }),
    );
    this.baseStates.forEach((baseState) => baseState.endDay());
  }
}

class BaseState {
  constructor(initState = {}) {
    const initStateDefault = { house: 1, worker: 1, logger: 0, farm: 0 };
    const [state, setState] = createState({ ...initStateDefault, ...initState });
    this.state = state;
    this.setState = setState;
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
    return this.worker();
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

  assign(job) {
    if (job === 'logger') {
      if (this.worker() > 0 && this.logger() < this.loggerMax()) {
        this.setState({
          worker: this.worker() - 1,
          logger: this.logger() + 1,
        });
      }
    }
  }

  endDay() {
    this.setState(
      produce((state) => {
        state.worker = this.worker() + +(this.population() < this.populationMax());
      }),
    );
  }
}

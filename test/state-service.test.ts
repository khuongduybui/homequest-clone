import { worker } from 'cluster';
import { Base, Factor, StateService } from '../src/state-service';

describe('game', () => {
  let state: StateService;

  beforeEach(() => {
    state = new StateService();
  });

  test('starts at day 0', () => {
    expect(state.day).toEqual(0);
  });

  test('increases day each turn', () => {
    state.turn();
    expect(state.day).toEqual(1);
  });

  test('resets day to 0 on demand', () => {
    state.turn();
    state.reset();
    expect(state.day).toEqual(0);
  });

  test('starts with base 0', () => {
    expect(state.bases[0].enabled).toBeTruthy();
  });

  test('computes population from bases population', () => {
    expect(state.population).toBeTruthy();
  });

  test('starts with 3000 food', () => {
    expect(state.food).toEqual(3000);
  });

  test('starts with 3000 foodMax', () => {
    expect(state.foodMax).toEqual(3000);
  });

  test('computes foodConsume from population', () => {
    expect(state.foodConsume).toEqual(state.population * Factor.foodConsumeFromPopulation);
  });

  test('updates food every turn', () => {
    const food = state.food;
    const delta = state.delta('food');
    state.turn();
    expect(state.food).toEqual(food + delta);
  });

  test('starts with 0 wood', () => {
    expect(state.wood).toEqual(0);
  });

  test('produces wood from logger', () => {
    expect(state.woodProduce).toEqual(state.logger * Factor.woodProduceFromLogger);
  });

  test('updates wood every turn', () => {
    const wood = state.wood;
    state.base[0].assign('logger');
    const delta = state.delta('wood');
    state.turn();
    expect(state.wood).toEqual(wood + delta);
  });
});

describe('base 0', () => {
  let base: Base;

  beforeEach(() => {
    base = new StateService().bases[0];
  });

  test('starts with 1 house', () => {
    expect(base.house).toEqual(1);
  });

  test('starts with 1 population', () => {
    expect(base.population).toEqual(1);
  });

  test('computes populationMax from house', () => {
    expect(base.populationMax).toEqual(base.house * Factor.populationMaxFromHouse);
  });

  test('increases population every day until full', () => {
    while (base.population < base.populationMax) {
      const population = base.population;
      base.turn();
      expect(base.population).toBeGreaterThan(population);
    }
  });

  test('predicts population full when population < populationMax', () => {
    expect(base.populationFull).toBeTruthy();
  });

  test('does not predicts worker full when population = populationMax', () => {
    while (base.population < base.populationMax) base.turn();
    expect(base.populationFull).toBeFalsy();
  });

  test('computes worker from population and logger', () => {
    expect(base.worker).toEqual(base.population - base.logger);
  });

  test('starts with 0 logger', () => {
    expect(base.logger).toEqual(0);
  });

  test('starts with 30 loggerMax', () => {
    expect(base.loggerMax).toEqual(30);
  });

  test('assigns logger if worker available', () => {
    const logger = base.logger;
    const worker = base.worker;
    expect(base.assign('logger')).toEqual(true);
    expect(base.logger).toBeGreaterThan(logger);
    expect(base.worker).toBeLessThan(worker);
  });

  test('assigns no logger if workerMin reached', () => {
    base.logger = base.worker;
    expect(base.assign('logger')).toEqual(false);
  });

  test('assigns no logger if loggerMax reached', () => {
    base.logger = base.loggerMax;
    expect(base.assign('logger')).toEqual(false);
  });
});

describe('factor', () => {
  test('dayProduceDefault = 1', () => expect(Factor.dayProduceDefault).toEqual(1));
  test('populationMaxFromHouse = 2', () => expect(Factor.populationMaxFromHouse).toEqual(2));
  test('populationProduceDefault = 1', () => expect(Factor.populationProduceDefault).toEqual(1));
  test('foodConsumeFromPopulation = 1', () => expect(Factor.foodConsumeFromPopulation).toEqual(1));
  test('woodProduceFromLogger = 5', () => expect(Factor.woodProduceFromLogger).toEqual(5));
});

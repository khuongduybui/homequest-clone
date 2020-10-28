import AppState from './AppState';

let state, base0;

beforeEach(() => {
  state = new AppState();
  base0 = state.baseState(0);
});

it('starts with first base', () => {
  expect(state.bases()[0].active).toBe(true);
});

it('has a house in first base', () => {
  expect(base0.house()).toBe(1);
});

it('calculates populationMax = house * 2', () => {
  expect(base0.populationMax()).toBe(base0.house() * 2);
});

it('has a worker in first base', () => {
  expect(base0.worker()).toBe(1);
});

it('adds a worker everyday if population < populationMax', () => {
  const worker1 = base0.worker();
  state.endDay();
  const worker2 = base0.worker();
  expect(worker2).toBe(worker1 + 1);
  state.endDay();
  const worker3 = base0.worker();
  expect(worker3).toBe(worker2);
});

it('calculates population = worker', () => {
  expect(base0.population()).toBe(base0.worker());
});

it('starts with 500 food', () => {
  expect(state.food()).toBe(500);
});

it('reduces food everyday by population', () => {
  const food = state.food();
  const population = state.population();
  state.endDay();
  expect(state.food()).toBe(food - population);
});

it('supports 30 loggers in first base', () => {
  expect(base0.loggerMax()).toBe(30);
});

it('assigns logger if worker > 0 && logger < loggerMax', () => {
  base0.setState({ worker: 1, logger: 0, loggerMax: 30 });
  base0.assign('logger');
  expect(base0.logger()).toBe(1);

  base0.setState({ worker: 0, logger: 0, loggerMax: 30 });
  base0.assign('logger');
  expect(base0.logger()).toBe(0);

  base0.setState({ worker: 1, logger: 0, loggerMax: 0 });
  base0.assign('logger');
  expect(base0.logger()).toBe(0);
});

it('starts with no wood', () => {
  expect(state.wood()).toBe(0);
});

it('adds wood everyday by logger * 5', () => {
  base0.assign('logger');
  const wood = state.wood();
  const logger = state.logger();
  state.endDay();
  expect(state.wood()).toBe(wood + logger * 5);
});

it('starts with no farm in first base', () => {
  expect(base0.farm()).toBe(0);
});

it('calculates farmerMax = farm * 2', () => {
  expect(base0.farmerMax()).toBe(base0.farm() * 2);
});

it('builds a farm if wood >= 10', () => {
  base0.build('farm');
});

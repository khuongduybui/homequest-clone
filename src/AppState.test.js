import AppState, { QuestState } from './AppState';

let state, base0;

beforeEach(() => {
  state = new AppState();
  base0 = state.baseState(0);
});

it('resets to day 0 on-demand', () => {
  state.setState({ day: 10 });
  base0.setState({ house: 10 });
  state.reset();
  expect(state.day()).toBe(0);
  expect(base0.house()).toBe(1);
});

it('starts at Day 0 and increases everyday', () => {
  expect(state.day()).toBe(0);
  state.endDay();
  expect(state.day()).toBe(1);
});

it('starts with first base', () => {
  expect(state.bases().length).toBe(1);
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

it('adds a worker everyday if population < populationMax and food > 0', () => {
  const worker1 = base0.worker();
  state.setState({ food: 0 });
  state.endDay();
  expect(base0.worker()).toBe(worker1);

  state.setState({ food: 3000 });
  state.endDay();
  const worker2 = base0.worker();
  expect(worker2).toBe(worker1 + 1);

  state.endDay();
  const worker3 = base0.worker();
  expect(worker3).toBe(worker2);
});

it('calculates population = workers', () => {
  expect(base0.population()).toBe(base0.worker() + base0.farmer() + base0.logger() + base0.quarrier());
});

it('starts with 3000 food', () => {
  expect(state.food()).toBe(3000);
});

it('starts with 3000 foodMax', () => {
  expect(state.foodMax()).toBe(3000);
});

it('consumes 1 food per population', () => {
  expect(state.foodConsumeRate()).toBe(state.population());
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

it('unassigns logger if logger > 0', () => {
  base0.setState({ logger: 0 });
  base0.unassign('logger');
  expect(base0.logger()).toBe(0);

  base0.setState({ logger: 1 });
  base0.unassign('logger');
  expect(base0.logger()).toBe(0);
});

it('starts with no wood', () => {
  expect(state.wood()).toBe(0);
});

it('starts with 1500 woodMax', () => {
  expect(state.woodMax()).toBe(1500);
});

it('produces 5 wood per logger', () => {
  base0.assign('logger');
  expect(state.woodProduceRate()).toBe(state.logger() * 5);
});

it('adds wood everyday until reaching woodMax', () => {
  base0.assign('logger');
  const wood = state.wood();
  const woodRate = state.woodRate();
  const woodMax = state.woodMax();
  state.endDay();
  expect(state.wood()).toBe(Math.min(woodMax, wood + woodRate));
});

it('starts with no farm in first base', () => {
  expect(base0.farm()).toBe(0);
});

it('calculates farmerMax = farm * 2', () => {
  expect(base0.farmerMax()).toBe(base0.farm() * 2);
});

it('calculates costs from existing buildings', () => {
  const { wood } = base0.buildCost('farm');
  base0.setState({ farm: 10 });
  expect(base0.buildCost('farm').wood).toBeGreaterThan(wood);
});

it('calculates affordability from costs', () => {
  const { wood } = base0.buildCost('farm');
  expect(base0.buildValid('farm')).toBeFalsy();
  state.setState({ wood });
  expect(base0.buildValid('farm')).toBeTruthy();
});

it('builds a farm if enough wood', () => {
  const farm = base0.farm();
  const { wood } = base0.buildCost('farm');
  state.setState({ wood });
  base0.build('farm');
  expect(base0.farm()).toBe(farm + 1);
  expect(state.wood()).toBeLessThan(wood);
});

it('assigns farmer if worker > 0 && farmer < farmerMax', () => {
  base0.setState({ worker: 1, farmer: 0, farm: 1 });
  base0.assign('farmer');
  expect(base0.farmer()).toBe(1);

  base0.setState({ worker: 0, farmer: 0, farm: 1 });
  base0.assign('farmer');
  expect(base0.farmer()).toBe(0);

  base0.setState({ worker: 1, farmer: 0, farm: 0 });
  base0.assign('farmer');
  expect(base0.farmer()).toBe(0);
});

it('produces 4 food per farmer', () => {
  base0.setState({ worker: 1, farmer: 0, farm: 1 });
  base0.assign('farmer');
  expect(state.foodProduceRate()).toBe(state.farmer() * 4);
});

it('adds food everyday until reaching foodMax', () => {
  base0.setState({ worker: 1, farmer: 0, farm: 1 });
  base0.assign('farmer');
  const food = state.food();
  const foodRate = state.foodProduceRate();
  const foodMax = state.foodMax();
  state.endDay();
  expect(state.food()).toBe(Math.min(foodMax, food + foodRate));
});

it('starts with no stone', () => {
  expect(state.stone()).toBe(0);
});

it('starts with same stoneMax as woodMax', () => {
  expect(state.stoneMax()).toBe(state.woodMax());
});

it('supports 30 quarriers in first base', () => {
  expect(base0.quarrierMax()).toBe(30);
});

it('assigns quarrier if worker > 0 && quarrier < quarrierMax', () => {
  base0.setState({ worker: 1, quarrier: 0, quarrierMax: 30 });
  base0.assign('quarrier');
  expect(base0.quarrier()).toBe(1);

  base0.setState({ worker: 0, quarrier: 0, quarrierMax: 30 });
  base0.assign('quarrier');
  expect(base0.quarrier()).toBe(0);

  base0.setState({ worker: 1, quarrier: 0, quarrierMax: 0 });
  base0.assign('quarrier');
  expect(base0.quarrier()).toBe(0);
});

it('produces 3 stone per quarrier', () => {
  base0.assign('quarrier');
  expect(state.stoneProduceRate()).toBe(state.quarrier() * 3);
});

it('adds stone everyday until reaching stoneMax', () => {
  base0.assign('quarrier');
  const stone = state.stone();
  const stoneProduceRate = state.stoneProduceRate();
  const stoneMax = state.stoneMax();
  state.endDay();
  expect(state.stone()).toBe(Math.min(stoneMax, stone + stoneProduceRate));
});

it('builds a house if enough wood and stone', () => {
  const house = base0.house();
  const { wood, stone } = base0.buildCost('house');
  state.setState({ wood, stone });
  base0.build('house');
  expect(base0.house()).toBe(house + 1);
  expect(state.wood()).toBeLessThan(wood);
  expect(state.stone()).toBeLessThan(stone);
});

it('passes a quest condition', () => {
  const quest1 = new QuestState(state, 'test', 'true', ['true'], ['true']);
  expect(quest1.complete()).toBe(true);

  const quest2 = new QuestState(state, 'test', 'false', ['false'], ['false']);
  expect(quest2.complete()).toBe(false);

  const quest3 = new QuestState(state, 'test', 'farm', ['base0.farm > 0'], ['this.app.baseState(0).farm() > 0']);
  expect(quest3.complete()).toBe(false);
  base0.setState({ farm: 1 });
  expect(quest3.complete()).toBe(true);
});

it('lists only 1 incomplete quest', () => {
  const quest1 = new QuestState(state, 'test', 'true', ['true'], ['true']);
  const quest2 = new QuestState(state, 'test', 'false', ['false'], ['false']);
  const quest3 = new QuestState(state, 'test', 'false', ['false'], ['false']);
  state.questStates = [quest1, quest2, quest3];
  expect(state.quests().length).toBe(2);
});

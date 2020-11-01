import AppState, { QuestState } from './AppState';

let app, base0;

beforeEach(() => {
  app = new AppState();
  base0 = app.baseState(0);
});

it('resets to day 0 on-demand', () => {
  app.setState({ day: 10 });
  base0.setState({ house: 10 });
  app.reset();
  expect(app.day()).toBe(0);
  expect(base0.house()).toBe(1);
});

it('starts at Day 0 and increases everyday', () => {
  expect(app.day()).toBe(0);
  app.endDay();
  expect(app.day()).toBe(1);
});

it('starts with first base', () => {
  expect(app.bases().length).toBe(1);
});

it('has a house in first base', () => {
  expect(base0.house()).toBe(1);
});

it('starts with houseEffect = 2', () => {
  expect(app.houseEffect()).toBe(2);
});

it('calculates populationMax = house * houseEffect', () => {
  expect(base0.populationMax()).toBe(base0.house() * app.houseEffect());
});

it('has a worker in first base', () => {
  expect(base0.worker()).toBe(1);
});

it('adds a worker everyday if population < populationMax and food > 0', () => {
  const worker1 = base0.worker();
  app.setState({ food: 0 });
  app.endDay();
  expect(base0.worker()).toBe(worker1);

  app.setState({ food: 3000 });
  app.endDay();
  const worker2 = base0.worker();
  expect(worker2).toBe(worker1 + 1);

  app.endDay();
  const worker3 = base0.worker();
  expect(worker3).toBe(worker2);
});

it('calculates population = workers', () => {
  expect(base0.population()).toBe(base0.worker() + base0.farmer() + base0.logger() + base0.quarrier());
});

it('starts with 3000 food', () => {
  expect(app.food()).toBe(3000);
});

it('starts with 3000 foodMax', () => {
  expect(app.foodMax()).toBe(3000);
});

it('consumes 1 food per population', () => {
  expect(app.foodConsumeRate()).toBe(app.population());
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
  expect(app.wood()).toBe(0);
});

it('starts with 1500 woodMax', () => {
  expect(app.woodMax()).toBe(1500);
});

it('starts with loggerEffect = 5', () => {
  expect(app.loggerEffect()).toBe(5);
});

it('produces wood = logger * loggerEffect ', () => {
  base0.assign('logger');
  expect(app.woodProduceRate()).toBe(app.logger() * app.loggerEffect());
});

it('adds wood everyday until reaching woodMax', () => {
  base0.assign('logger');
  const wood = app.wood();
  const woodRate = app.woodRate();
  const woodMax = app.woodMax();
  app.endDay();
  expect(app.wood()).toBe(Math.min(woodMax, wood + woodRate));
});

it('starts with no farm in first base', () => {
  expect(base0.farm()).toBe(0);
});

it('starts with same farmEffect as houseEffect', () => {
  expect(app.farmEffect()).toBe(app.houseEffect());
});

it('calculates farmerMax = farm * farmEffect', () => {
  expect(base0.farmerMax()).toBe(base0.farm() * app.farmEffect());
});

it('calculates costs from existing buildings', () => {
  const { wood } = base0.buildCost('farm');
  base0.setState({ farm: 10 });
  expect(base0.buildCost('farm').wood).toBeGreaterThan(wood);
});

it('calculates affordability from costs', () => {
  const { wood } = base0.buildCost('farm');
  expect(base0.buildValid('farm')).toBeFalsy();
  app.setState({ wood });
  expect(base0.buildValid('farm')).toBeTruthy();
});

it('builds a farm if enough wood', () => {
  const farm = base0.farm();
  const { wood } = base0.buildCost('farm');
  app.setState({ wood });
  base0.build('farm');
  expect(base0.farm()).toBe(farm + 1);
  expect(app.wood()).toBeLessThan(wood);
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

it('produces food = farmer * farmerEffect', () => {
  base0.setState({ worker: 1, farmer: 0, farm: 1 });
  base0.assign('farmer');
  expect(app.foodProduceRate()).toBe(app.farmer() * app.farmerEffect());
});

it('adds food everyday until reaching foodMax', () => {
  base0.setState({ worker: 1, farmer: 0, farm: 1 });
  base0.assign('farmer');
  const food = app.food();
  const foodRate = app.foodProduceRate();
  const foodMax = app.foodMax();
  app.endDay();
  expect(app.food()).toBe(Math.min(foodMax, food + foodRate));
});

it('starts with no stone', () => {
  expect(app.stone()).toBe(0);
});

it('starts with same stoneMax as woodMax', () => {
  expect(app.stoneMax()).toBe(app.woodMax());
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

it('produces stone = quarrier * quarrierEffect', () => {
  base0.assign('quarrier');
  expect(app.stoneProduceRate()).toBe(app.quarrier() * app.quarrierEffect());
});

it('adds stone everyday until reaching stoneMax', () => {
  base0.assign('quarrier');
  const stone = app.stone();
  const stoneRate = app.stoneRate();
  const stoneMax = app.stoneMax();
  app.endDay();
  expect(app.stone()).toBe(Math.min(stoneMax, stone + stoneRate));
});

it('builds a house if enough wood and stone', () => {
  const house = base0.house();
  expect(base0.build('house')).toBe(false);

  const { wood, stone } = base0.buildCost('house');
  app.setState({ wood, stone });
  expect(base0.build('house')).toBe(true);
  expect(base0.house()).toBe(house + 1);
  expect(app.wood()).toBeLessThan(wood);
  expect(app.stone()).toBeLessThan(stone);
});

it('passes a quest condition', () => {
  const quest1 = new QuestState(app, 'test', 'true', ['true'], ['true']);
  expect(quest1.complete()).toBe(true);

  const quest2 = new QuestState(app, 'test', 'false', ['false'], ['false']);
  expect(quest2.complete()).toBe(false);

  const quest3 = new QuestState(app, 'test', 'farm', ['base0.farm > 0'], ['this.app.baseState(0).farm() > 0']);
  expect(quest3.complete()).toBe(false);
  base0.setState({ farm: 1 });
  expect(quest3.complete()).toBe(true);
});

it('lists only 1 incomplete quest', () => {
  const quest1 = new QuestState(app, 'test', 'true', ['true'], ['true']);
  const quest2 = new QuestState(app, 'test', 'false', ['false'], ['false']);
  const quest3 = new QuestState(app, 'test', 'false', ['false'], ['false']);
  app.questStates = [quest1, quest2, quest3];
  expect(app.questState(0).complete()).toBe(true);
  expect(app.questState(1).complete()).toBe(false);
  expect(app.quests().length).toBe(2);
});

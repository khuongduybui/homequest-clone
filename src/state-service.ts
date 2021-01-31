export type Resource = 'day' | 'food' | 'house' | 'logger' | 'population' | 'wood' | 'worker';
export type RecursiveResource = 'base';
export type Job = 'logger' | 'worker';

export class Factor {
  // hqc food = hq food * 10
  // hqc wood = hq wood * 10
  static dayProduceDefault = 1;
  static populationMaxFromHouse = 2;
  static populationProduceDefault = 1;
  static foodConsumeFromPopulation = 1;
  static woodProduceFromLogger = 5;
}

export class State {
  resources: Resource[] = [];
  recursiveResources: RecursiveResource[] = [];

  constructor() {
    this.reset();
  }

  reset(): void {}

  delta(resource: Resource): number {
    const produceKey = `${resource}Produce`;
    const produce = this[produceKey] ?? 0;

    const consumeKey = `${resource}Consume`;
    const consume = this[consumeKey] ?? 0;

    return produce - consume;
  }

  update(resource: Resource): void {
    const maxKey = `${resource}Max`;
    const max = this[maxKey] ?? Infinity;

    const minKey = `${resource}Min`;
    const min = this[minKey] ?? 0;

    const newValue = this[resource] + this.delta(resource);
    this[resource] = Math.max(Math.min(newValue, max), min);
  }

  turn(): void {
    this.resources.forEach((resource) => this.update(resource));
    this.recursiveResources.forEach((recursiveResource) => this[recursiveResource].forEach((resource: State) => resource.turn()));
  }

  initResource(resource: Resource, init: { value?; produce?; consume?; max?; min? } = {}): void {
    const valueKey = resource;
    const valueKeyDefault = `${resource}Default`;
    const produceKey = `${resource}Produce`;
    const produceKeyDefault = `${resource}ProduceDefault`;
    const consumeKey = `${resource}Consume`;
    const consumeKeyDefault = `${resource}ConsumeDefault`;
    const maxKey = `${resource}Max`;
    const maxKeyDefault = `${resource}MaxDefault`;
    const minKey = `${resource}Min`;
    const minKeyDefault = `${resource}MinDefault`;
    const deltaKey = `${resource}Delta`;
    const hasGetter = (key) => !!Object.getOwnPropertyDescriptor(this['__proto__'], key)?.get;

    if (!hasGetter(valueKey)) {
      this[valueKey] = init.value ?? Factor[valueKeyDefault] ?? 0;
    }
    if (!hasGetter(produceKey)) {
      this[produceKey] = init.produce ?? Factor[produceKeyDefault] ?? 0;
    }
    if (!hasGetter(consumeKey)) {
      this[consumeKey] = init.consume ?? Factor[consumeKeyDefault] ?? 0;
    }
    if (!hasGetter(maxKey)) {
      this[maxKey] = init.max ?? Factor[maxKeyDefault] ?? Infinity;
    }
    if (!hasGetter(minKey)) {
      this[minKey] = init.min ?? Factor[minKeyDefault] ?? 0;
    }
    if (!hasGetter(deltaKey)) {
      Object.defineProperty(this['__proto__'], deltaKey, {
        get: () => this.delta(resource),
      });
    }
  }
}
export class StateService extends State {
  bases: Base[];
  day: number;
  dayProduce = Factor.dayProduceDefault;
  food: number;
  foodMax: number;
  wood: number;

  resources: Resource[] = ['day', 'food', 'wood'];
  recursiveResources: RecursiveResource[] = ['base'];

  reset(): void {
    this.bases = [new Base(this, { enabled: true })];
    this.initResource('day');
    this.initResource('food', { value: 3000, max: 3000 });
    this.initResource('wood', { max: 1500 });
  }

  get base(): Base[] {
    return this.bases.filter((base) => base.enabled);
  }

  sumFromBase(mapper: (base: Base) => number): number {
    return this.base.map(mapper).reduce((sum, current) => sum + current, 0);
  }

  get population(): number {
    return this.sumFromBase((base) => base.population);
  }

  get foodConsume(): number {
    return this.population * Factor.foodConsumeFromPopulation;
  }

  get logger(): number {
    return this.sumFromBase((base) => base.logger);
  }

  get woodProduce(): number {
    return this.logger * Factor.woodProduceFromLogger;
  }
}

export class Base extends State {
  enabled: boolean;
  population: number;
  populationProduce: number;
  house: number;
  logger: number;
  loggerMax: number;
  workerMin: number;
  state: State;
  resources: Resource[] = ['population'];

  constructor(state: State, { enabled = false, house = 1, population = 1, logger = 0, loggerMax = 30, ...initState }) {
    super();

    this.state = state;

    this.enabled = enabled;
    this.initResource('house', { value: house });
    this.initResource('population', { value: population });
    this.initResource('logger', { value: logger, max: loggerMax });
    this.initResource('worker');
  }

  get populationMax(): number {
    return this.house * Factor.populationMaxFromHouse;
  }

  get populationFull(): number | undefined {
    if (this.population < this.populationMax) {
      return Math.ceil((this.populationMax - this.population) / this.populationProduce);
    }
  }

  get worker(): number {
    return this.population - this.logger;
  }

  assign(job): boolean {
    if (this.worker > this.workerMin && this[job] < this[`${job}Max`]) {
      this[job]++;
      return true;
    }
    return false;
  }

  unassign(job): boolean {
    if (this[job] >= this[`${job}Min`]) {
      this[job]--;
      return true;
    }
    return false;
  }
}

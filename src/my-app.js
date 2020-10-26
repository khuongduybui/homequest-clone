export class MyApp {
  ticker;

  day = 0;
  bases = [
    {
      logger: 0,
      loggerMax: 30,
      quarry: 0,
      quarryMax: 30,
      hunter: 0,
      hunterMax: 20,
      house: 1,
      worker: 1,
      workerFree: 1,
      farm: 0,
      farmer: 0,
    },
  ];
  total = {};
  food = 500;
  wood = 0;
  count(job) {
    return this.bases.map((base) => base[job]).reduce((sum, current) => sum + current, 0);
  }

  workerAdd(base, job) {
    if (base.workerFree) {
      const cap = job + 'Max';
      if (base[job] < base[cap]) {
        base.workerFree--;
        base[job]++;
      }
    }
  }

  buildingAdd(base, building) {
    switch (building) {
      case 'farm':
        const farmPrice = {
          wood: 10, // scale with base.farm
        };
        if (this.wood >= farmPrice.wood) {
          this.wood -= farmPrice.wood;
          base.farm++;
        }
        break;
      case 'house':
        let housePrice = {
          wood: 10, // scale with base.house
        };
        if (this.wood >= housePrice.wood) {
          this.wood -= housePrice.wood;
          base.house++;
        }
        break;
    }
  }

  tick() {
    this.day++;

    this.total = {};

    this.bases.forEach((base) => {
      base.workerMax = base.house * 2;
      if (base.worker < base.workerMax) {
        base.worker++;
      }
      base.workerFree = base.worker - base.logger - base.farmer;

      base.farmerMax = base.farm * 2;

      Object.keys(base).forEach((key) => (this.total[key] = (this.total[key] || 0) + base[key]));
    });

    this.food += this.total.farmer * 10 - this.total.worker;
    this.wood += this.total.logger * 5;
  }

  afterAttach() {
    this.tick();
    this.ticker = setInterval(this.tick.bind(this), 1000);
  }

  afterDetach() {
    clearInterval(this.ticker);
  }
}

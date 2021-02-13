define.switchToUserSpace();
define('base-worker-page.html.js',['require','exports','module','@aurelia/runtime-html'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.register = register;
exports.dependencies = exports.default = exports.template = exports.name = void 0;

var _runtimeHtml = require("@aurelia/runtime-html");

const name = "base-worker-page";
exports.name = name;
const template = "<section>\n  <table>\n    <thead>\n      <tr>\n        <th scope=\"col\">resource</th>\n        <th scope=\"col\">value</th>\n        <th scope=\"col\">min</th>\n        <th scope=\"col\">max</th>\n        <th scope=\"col\">produce</th>\n        <th scope=\"col\">consume</th>\n        <th scope=\"col\">delta</th>\n        <th scope=\"col\">actions</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <th scope=\"row\">population</th>\n        <td><code>${base.population}</code></td>\n        <td><code>${base.populationMin}</code></td>\n        <td><code>${base.populationMax}</code></td>\n        <td><code>${base.populationProduce}</code></td>\n        <td><code>${base.populationConsume}</code></td>\n        <td><code>${base.populationDelta}</code></td>\n        <td>&nbsp;</td>\n      </tr>\n      <tr>\n        <th scope=\"row\">worker</th>\n        <td><code>${base.worker}</code></td>\n        <td><code>${base.workerMin}</code></td>\n        <td><code>${base.workerMax}</code></td>\n        <td><code>${base.workerProduce}</code></td>\n        <td><code>${base.workerConsume}</code></td>\n        <td><code>${base.workerDelta}</code></td>\n        <td>&nbsp;</td>\n      </tr>\n      <tr>\n        <th scope=\"row\">logger</th>\n        <td><code>${base.logger}</code></td>\n        <td><code>${base.loggerMin}</code></td>\n        <td><code>${base.loggerMax}</code></td>\n        <td><code>${base.loggerProduce}</code></td>\n        <td><code>${base.loggerConsume}</code></td>\n        <td><code>${base.loggerDelta}</code></td>\n        <td>\n          <button click.trigger=\"base.assign('logger')\">+</button>\n          <button click.trigger=\"base.unassign('logger')\">-</button>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</section>\n";
exports.template = template;
var _default = template;
exports.default = _default;
const dependencies = [];
exports.dependencies = dependencies;

let _e;

function register(container) {
  if (!_e) {
    _e = _runtimeHtml.CustomElement.define({
      name,
      template,
      dependencies
    });
  }

  container.register(_e);
}
});

define('base-worker-page.js',['require','exports','module','./base-worker-page.html','@aurelia/runtime-html','./state-service'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.BaseWorkerPage = void 0;

var __au2ViewDef = _interopRequireWildcard(require("./base-worker-page.html"));

var _runtimeHtml = require("@aurelia/runtime-html");

var _stateService = require("./state-service");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let BaseWorkerPage = class BaseWorkerPage {
  constructor(state) {
    this.state = state;
  }

  load(parameters) {
    var _a;

    this.id = Number((_a = parameters.id) !== null && _a !== void 0 ? _a : 0);
    this.base = this.state.bases[0];
  }

};
exports.BaseWorkerPage = BaseWorkerPage;
BaseWorkerPage.inject = [_stateService.StateService];
BaseWorkerPage.parameters = ['id'];
exports.BaseWorkerPage = BaseWorkerPage = __decorate([(0, _runtimeHtml.customElement)(__au2ViewDef), __metadata("design:paramtypes", [_stateService.StateService])], BaseWorkerPage);
});

define('ext:css',['dumber/lib/inject-css'],function(m){return m;});
;define.alias('ext:less','ext:css');
;define.alias('ext:scss','ext:css');
;define.alias('ext:sass','ext:css');
;define.alias('ext:styl','ext:css');
define('main.js',['require','exports','module','aurelia','./my-app'],function (require, exports, module) {
"use strict";

var _aurelia = _interopRequireWildcard(require("aurelia"));

var _myApp = require("./my-app");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_aurelia.default.register(_aurelia.RouterConfiguration) // To use HTML5 pushState routes, replace previous line with the following
// customized router config.
// .register(RouterConfiguration.customize({ useUrlFragmentHash: false }))
.app(_myApp.MyApp).start();
});

define('missing-page.html.js',['require','exports','module','@aurelia/runtime-html'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.register = register;
exports.dependencies = exports.default = exports.template = exports.name = void 0;

var _runtimeHtml = require("@aurelia/runtime-html");

const name = "missing-page";
exports.name = name;
const template = "<h3>Ouch! Couldn't find '${missingComponent}'!</h3>\n";
exports.template = template;
var _default = template;
exports.default = _default;
const dependencies = [];
exports.dependencies = dependencies;

let _e;

function register(container) {
  if (!_e) {
    _e = _runtimeHtml.CustomElement.define({
      name,
      template,
      dependencies
    });
  }

  container.register(_e);
}
});

define('missing-page.js',['require','exports','module','./missing-page.html','@aurelia/runtime-html'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.MissingPage = void 0;

var __au2ViewDef = _interopRequireWildcard(require("./missing-page.html"));

var _runtimeHtml = require("@aurelia/runtime-html");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let MissingPage = class MissingPage {
  enter(parameters) {
    this.missingComponent = parameters.id;
  }

};
exports.MissingPage = MissingPage;
MissingPage.parameters = ['id'];
exports.MissingPage = MissingPage = __decorate([(0, _runtimeHtml.customElement)(__au2ViewDef)], MissingPage);
});

define('text!my-app.css',function(){return "nav {\n  background: #eee;\n  display: flex;\n}\n\na {\n  padding: 10px;\n  text-decoration: none;\n  color: black;\n}\na:hover {\n  background-color: darkgray;\n}\n\n.load-active {\n  background-color: lightgray;\n}";});
define('my-app.html.js',['require','exports','module','@aurelia/runtime-html','@aurelia/kernel','./my-app.css','./treasury-page','./worker-page','./missing-page'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.register = register;
exports.dependencies = exports.default = exports.template = exports.name = void 0;

var _runtimeHtml = require("@aurelia/runtime-html");

var _kernel = require("@aurelia/kernel");

var _myApp = _interopRequireDefault(require("./my-app.css"));

var d1 = _interopRequireWildcard(require("./treasury-page"));

var d2 = _interopRequireWildcard(require("./worker-page"));

var d3 = _interopRequireWildcard(require("./missing-page"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const name = "my-app";
exports.name = name;
const template = "\n\n\n\n<div>\n  <p>Day <code>${state.day}</code></p>\n  <p>Population <code>${state.population}</code></p>\n  <p>Food <code>${state.food}</code> (<code>${state.foodDelta}</code>)</p>\n  <button click.trigger=\"state.turn()\">End Day</button>\n</div>\n\n<nav>\n  <a load=\"treasury-page\">Treasury</a>\n  <a load=\"worker-page/base-worker-page(id=0)\">Workers</a>\n</nav>\n\n<au-viewport default=\"treasury-page\" fallback=\"missing-page\"></au-viewport>\n\n<div>\n  <button click.trigger=\"state.reset()\">Reset</button>\n</div>\n";
exports.template = template;
var _default = template;
exports.default = _default;
const dependencies = [d1, d2, d3, _kernel.Registration.defer('.css', _myApp.default)];
exports.dependencies = dependencies;

let _e;

function register(container) {
  if (!_e) {
    _e = _runtimeHtml.CustomElement.define({
      name,
      template,
      dependencies
    });
  }

  container.register(_e);
}
});

define('my-app.js',['require','exports','module','./my-app.html','@aurelia/runtime-html','./state-service'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.MyApp = void 0;

var __au2ViewDef = _interopRequireWildcard(require("./my-app.html"));

var _runtimeHtml = require("@aurelia/runtime-html");

var _stateService = require("./state-service");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let MyApp = class MyApp {
  constructor(state) {
    this.state = state;
  }

};
exports.MyApp = MyApp;
MyApp.inject = [_stateService.StateService];
exports.MyApp = MyApp = __decorate([(0, _runtimeHtml.customElement)(__au2ViewDef), __metadata("design:paramtypes", [_stateService.StateService])], MyApp);
});

define('state-service.js',['require','exports','module'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.Base = exports.StateService = exports.State = exports.Factor = void 0;

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

class Factor {} // hqc food = hq food * 10
// hqc wood = hq wood * 10


exports.Factor = Factor;
Factor.dayProduceDefault = 1;
Factor.farmerMaxFromFarm = 2;
Factor.foodConsumeFromPopulation = 1;
Factor.foodProduceFromFarmer = 4;
Factor.populationMaxFromHouse = 2;
Factor.populationProduceDefault = 1;
Factor.woodProduceFromLogger = 5;

class State {
  constructor() {
    this.resources = [];
    this.recursiveResources = [];
    this.reset();
  }

  reset() {}

  delta(resource) {
    var _a, _b;

    const produceKey = `${resource}Produce`;
    const produce = (_a = this[produceKey]) !== null && _a !== void 0 ? _a : 0;
    const consumeKey = `${resource}Consume`;
    const consume = (_b = this[consumeKey]) !== null && _b !== void 0 ? _b : 0;
    return produce - consume;
  }

  update(resource) {
    var _a, _b;

    const maxKey = `${resource}Max`;
    const max = (_a = this[maxKey]) !== null && _a !== void 0 ? _a : Infinity;
    const minKey = `${resource}Min`;
    const min = (_b = this[minKey]) !== null && _b !== void 0 ? _b : 0;
    const newValue = this[resource] + this.delta(resource);
    this[resource] = Math.max(Math.min(newValue, max), min);
  }

  turn() {
    this.resources.forEach(resource => this.update(resource));
    this.recursiveResources.forEach(recursiveResource => this[recursiveResource].forEach(resource => resource.turn()));
  }

  initResource(resource, init = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

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

    const hasGetter = key => {
      var _a;

      return !!((_a = Object.getOwnPropertyDescriptor(this['__proto__'], key)) === null || _a === void 0 ? void 0 : _a.get);
    };

    if (!hasGetter(valueKey)) {
      this[valueKey] = (_b = (_a = init.value) !== null && _a !== void 0 ? _a : Factor[valueKeyDefault]) !== null && _b !== void 0 ? _b : 0;
    }

    if (!hasGetter(produceKey)) {
      this[produceKey] = (_d = (_c = init.produce) !== null && _c !== void 0 ? _c : Factor[produceKeyDefault]) !== null && _d !== void 0 ? _d : 0;
    }

    if (!hasGetter(consumeKey)) {
      this[consumeKey] = (_f = (_e = init.consume) !== null && _e !== void 0 ? _e : Factor[consumeKeyDefault]) !== null && _f !== void 0 ? _f : 0;
    }

    if (!hasGetter(maxKey)) {
      this[maxKey] = (_h = (_g = init.max) !== null && _g !== void 0 ? _g : Factor[maxKeyDefault]) !== null && _h !== void 0 ? _h : Infinity;
    }

    if (!hasGetter(minKey)) {
      this[minKey] = (_k = (_j = init.min) !== null && _j !== void 0 ? _j : Factor[minKeyDefault]) !== null && _k !== void 0 ? _k : 0;
    }

    if (!hasGetter(deltaKey)) {
      Object.defineProperty(this['__proto__'], deltaKey, {
        get: () => this.delta(resource)
      });
    }
  }

}

exports.State = State;

class StateService extends State {
  constructor() {
    super(...arguments);
    this.dayProduce = Factor.dayProduceDefault;
    this.resources = ['day', 'food', 'wood'];
    this.recursiveResources = ['base'];
  }

  reset() {
    this.bases = [new Base(this, {
      enabled: true
    })];
    this.initResource('day');
    this.initResource('food', {
      value: 3000,
      max: 3000
    });
    this.initResource('wood', {
      max: 1500
    });
  }

  get base() {
    return this.bases.filter(base => base.enabled);
  }

  sumFromBase(mapper) {
    return this.base.map(mapper).reduce((sum, current) => sum + current, 0);
  }

  get population() {
    return this.sumFromBase(base => base.population);
  }

  get foodConsume() {
    return this.population * Factor.foodConsumeFromPopulation;
  }

  get logger() {
    return this.sumFromBase(base => base.logger);
  }

  get woodProduce() {
    return this.logger * Factor.woodProduceFromLogger;
  }

  get farmer() {
    return this.sumFromBase(base => base.farmer);
  }

  get foodProduce() {
    return this.farmer * Factor.foodProduceFromFarmer;
  }

}

exports.StateService = StateService;

class Base extends State {
  constructor(state, _a) {
    var {
      enabled = false,
      farm = 0,
      farmer = 0,
      house = 1,
      population = 1,
      logger = 0,
      loggerMax = 30
    } = _a,
        initState = __rest(_a, ["enabled", "farm", "farmer", "house", "population", "logger", "loggerMax"]);

    super();
    this.resources = ['population'];
    this.state = state;
    this.enabled = enabled;
    this.initResource('farm', {
      value: farm
    });
    this.initResource('farmer', {
      value: farmer
    });
    this.initResource('house', {
      value: house
    });
    this.initResource('population', {
      value: population
    });
    this.initResource('logger', {
      value: logger,
      max: loggerMax
    });
    this.initResource('worker');
  }

  get populationMax() {
    return this.house * Factor.populationMaxFromHouse;
  }

  get populationProduce() {
    if (this.state.food > this.state.foodMin) {
      return Factor.populationProduceDefault;
    }

    return 0;
  }

  get populationFull() {
    if (this.populationProduce > 0 && this.population < this.populationMax) {
      return Math.ceil((this.populationMax - this.population) / this.populationProduce);
    }
  }

  get worker() {
    return this.population - this.farmer - this.logger;
  }

  get farmerMax() {
    return this.farm * Factor.farmerMaxFromFarm;
  }

  assign(job) {
    if (this.worker > this.workerMin && this[job] < this[`${job}Max`]) {
      this[job]++;
      return true;
    }

    return false;
  }

  unassign(job) {
    if (this[job] >= this[`${job}Min`]) {
      this[job]--;
      return true;
    }

    return false;
  }

}

exports.Base = Base;
});

define('treasury-page.html.js',['require','exports','module','@aurelia/runtime-html'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.register = register;
exports.dependencies = exports.default = exports.template = exports.name = void 0;

var _runtimeHtml = require("@aurelia/runtime-html");

const name = "treasury-page";
exports.name = name;
const template = "<section>\n  <table>\n    <thead>\n      <tr>\n        <th scope=\"col\">resource</th>\n        <th scope=\"col\">value</th>\n        <th scope=\"col\">min</th>\n        <th scope=\"col\">max</th>\n        <th scope=\"col\">produce</th>\n        <th scope=\"col\">consume</th>\n        <th scope=\"col\">delta</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <th scope=\"row\">day</th>\n        <td><code>${state.day}</code></td>\n        <td><code>${state.dayMin}</code></td>\n        <td><code>${state.dayMax}</code></td>\n        <td><code>${state.dayProduce}</code></td>\n        <td><code>${state.dayConsume}</code></td>\n        <td><code>${state.dayDelta}</code></td>\n      </tr>\n      <tr>\n        <th scope=\"row\">food</th>\n        <td><code>${state.food}</code></td>\n        <td><code>${state.foodMin}</code></td>\n        <td><code>${state.foodMax}</code></td>\n        <td><code>${state.foodProduce}</code></td>\n        <td><code>${state.foodConsume}</code></td>\n        <td><code>${state.foodDelta}</code></td>\n      </tr>\n      <tr>\n        <th scope=\"row\">wood</th>\n        <td><code>${state.wood}</code></td>\n        <td><code>${state.woodMin}</code></td>\n        <td><code>${state.woodMax}</code></td>\n        <td><code>${state.woodProduce}</code></td>\n        <td><code>${state.woodConsume}</code></td>\n        <td><code>${state.woodDelta}</code></td>\n      </tr>\n    </tbody>\n  </table>\n</section>\n";
exports.template = template;
var _default = template;
exports.default = _default;
const dependencies = [];
exports.dependencies = dependencies;

let _e;

function register(container) {
  if (!_e) {
    _e = _runtimeHtml.CustomElement.define({
      name,
      template,
      dependencies
    });
  }

  container.register(_e);
}
});

define('treasury-page.js',['require','exports','module','./treasury-page.html','@aurelia/runtime-html','./state-service'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.TreasuryPage = void 0;

var __au2ViewDef = _interopRequireWildcard(require("./treasury-page.html"));

var _runtimeHtml = require("@aurelia/runtime-html");

var _stateService = require("./state-service");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let TreasuryPage = class TreasuryPage {
  constructor(state) {
    this.state = state;
  }

};
exports.TreasuryPage = TreasuryPage;
TreasuryPage.inject = [_stateService.StateService];
exports.TreasuryPage = TreasuryPage = __decorate([(0, _runtimeHtml.customElement)(__au2ViewDef), __metadata("design:paramtypes", [_stateService.StateService])], TreasuryPage);
});

define('worker-page.html.js',['require','exports','module','@aurelia/runtime-html','./base-worker-page','./missing-page'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.register = register;
exports.dependencies = exports.default = exports.template = exports.name = void 0;

var _runtimeHtml = require("@aurelia/runtime-html");

var d0 = _interopRequireWildcard(require("./base-worker-page"));

var d1 = _interopRequireWildcard(require("./missing-page"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const name = "worker-page";
exports.name = name;
const template = "\n\n\n<nav>\n  <a load=\"base-worker-page(id=0)\">base.0</a>\n</nav>\n\n<au-viewport default=\"base-worker-page(id=0)\" fallback=\"missing-page\"></au-viewport>\n";
exports.template = template;
var _default = template;
exports.default = _default;
const dependencies = [d0, d1];
exports.dependencies = dependencies;

let _e;

function register(container) {
  if (!_e) {
    _e = _runtimeHtml.CustomElement.define({
      name,
      template,
      dependencies
    });
  }

  container.register(_e);
}
});

define('worker-page.js',['require','exports','module','./worker-page.html','@aurelia/runtime-html','./state-service'],function (require, exports, module) {
"use strict";

exports.__esModule = true;
exports.WorkerPage = void 0;

var __au2ViewDef = _interopRequireWildcard(require("./worker-page.html"));

var _runtimeHtml = require("@aurelia/runtime-html");

var _stateService = require("./state-service");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let WorkerPage = class WorkerPage {
  constructor(state) {
    this.state = state;
  }

};
exports.WorkerPage = WorkerPage;
WorkerPage.inject = [_stateService.StateService];
exports.WorkerPage = WorkerPage = __decorate([(0, _runtimeHtml.customElement)(__au2ViewDef), __metadata("design:paramtypes", [_stateService.StateService])], WorkerPage);
});
//# sourceMappingURL=app-bundle.js.map

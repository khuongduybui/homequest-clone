import { IRouteableComponent } from '@aurelia/router';

import { Base, StateService } from "./state-service";

export class BaseWorkerPage implements IRouteableComponent {
  public static readonly inject = [StateService];

  public static parameters = ['id'];

  public base: Base;
  public id: number;
  public state: StateService;

  constructor(state: StateService) {
    this.state = state;
  }

  public load(parameters) {
    this.id = Number(parameters.id ?? 0)
    this.base = this.state.bases[0]
  }
}

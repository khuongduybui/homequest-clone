import { StateService } from "./state-service";

export class MyApp {
  public static readonly inject = [StateService];
  public state: StateService;
  constructor(state: StateService) {
    this.state = state;
  }
}

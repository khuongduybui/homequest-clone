import { StateService } from "./state-service";

export class WelcomePage {
  public static readonly inject = [StateService];
  public state: StateService;
  constructor(state: StateService) {
    this.state = state;
  }
  public message = "Welcome to Aurelia 2!";
}

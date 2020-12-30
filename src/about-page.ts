import { StateService } from "./state-service";

export class AboutPage {
  public static readonly inject = [StateService];
  public state: StateService;
  constructor(state: StateService) {
    this.state = state;
  }
}

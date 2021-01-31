import { StateService } from "./state-service";

export class WorkerPage {
  public static readonly inject = [StateService];
  public state: StateService;
  constructor(state: StateService) {
    this.state = state;
  }
}

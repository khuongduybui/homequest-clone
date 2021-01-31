import { StateService } from "./state-service";

export class TreasuryPage {
  public static readonly inject = [StateService];
  public state: StateService;
  constructor(state: StateService) {
    this.state = state;
  }
}

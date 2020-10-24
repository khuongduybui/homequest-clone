export class Missing {
  static parameters = ['id'];
  missingComponent;

  enter(parameters) {
    this.missingComponent = parameters.id;
  }
}

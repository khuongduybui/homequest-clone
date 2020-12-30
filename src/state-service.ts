export class StateService {
  public foo = "foo";
  get foobar(): string {
    return `${this.foo}-bar`;
  }
  resetFoo(): void {
    this.foo = "foo";
  }
}

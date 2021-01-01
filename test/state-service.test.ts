import { StateService } from "../src/state-service";

test("starts with foo", () => {
  const stateService = new StateService();
  expect(stateService.foo).toEqual("foo");
  expect(stateService.foobar).toEqual("foo-bar");
});

test("computes foobar from foo", () => {
  const stateService = new StateService();
  stateService.foo = "test";
  expect(stateService.foobar).toMatch("test");
});

test("resets foo on demand", () => {
  const stateService = new StateService();
  stateService.foo = "test";
  stateService.resetFoo();
  expect(stateService.foo).toEqual("foo");
});

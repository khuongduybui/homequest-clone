import { createEffect } from 'solid-js';

import AppState from './AppState';
import './App.css';

const Job = ({ base, job, title, effect }) => {
  const assign = (event) => base.assign(job);
  const unassign = (event) => base.unassign(job);
  const jobSignal = base[job].bind(base);
  const maxKey = `${job}Max`;
  const maxSignal = base[maxKey].bind(base);
  const effectKey = `${job}Effect`;
  const effectSignal = base.app[effectKey].bind(base.app);
  return (
    <div>
      {title} <code>{jobSignal()}</code>/<code>{maxSignal()}</code> (producing {effectSignal()} {effect} each)
      <Show when={jobSignal() < maxSignal() && base.worker() > 0}>
        <button onClick={assign}>Assign</button>
      </Show>
      <Show when={jobSignal() > 0}>
        <button onClick={unassign}>Unassign</button>
      </Show>
    </div>
  );
};

const Building = ({ base, building, title, effect }) => {
  const build = (event) => base.build(building);
  const effectKey = `${building}Effect`;
  const effectSignal = base.app[effectKey].bind(base.app);
  return (
    <div>
      {title} <code>{base[building]()}</code> (supporting {effectSignal()} {effect} each)
      <Show when={base.buildValid(building)}>
        <button onClick={build}>Build</button>
      </Show>
      <pre>{JSON.stringify(base.buildCost(building))}</pre>
    </div>
  );
};

const Base = ({ base }) => {
  return (
    <>
      <div>Base {base.id}</div>
      <section>
        <Building base={base} building='house' title='House' effect='workers'></Building>
        <Building base={base} building='farm' title='Farm' effect='farmers'></Building>
      </section>
      <section>
        <div>
          Worker <code>{base.worker()}</code>
        </div>
        <Job base={base} job='farmer' title='Farmer' effect='food'></Job>
        <Job base={base} job='logger' title='Logger' effect='wood'></Job>
        <Job base={base} job='quarrier' title='Quarrier' effect='stone'></Job>
      </section>
    </>
  );
};

const Quest = ({ quest }) => {
  return (
    <section>
      <div>{quest.title}</div>
      <p>{quest.content}</p>
      <ul>
        <For each={quest.objectives}>{(objective) => <li>{objective}</li>}</For>
      </ul>
      <Show when={quest.complete()}>DONE</Show>
    </section>
  );
};

function App() {
  const state = new AppState();
  createEffect(state.effect.bind(state));

  const endDay = state.endDay.bind(state);
  const reset = state.reset.bind(state);

  return (
    <>
      <section>
        <div>
          Day <code>{state.day()}</code>
        </div>
        <div>
          Population <code>{state.population()}</code>
        </div>
        <button onClick={endDay}>End Day</button>
        <button onClick={reset}>Reset</button>
      </section>

      <section>
        <div>
          Food <code>{state.food()}</code>/<code>{state.foodMax()}</code> (+<code>{state.foodProduceRate()}</code> from workers, -
          <code>{state.foodConsumeRate()}</code> from population = <code>{state.foodRate()}</code>)
        </div>
        <div>
          Wood <code>{state.wood()}</code>/<code>{state.woodMax()}</code> (+<code>{state.woodProduceRate()}</code> from workers)
        </div>
        <div>
          Stone <code>{state.stone()}</code>/<code>{state.stoneMax()}</code> (+<code>{state.stoneProduceRate()}</code> from workers)
        </div>
      </section>

      <For each={state.bases()}>{(base) => <Base base={base}></Base>}</For>

      <For each={state.quests()}>{(quest) => <Quest quest={quest}></Quest>}</For>
    </>
  );
}

export default App;

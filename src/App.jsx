import { createEffect } from 'solid-js';

import AppState from './AppState';
import './App.css';

const Job = ({ base, job, title }) => {
  const assign = (event) => base.assign(job);
  const unassign = (event) => base.unassign(job);
  const jobSignal = base[job].bind(base);
  const maxKey = `${job}Max`;
  const maxSignal = base[maxKey].bind(base);
  return (
    <div>
      {title} <code>{jobSignal()}</code>/<code>{maxSignal()}</code>
      <Show when={jobSignal() < maxSignal() && base.worker() > 0}>
        <button onClick={assign}>Assign</button>
      </Show>
      <Show when={jobSignal() > 0}>
        <button onClick={unassign}>Unassign</button>
      </Show>
    </div>
  );
};

const Building = ({ base, building, title }) => {
  const build = (event) => base.build(building);
  return (
    <div>
      {title} <code>{base[building]()}</code> <pre>{JSON.stringify(base.buildCost(building))}</pre>
      <Show when={base.buildValid(building)}>
        <button onClick={build}>Build</button>
      </Show>
    </div>
  );
};

const Base = ({ base }) => {
  return (
    <>
      <div>Base {base.id}</div>
      <section>
        <Building base={base} building='house' title='House'></Building>
        <Building base={base} building='farm' title='Farm'></Building>
      </section>
      <section>
        <div>
          Worker <code>{base.worker()}</code>
        </div>
        <Job base={base} job='farmer' title='Farmer'></Job>
        <Job base={base} job='logger' title='Logger'></Job>
        <Job base={base} job='quarrier' title='Quarrier'></Job>
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
          Food <code>{state.food()}</code>/<code>{state.foodMax()}</code> (+<code>{state.foodRate()}</code> from workers, -<code>{state.eatRate()}</code> from
          population)
        </div>
        <div>
          Wood <code>{state.wood()}</code>/<code>{state.woodMax()}</code> (+<code>{state.woodRate()}</code> from workers)
        </div>
        <div>
          Stone <code>{state.stone()}</code>/<code>{state.stoneMax()}</code> (+<code>{state.stoneRate()}</code> from workers)
        </div>
      </section>

      <For each={state.bases()}>{(base) => <Base base={base}></Base>}</For>

      <For each={state.quests()}>{(quest) => <Quest quest={quest}></Quest>}</For>
    </>
  );
}

export default App;

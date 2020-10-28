import { render } from 'solid-js/dom';
import App from './App';

it('renders without crashing', () => {
  const app = document.createElement('div');
  const dispose = render(App, app);
  dispose();
});

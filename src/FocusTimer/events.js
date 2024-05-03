import state from './state.js'
import { controls, songs } from "./elements.js";
import * as actions from './actions.js'
import { updateDisplay } from "./timer.js";

export function registerEvents(){
  const eventHandler = (event) => {
    const action = event.target.dataset.action;
    if (typeof actions[action] === "function") {
      actions[action]();
    }
  };

  controls.addEventListener('click', eventHandler);
  songs.addEventListener('click', eventHandler);
}
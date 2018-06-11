import { createStore } from "redux";
import reducer from "./reducer";
import initial from "./initial";

const store = createStore(
  reducer,
  initial,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),);

let output1 = document.getElementById("player1");
let output2 = document.getElementById("player2");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let reset = document.getElementById("reset");
let winner = document.getElementById("winner");

// the type makes it unique even though you're calling the same function
score1.addEventListener("click", () => store.dispatch({ type: "player1" }));
score2.addEventListener("click", () => store.dispatch({ type: "player2" }));
reset.addEventListener("click", () => store.dispatch({ type: "reset" }));

let render = () => {
  let player1 = store.getState().player1;
  let player2 = store.getState().player2;
  let serving = store.getState().serving

  output1.textContent = player1;
  output2.textContent = player2;

  if (serving) {
    output1.classList.add("serving")
    output1.classList.remove("not-serving")
    output2.classList.add("not-serving")
    output2.classList.remove("serving")
  } else {
    output1.classList.remove("serving")
    output1.classList.add("not-serving")
    output2.classList.remove("not-serving")
    output2.classList.add("serving")
  }

  winner.textContent = store.getState().winner
}

store.subscribe(render);
render();

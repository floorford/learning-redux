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

// the who makes it unique even though you're calling the same function
score1.addEventListener("click", () => store.dispatch({ type: "score", who: "player1" }));
score2.addEventListener("click", () => store.dispatch({ type: "score", who: "player2" }));
reset.addEventListener("click", () => store.dispatch({ type: "reset" }));

let render = () => {
  let state = store.getState()
  let player1 = state.player1;
  let player2 = state.player2;
  let serving = state.serving

  // setting the output for the score
  output1.textContent = player1;
  output2.textContent = player2;

  // applying the classes for serving
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

  // setting the text content for the winner
  if (state.winner > 0) {
    winner.textContent = `Player ${state.winner} wins!`
    score1.style.display = "none"
    score2.style.display = "none"
  } else {
    winner.textContent = null
    score1.style.display = "inline-block"
    score2.style.display = "inline-block"
  }
}

store.subscribe(render);
render();

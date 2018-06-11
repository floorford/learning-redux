import initial from './initial.js'

let increasePlayerScore = (state, { type }) => {
  const stateCopy = {...state};

  stateCopy[type] += 1;

  let counter = stateCopy.player1 + stateCopy.player2

  if (Math.floor(counter / 5) % 2 === 0) {
    stateCopy.serving = true
  } else {
    stateCopy.serving = false
  }

  if (stateCopy.player1 >= 21 && stateCopy.player1 - stateCopy.player2 >=2) {
    stateCopy.winner = "Player 1 wins!"
  } else if (stateCopy.player2 >= 21 && stateCopy.player2 - stateCopy.player1 >=2) {
    stateCopy.winner = "Player 2 wins!"
  }

  return stateCopy;
}

const reducer = (state, action) => {
  switch (action.type) {
    case "player1": return increasePlayerScore(state, action);
    case "player2": return increasePlayerScore(state, action);
    case "reset": return initial;
    default: return state;
  }
};

export default reducer;

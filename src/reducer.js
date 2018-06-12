import initial from './initial.js'

//winning score
const aim = 21;

// increases the scores by 1 respectively
let increasePlayerScore = (state, { who }) => {
  return {
    ...state,
    [who]: state[who] + 1,
  };
};

// deciding who is serving
let server = state => {
  const stateCopy = {...state};
  const p1 = state.player1
  const p2 = state.player2

  let counter = p1 + p2

  if (p1 >= aim && p2 >= aim) {
    if (Math.floor(counter / 2) % 2 === 0) {
      stateCopy.serving = true
    } else {
      stateCopy.serving = false
    }
  } else {
    if (Math.floor(counter / 5) % 2 === 0) {
      stateCopy.serving = true
    } else {
      stateCopy.serving = false
    }
  }
  return stateCopy;
}

// deciding who wins
let winner = state => {
  const p1 = state.player1
  const p2 = state.player2

  return {
    ...state,
    winner: p1 >= aim && p1 - p2 >=2 ? 1 : p2 >= aim && p2 - p1 >=2 ? 2 : 0
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case "score": return winner(server(increasePlayerScore(state, action)));
    case "reset": return initial;
    default: return state;
  }
};

export default reducer;

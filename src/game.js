var GAME_STATE = {
    playerTurn: false,
    pattern: [],
    input: [],
    round: 2
}

function reset() {
    GAME_STATE.playerTurn = false;
    GAME_STATE.pattern = [];
    GAME_STATE.input = [];
    GAME_STATE.round = 2;
}

function showSquares(ids) {
    if (ids.length === 0) {
        GAME_STATE.playerTurn = true;
        console.log('Player turn!')
        return;
    };
    let el = document.getElementById(ids[0]);
    el.classList.add("highlight");
    setTimeout(() => {
        el.classList.remove("highlight");
        if (ids.length > 0) {
            setTimeout(() => showSquares(ids.slice(1)), 500);
        }
    }, 1000);
}

function pickKRandomSquares(n, k) {
    let squares = [];
    for (let i = 0; i < k; i++) {
        squares.push(Math.floor(Math.random() * n * n));
    }
    GAME_STATE.pattern = squares;
    console.log(GAME_STATE.pattern);
    return squares;
}

export { GAME_STATE, showSquares, pickKRandomSquares, reset }
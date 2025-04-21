console.log("Hello");

const chessboardTemplate = [ // You can pretend that these are HTML elements
    "A1", "A2", "A3", "A4",
    "B1", "B2", "B3", "B4",
    "C1", "C2", "C3", "C4",
    "D1", "D2", "D3", "D4",
];

/**
 * Takes in an array representing HTML elements in a chessboard, and returns a copy of the array with every other
 * element modified.
 */
function makeEveryOtherCellWhite(chessboard) {
    const copy = chessboard.slice(); // Create a shallow copy of the chessboard
    for (let i = 0; i < copy.length; i += 2) {
        copy[i] = "white";
    }
    return copy;
}

function makeEveryOtherCellRowLetter(chessboard) {
    const copy = chessboard.slice(); // Create a shallow copy of the chessboard
    for (let i = 0; i < copy.length; i += 2) {
        copy[i] = copy[i][0];
    }
    return copy;
}

function makeEveryOtherCellABg(chessboard) {
    const copy = chessboard.slice(); // Create a shallow copy of the chessboard
    for (let i = 0; i < copy.length; i += 2) {
        copy[i] = {backgroundColor: copy[i]} ;
    }
    return copy;
}

function modifyEveryOtherCell(chessboard, modFxn) {
    const copy = chessboard.slice(); // Create a shallow copy of the chessboard
    for (let i = 0; i < copy.length; i += 2) {
        copy[i] = modFxn(copy[i]);
    }
    return copy;
}

const replaceWithWhite = () => "white";
const replaceWithRowLetter = (str) => str[0];
const replaceWithBg = (str) => ({backgroundColor: str});
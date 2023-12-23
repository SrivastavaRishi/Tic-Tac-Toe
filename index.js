let cnt = 0;
let matrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const result = {
  ROW: 1,
  COL: 2,
  DIA_00: 3,
  DIA_20: 4,
  FALSE: 0,
};

const checkForWin = (curr, row, col) => {
  let win = true;
  for (let i = 0; i < 3; i++) {
    if (matrix[row][i] !== curr) {
      win = false;
    }
  }
  if (win) return result.ROW;
  win = true;
  for (let i = 0; i < 3; i++) {
    if (matrix[i][col] !== curr) {
      win = false;
    }
  }
  if (win) return result.COL;
  win = true;
  for (let i = 0; i < 3; i++) {
    if (matrix[i][i] !== curr) {
      win = false;
    }
  }
  if (win) return result.DIA_00;
  win = true;
  for (let i = 0; i < 3; i++) {
    if (matrix[i][2 - i] !== curr) {
      win = false;
    }
  }
  return win ? result.DIA_20 : result.FALSE;
};

const getBlockNamesFromResult = (winnerType, row, col) => {
  if (winnerType === result.ROW) {
    switch (row) {
      case 0:
        return ["block0", "block1", "block2"];
      case 1:
        return ["block3", "block4", "block5"];
      case 2:
        return ["block6", "block7", "block8"];
    }
  }
  if (winnerType === result.COL) {
    switch (col) {
      case 0:
        return ["block0", "block3", "block6"];
      case 1:
        return ["block1", "block4", "block7"];
      case 2:
        return ["block2", "block5", "block8"];
    }
  }
  if (winnerType === result.DIA_00) return ["block0", "block4", "block8"];
  return ["block2", "block4", "block6"];
};

const updateAndCheckMatrix = (className, txt) => {
  const id = className.charAt(5);
  const row = parseInt(id / 3),
    col = id % 3,
    curr = txt === "O" ? 1 : -1;
  if (matrix[row][col]) {
    alert("choose empty value");
    return "-1";
  }
  matrix[row][col] = curr;
  console.log(matrix);
  const matchResult = checkForWin(curr, row, col);
  if (matchResult) {
    const winner = "Player " + (cnt & 1 ? "Two" : "One") + " won";
    document.getElementById("win-button").innerHTML = winner;
    const blockNames = getBlockNamesFromResult(matchResult, row, col);
    blockNames.map(
      (block) =>
        (document.getElementsByClassName(block)[0].className = "winner")
    );
  }
  return matchResult;
};

const handleClick = (className) => {
  const kk = document.getElementsByClassName(className)[0];
  const txt = cnt & 1 ? "O" : "X";
  const res = updateAndCheckMatrix(className, txt);
  if (res != -1) {
    kk.innerHTML = txt;
    cnt++;
  }
  console.log("Clicked !!", className, cnt, res);
};

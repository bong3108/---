const gameboard = document.querySelector("#gameboard");
const info = document.querySelector("#info");
const startCells = ["", "", "", "", "", "", "", "", ""];

//처음 순서
let go = "circle";
info.textContent = "Circle 먼저 시작";

function createBoard() {
  startCells.forEach((_cell, index) => {
    //각각의 셀[9개]에 div태그 만들어서 클래스 square 추가 id 추가 클릭이벤트 추가해서
    //gameboard에 자식으로 붙임
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameboard.append(cellElement);
  });
}

createBoard();
function addGo(e) {
  console.log(e.target);
  //선택한 셀에 div태그 클래스 circle을 붙여서 붙임
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  info.textContent = go + "턴 입니다.";
  //한번 클릭한 곳은 다시 클릭이 안되도록
  e.target.removeEventListener("click", addGo);
  //승리체크
  checkScore();
}
function checkScore() {
  const allSquares = document.querySelectorAll(".square"); //모든 셀
  //이길 수 있는 3개의 연속좌표(가로,세로,대각선)
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      info.textContent = "Circle 승리!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      info.textContent = "Cross 승리!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
}

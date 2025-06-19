let fields = [null, null, null, null, null, null, null, null, null];
let currentShape = "circle";
let gameOver = false;

function init() {
  gameOver = false;
  render();
  document.getElementById("winner_message").textContent = "";
  document.getElementById("current_player").textContent = "Kreis am Zug";
}

function render() {
  const container = document.getElementById("container");
  let html = "<table>";

  for (let i = 0; i < 3; i++) {
    html += "<tr>";
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let symbol = "";

      if (fields[index] === "circle") {
        symbol = generateCircleSVG();
      } else if (fields[index] === "cross") {
        symbol = generateCrossSVG();
      }

      const clickHandler =
        fields[index] === null && !gameOver
          ? `onclick="handleClick(${index}, this)"`
          : "";
      html += `<td ${clickHandler}>${symbol}</td>`;
    }
    html += "</tr>";
  }

  html += "</table>";
  container.innerHTML = html;
}

function handleClick(index, tdElement) {
  if (fields[index] !== null || gameOver) return;

  fields[index] = currentShape;

  tdElement.innerHTML =
    currentShape === "circle" ? generateCircleSVG() : generateCrossSVG();
  tdElement.onclick = null;

  if (checkWinner(currentShape)) {
    document.getElementById("winner_message").textContent =
      (currentShape === "circle" ? "Kreis" : "Kreuz") + " gewinnt!";
    gameOver = true;
    return;
  }

  if (fields.every((f) => f !== null)) {
    document.getElementById("winner_message").textContent = "Unentschieden!";
    gameOver = true;
    return;
  }

  currentShape = currentShape === "circle" ? "cross" : "circle";
  updateCurrentPlayer();
}

function checkWinner(shape) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) =>
    pattern.every((index) => fields[index] === shape)
  );
}

function updateCurrentPlayer() {
  const playerText = currentShape === 'circle' ? "Kreis ist am Zug" : "Kreuz ist am Zug";
  document.getElementById("current_player").innerHTML = playerText;
}

function resetGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentShape = "circle";
  init();
}

function generateCrossSVG() {
  return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
          <line x1="10" y1="10" x2="60" y2="60" stroke="#00be0f" stroke-width="6"
                stroke-linecap="round"
                stroke-dasharray="70" stroke-dashoffset="70">
            <animate attributeName="stroke-dashoffset" from="70" to="0" dur="0.6s" fill="freeze" />
          </line>
          <line x1="60" y1="10" x2="10" y2="60" stroke="#00be0f" stroke-width="6"
                stroke-linecap="round"
                stroke-dasharray="70" stroke-dashoffset="70">
            <animate attributeName="stroke-dashoffset" from="70" to="0" dur="0.6s" fill="freeze" begin="0.3s" />
          </line>
        </svg>
      `;
}

function generateCircleSVG() {
  return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="35" r="25"
                  stroke="#00B0EF" stroke-width="6"
                  fill="none"
                  stroke-dasharray="157" stroke-dashoffset="157">
            <animate attributeName="stroke-dashoffset" from="157" to="0" dur="0.6s" fill="freeze" />
          </circle>
        </svg>
      `;
}

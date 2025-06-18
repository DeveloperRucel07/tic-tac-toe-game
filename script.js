let fields = ['circle', 'circle', 'circle', null, null, null, 'cross', 'cross', null];
function init(){
    render();
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
        symbol = "O";
      } else if (fields[index] === "cross") {
        symbol = "X"; 
      }

      html += `<td>${symbol}</td>`;
    }
    html += "</tr>";
  }

  html += "</table>";
  container.innerHTML = html;
}


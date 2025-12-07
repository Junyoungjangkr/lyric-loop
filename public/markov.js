let ws = new WebSocket(`ws://${window.location.hostname}:3000`);
let output = document.getElementById("lyrics");

let words = ["Live", "on,", "endure,", "row", "with", "all", "your", "strength."];

function speak(text) {
  if ('speechSynthesis' in window) {
    let utter = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utter);
  }
}

function generateLine(prevLine) {
  let line = "";
  for (let i = 0; i < 6; i++) {
    line += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return line;
}

ws.onmessage = event => {
  let line = event.data;
  output.textContent += "Received: " + line + "\n";
  speak(line);

  let newLine = generateLine(line);
  setTimeout(() => {
    output.textContent += "Sent: " + newLine + "\n";
    speak(newLine);
    ws.send(newLine);
  }, 3000);
};

function startLoop() {
  let line = generateLine("");
  output.textContent += "Sent: " + line + "\n";
  speak(line);
  ws.send(line);
}


var currentRow = 0;

document.getElementById("button-up").onclick = onUpButtonPressed;
document.getElementById("button-down").onclick = onDownButtonPressed;
document.getElementById("pi-digits-list").onselect = logSelection;

function onUpButtonPressed()  {
    currentRow = Math.max(0, currentRow-5);
    var textView = document.getElementById("pi-digits-list");
    textView.scrollTop = currentRow * 25;
}

function onDownButtonPressed()  {
    currentRow = currentRow+5;
    var textView = document.getElementById("pi-digits-list");
    textView.scrollTop = currentRow * 25;
}

function logSelection(event) {
  const selection = event.target.value.substring(
    event.target.selectionStart,
    event.target.selectionEnd,
  );
  alert(`You selected: ${selection}`);
}
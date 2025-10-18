
var currentRow = 0;

document.getElementById("button-up").onclick = onUpButtonPressed;
document.getElementById("button-down").onclick = onDownButtonPressed;
document.getElementById("pi-digits-list").onselect = onSelectDigits;

document.getElementById("pi-digits-list").focus();
document.getElementById("pi-digits-list").setSelectionRange(2, 8);

var selectedDateText = document.getElementById("selected-date");

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

function onSelectDigits(event) {
  const selection = event.target.value.substring(
    event.target.selectionStart,
    event.target.selectionEnd,
  );
  
  var days = selection.substring(0,2);
  var months = selection.substring(2,4);
  var years = selection.substring(4);

  var dateString = days + "/" + months + "/" + years;

  if (true) {
    selectedDateText.innerText = dateString;
  } else {
    alert(`Invalid date: ${selection}`);
  }
}

var currentRow = 0;

// Button interactions
document.getElementById("button-up").onclick = onUpButtonPressed;
document.getElementById("button-down").onclick = onDownButtonPressed;

var piDigitsList = document.getElementById("pi-digits-list");

fetch("digits.txt").then((response)=>{
    return response.text();
}).then((text)=>{
    piDigitsList.innerHTML = text;
});

piDigitsList.onselect = onSelectDigits;
piDigitsList.onclick = onSelectDigits;
piDigitsList.focus();
piDigitsList.setSelectionRange(2, 8);

var selectedDateText = document.getElementById("selected-date");
var selectedDateFeedbackText = document.getElementById("selected-date-feedback");

function onUpButtonPressed()  {
    piDigitsList.scrollTop = Math.max(0, piDigitsList.scrollTop-piDigitsList.clientHeight);
}

function onDownButtonPressed()  {
    piDigitsList.scrollTop = Math.min(piDigitsList.scrollHeight-piDigitsList.clientHeight, piDigitsList.scrollTop+piDigitsList.clientHeight);
}

function onSelectDigits(event) {
  const selection = event.target.value.substring(
    event.target.selectionStart,
    event.target.selectionEnd,
  );

  if (selection.length != 6) {
    piDigitsList.setSelectionRange(event.target.selectionStart, event.target.selectionStart+6);
  }

  // Date is assumed to have format DD/MM/YY:
  var days = selection.substring(0,2);
  var months = selection.substring(2,4);
  var years = selection.substring(4);
  years = parseInt(years) >= 70 ? "19"+years : "20"+years

  var dateString = days + "/" + months + "/" + years;
  selectedDateText.innerText = dateString;

  if (isDateValid(days, months, years)) {
    selectedDateFeedbackText.innerText = "Is this correct?"
  } else {
    selectedDateFeedbackText.innerText = "Please input a valid date in format DD/MM/YY."
  }

  function isDateValid(days, months, years) {
    var date = new Date(`${years}/${months}/${days}`);
    return !isNaN(date);
  }

}



// Button interactions
document.getElementById("button-up").onclick = onUpButtonPressed;
document.getElementById("button-down").onclick = onDownButtonPressed;

var piDigitsList = document.getElementById("pi-digits-list");

let reader;
let decoder;
let done = false;
let buffer = "";          // store leftover decoded text
const chunkSize = 500;    // number of characters to display per click

async function initReader(filename) {
  const response = await fetch(filename);
  reader = response.body.getReader();
  decoder = new TextDecoder();
}

async function readNextChunk() {
  if (done && buffer.length === 0) {
    piDigitsList.textContent += '\n[End of file]';
    return;
  }

  // Keep filling buffer until we have enough characters or reach EOF
  while (!done && buffer.length < chunkSize) {
    const { value, done: streamDone } = await reader.read();
    if (value) buffer += decoder.decode(value, { stream: true });
    done = streamDone;
  }

  // If we reached EOF, flush any remaining bytes from decoder
  if (done) buffer += decoder.decode();

  // Output up to chunkSize characters
  const outputChunk = buffer.slice(0, chunkSize);
  buffer = buffer.slice(chunkSize);

  piDigitsList.textContent += outputChunk;
}

// Initialize and load first chunk
initReader('digits.txt')
  .then(readNextChunk)
  .catch(err => {
    piDigitsList.textContent = 'Error: ' + err;
  });


// Add "Load more" button functionality

document.getElementById('button-up').disabled = true;

piDigitsList.onselect = onSelectDigits;
piDigitsList.onclick = onSelectDigits;
piDigitsList.focus();
piDigitsList.setSelectionRange(2, 8);

var selectedDateText = document.getElementById("selected-date");
var selectedDateFeedbackText = document.getElementById("selected-date-feedback");

function onUpButtonPressed()  {
    piDigitsList.scrollTop = Math.max(0, piDigitsList.scrollTop-piDigitsList.clientHeight);
    if (piDigitsList.scrollTop == 0) document.getElementById('button-up').disabled = true;
    document.getElementById('button-down').disabled = false;
}

function onDownButtonPressed()  {
    piDigitsList.scrollTop = Math.min(piDigitsList.scrollHeight-piDigitsList.clientHeight, piDigitsList.scrollTop+piDigitsList.clientHeight);
    readNextChunk();
    
    if (piDigitsList.scrollTop >= piDigitsList.scrollHeight - piDigitsList.clientHeight) document.getElementById('button-down').disabled = true;
    document.getElementById('button-up').disabled = false;
}

function onSelectDigits(event) {
  const selection = event.target.value.substring(
    event.target.selectionStart,
    event.target.selectionEnd,
  );

  /*if (selection.length != 6) {
    piDigitsList.setSelectionRange(event.target.selectionStart, event.target.selectionStart+6);
  }*/

  var days = "01";
  var months = "01";
  var years = "2025";
  if (selection.length < 2) {
    selectedDateFeedbackText.style.color = '#000000';
    selectedDateFeedbackText.innerText = "Select substring representing your date in PI2, PI3, PI4, PI6, or PI8 format.";
    selectedDateText.innerText = "DD/MM/YYYY";
    return;
  } else if (selection.length == 2) {
    days = selection.substring(0,1);
    months = selection.substring(1,2);
  } else if (selection.length == 3) {
    days = selection.substring(0,1);
    months = selection.substring(1,3);
    var option1 = isDateValid(days, months, years);
    days = selection.substring(0,2);
    months = selection.substring(2,3);
    var option2 = isDateValid(days, months, years);
    if (option1 && option2) {
      selectedDateFeedbackText.style.color = '#ff0033';
      selectedDateFeedbackText.innerText = `PI-${event.target.selectionStart}:${selection.length} cannot implicitly be converted to PI${selection.length}.`;
      return;
    } else  if (option1 || option2) {
      if (option1) {
        days = selection.substring(0,1);
        months = selection.substring(1,3);
      }
    }
  } else if (selection.length == 4) {
    days = selection.substring(0,2);
    months = selection.substring(2,4);
  } else if (selection.length == 6 || selection.length == 8) {
    // Date is assumed to have format DD/MM/YY or DD/MM/YYYY
    days = selection.substring(0,2);
    months = selection.substring(2,4);
    years = selection.substring(4);
    if (years.length == 2) years = parseInt(years) >= 70 ? "19"+years : "20"+years
  } else  {
    selectedDateFeedbackText.style.color = '#ff0033';
    selectedDateFeedbackText.innerText = `PI${selection.length} standard is currently not supported.`;
    selectedDateText.innerText = "DD/MM/YYYY";
    return;
  }

  selectedDateText.innerText = days.padStart(2,"0") + "/" + months.padStart(2,"0") + "/" + years;
  if (isDateValid(days, months, years)) {
    selectedDateFeedbackText.style.color = '#000000';
    selectedDateFeedbackText.innerText = `Your date is stored as PI${selection.length}-${event.target.selectionStart}.`;
  } else {
    selectedDateFeedbackText.style.color = '#ff0033';
    selectedDateFeedbackText.innerText = `PI${selection.length}-${event.target.selectionStart} is invalid PI${selection.length} date.`;
  }

  function isDateValid(days, months, years) {
    var date = new Date(`${years}/${months}/${days}`);
    return !isNaN(date);
  }

}


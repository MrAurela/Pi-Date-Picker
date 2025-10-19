
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
document.getElementById('button-down').addEventListener('click', readNextChunk);

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
    if (piDigitsList.scrollTop >= piDigitsList.scrollHeight - piDigitsList.clientHeight) document.getElementById('button-down').disabled = true;
    document.getElementById('button-up').disabled = false;
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


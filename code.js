
var charactersLoaded = 1000;

// Button interactions
document.getElementById("button-up").onclick = onUpButtonPressed;
document.getElementById("button-down").onclick = onDownButtonPressed;

var piDigitsList = document.getElementById("pi-digits-list");

let reader;        // The stream reader
let decoder;       // Text decoder
let done = false;  // Whether we've reached the end
const chunkSize = 500; // Approximate number of characters per click

async function initReader(filename) {
  const response = await fetch(filename);
  reader = response.body.getReader();
  decoder = new TextDecoder();
}

async function readNextChunk() {
  if (done) {
    piDigitsList.textContent += '\n[End of file]';
    return;
  }

  let text = '';
  while (!done && text.length < chunkSize) {
    const { value, done: streamDone } = await reader.read();
    if (value) text += decoder.decode(value, { stream: true });
    done = streamDone;
  }

  piDigitsList.textContent += text.slice(0, chunkSize);
}

// Initialize reader and load first chunk
initReader('digits.txt')
  .then(() => readNextChunk())
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


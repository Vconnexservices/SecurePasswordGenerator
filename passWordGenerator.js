// Get all Element in HTML
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const lowerCaseEl = document.getElementById("lowercase");
const upperCaseEl = document.getElementById("uppercase");
const numberCaseEl = document.getElementById("numberCase");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");
const commonWordEl = document.getElementById("commonWord");
const clipBoardEl = document.getElementById("clipboard");
const clearEl = document.getElementById("clear");
const dStrengthBarEl = document.getElementById("passwordStrengthBar");

// Object To call a Function
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbols: getRandomSymbols,
  commonWords: getCommonWord,
};

// Click Event For pass Word Generator
generateEl.addEventListener("click", () => {
  const length = lengthEl.value;
  const hasLower = lowerCaseEl.checked;
  const hasUpper = upperCaseEl.checked;
  const hasNumber = numberCaseEl.checked;
  const hasSymbol = symbolEl.checked;
  const word = commonWordEl.value;

  resultEl.value = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length,
    word
  );
});

// Password Generator Function
function generatePassword(lower, upper, number, symbols, length, commonWords) {
  let generatedPassword = "";

  // Number of check box checked in to generate password
  const typesCount = lower + upper + symbols + number;

  const typesArrary = [
    { lower },
    { upper },
    { number },
    { symbols },
    { commonWords },
  ].filter((item) => Object.values(item)[0]);

  // Return empty when length is zero
  if (typesCount === 0) {
    return "";
  } else {
    document.getElementById("passwordSt").style.display = "block";
  }

  // code for password strength checker.
  if (length > 0) {
    switch (typesCount) {
      case 1:
        document.getElementById("passwordStrengthBar").style.width = "20%";
        document.getElementById("passwordStrengthBar").style.backgroundColor =
          "#f95d9b7d";
        dStrengthBarEl.innerHTML = "Poor";
        break;
      case 2:
        document.getElementById("passwordStrengthBar").style.width = "40%";
        document.getElementById("passwordStrengthBar").style.backgroundColor =
          "#f95d9b7d";
        dStrengthBarEl.innerHTML = "Weak";
        break;
      case 3:
        if (length >= 8) {
          document.getElementById("passwordStrengthBar").style.width = "75%";
        } else {
          document.getElementById("passwordStrengthBar").style.width = "60%";
        }
        document.getElementById("passwordStrengthBar").style.backgroundColor =
          "#a4d610ad";
        dStrengthBarEl.innerHTML = "Average";
        break;
      case 4:
        if (length >= 8) {
          document.getElementById("passwordStrengthBar").style.width = "100%";
        } else {
          document.getElementById("passwordStrengthBar").style.width = "85%";
        }
        dStrengthBarEl.innerHTML = "Strong";
        document.getElementById("passwordStrengthBar").style.backgroundColor =
          "#a4d610ad";
        break;
      default:
        document.getElementById("passwordStrengthBar").style.width = "0%";
        break;
    }
  } else {
    document.getElementById("passwordSt").style.display = "none";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArrary.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

// Generate Lower Case Alphabet
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Generate Upper Case Alphabet
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Generate Number
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Generate Symbols
function getRandomSymbols() {
  const symbols = "!@#$%^&*()_+}{:?><";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Get Preferred Text
function getCommonWord() {
  var tempWord = commonWordEl.value;
  return tempWord;
}

// Function to Copy Generated password to clip board
clipBoardEl.addEventListener("click", () => {
  document.getElementById("showCopiedText").style.display = "block";
  const el = document.createElement("textarea");
  el.value = resultEl.value;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  setTimeout(function () {
    document.getElementById("showCopiedText").style.display = "none";
  }, 10000);
});

// Function to Clear Generated password to clip board
clearEl.addEventListener("click", () => {
  resultEl.value = "";
  document.getElementById("passwordSt").style.display = "none";
});

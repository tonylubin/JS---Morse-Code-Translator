const button = document.querySelector("#btn");
const inputBox = document.querySelector("#input-box");
const outputBox = document.querySelector("#output-box");
const selection = document.querySelectorAll("input[name='language']");

const englishAlphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  " ",
];

const morsecodeAlphabet = [
  ".-",
  "-...",
  "-.-.",
  "-..",
  ".",
  "..-.",
  "--.",
  "....",
  "..",
  ".---",
  "-.-",
  ".-..",
  "--",
  "-.",
  "---",
  ".--.",
  "--.-",
  ".-.",
  "...",
  "-",
  "..-",
  "...-",
  ".--",
  "-..-",
  "-.--",
  "--..",
  " ",
  "|",
];

//  Make a translator with 2 languages
class Translator {
  constructor(language1, language2) {
    this.language1 = language1;
    this.language2 = language2;
  }

  makeAlphabetCrossReference() {
    const arrOfCrossRef = this.language1.map((letter, index) => {
      let crossRefObj = {};
      crossRefObj[letter] = this.language2[index];
      return crossRefObj;
    });
    return arrOfCrossRef;
  }

  translation(splitExp, ifExp, ifExpReturn, joinExp) {
    // copy & convert array into object
    const newObj = Object.assign({}, ...this.makeAlphabetCrossReference());
    let wordsToTranslate = inputBox.value.split(splitExp); // expression ref. to sepeartor
    let conversion = wordsToTranslate.map((letter) => {
      if (letter === ifExp) {
        // expression ref. to seperator
        return (letter = ifExpReturn); // expression ref. to seperator
      } else {
        return (letter = newObj[letter]);
      }
    });

    outputBox.innerHTML = conversion.join(joinExp); // expression ref. to seperator
  }
};

// selection of language to translate
selection.forEach((radioBtn) => {
  radioBtn.addEventListener("click", (e) => {
    inputBox.value = "";
    outputBox.innerHTML = "";
    let translatorOption = e.currentTarget.value;
    console.log(e.currentTarget.value);

    // English --> Morse code
    if (translatorOption === "english") {
      const englishToMorseCode = new Translator(
        englishAlphabet,
        morsecodeAlphabet
      );
      button.addEventListener("click", () => {
        // button --> translate
        englishToMorseCode.translation("", " ", "|", " ");
      });
    }

    // Morse code --> English
    if (translatorOption === "morse") {
      const morseCodeToEnglish = new Translator(
        morsecodeAlphabet,
        englishAlphabet
      );
      button.addEventListener("click", () => {
        // button --> translate
        morseCodeToEnglish.translation(" ", "|", " ", "");
      });
    }
  });
});
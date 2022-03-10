const button = document.querySelector("button");
const inputBox = document.querySelector("input");
const outputBox = document.querySelector(".container__output-box");
const selection = document.querySelector("#options__language");
const container = document.querySelector(".container");

const englishAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"," "];
const morsecodeAlphabet = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", " ","|"];

//  Make a translator with 2 languages
class Translator {
    constructor(language1, language2) {
        this.language1 = language1;
        this.language2 = language2;
    }

    makeAlphabetCrossReference(){
        const arrOfCrossRef = this.language1.map((letter, index) => {
            let crossRefObj = {};
            crossRefObj[letter] = this.language2[index];
            return crossRefObj;
        });
        return arrOfCrossRef;
    }

    translation(splitExp,ifExp,ifExpReturn,joinExp){
        // copy & convert array into object
        const newObj = Object.assign({}, ...this.makeAlphabetCrossReference());
        let wordsToTranslate = inputBox.value.split(splitExp); // expression ref. to sepeartor
        let conversion = wordsToTranslate.map((letter) => {
            if(letter === ifExp){   // expression ref. to seperator
                return letter = ifExpReturn; // expression ref. to seperator
            } else {
                return letter = newObj[letter];
            } 
        });
        
        outputBox.innerHTML = conversion.join(joinExp); // expression ref. to seperator
    }
}

// selection of language to translate
selection.addEventListener("change", () => {
    inputBox.value = "";
    outputBox.innerHTML = "";

    // nodelist to check selected option on dropdown
    let translatorOptions = selection.options[selection.selectedIndex].value;
    
    // instance of "english to morse translator"
    if(translatorOptions === "english"){
        inputBox.placeholder = `Please type ${translatorOptions.toUpperCase()} here......`;
        const englishToMorseCode = new Translator(englishAlphabet, morsecodeAlphabet);
        button.addEventListener("click", () => {
            englishToMorseCode.translation("", " ", "|", " ");
        })
    }
    // instance of "morse to english translator"
    else if(translatorOptions === "morse code"){
        inputBox.placeholder = `Please type ${translatorOptions.toUpperCase()} here......`;
        const morseCodeToEnglish = new Translator(morsecodeAlphabet, englishAlphabet);
        button.addEventListener("click", () => {
            morseCodeToEnglish.translation(" ", "|" , " ", "");
        })
    }
});
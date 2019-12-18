/**
 * @param {string} str The text to copy to the clipboard
 *
 * @returns {void}
 *
 * @function
*/
function clipboard(str: string): void {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

/**
 * @class DomHandler
 * @classdesc Handles setting up event listeners and calling Password Generator
*/
class DomHandler {
  // The default state of the PasswordGeneratorOptions object
  public options: PasswordGeneratorOptions = {
    lower: true,
    upper: true,
    numbers: true,
    symbols: true,
    length: 32
  };

  constructor() {
    // Get all of the elements we will need
    const lowerCheck = document.getElementById('lower-check'),
          upperCheck = document.getElementById('upper-check'),
          numbersCheck = document.getElementById('numbers-check'),
          symbolsCheck = document.getElementById('symbols-check'),
          lengthInput = document.getElementById('length-input'),
          generateBtn = document.getElementById('generate-btn'),
          output = document.getElementById('output'),
          copyBtn = document.getElementById('copy-btn');

    // Check that we didn't miss anything
    if (lowerCheck && upperCheck && numbersCheck && symbolsCheck && lengthInput && generateBtn && output && copyBtn) {
      // Fill in the Dom with the default option values
      (<HTMLInputElement>lowerCheck).checked = this.options.lower;
      (<HTMLInputElement>upperCheck).checked = this.options.upper;
      (<HTMLInputElement>numbersCheck).checked = this.options.numbers;
      (<HTMLInputElement>symbolsCheck).checked = this.options.symbols;
      (<HTMLInputElement>lengthInput).value = this.options.length.toString();

      // Setup all of our options event listeners for changes
      lengthInput.addEventListener('change', (evt: any) => this.options.length = evt.target.value);
      lowerCheck.addEventListener('change', (evt: any) => this.options.lower = evt.target.checked);
      upperCheck.addEventListener('change', (evt: any) => this.options.upper = evt.target.checked);
      numbersCheck.addEventListener('change', (evt: any) => this.options.numbers = evt.target.checked);
      symbolsCheck.addEventListener('change', (evt: any) => this.options.symbols = evt.target.checked);

      // Call the clipboard function when the user clicks the copy icon
      copyBtn.addEventListener('click', () => {
        clipboard((<HTMLInputElement>output).value);
      });

      // Generate a new password when the user clicks the generate button
      generateBtn.addEventListener('click', () => {
        (<HTMLInputElement>output).value = PasswordGenerator.generate(this.options);
      });

      // Generate a starting password with the default options on init
      generateBtn.click();
    } else {
      // We couldn't find an element or more that we need
      throw new Error('Could not find all elements!');
    }
  }

};

/**
 * @interface
 *
 * @description The options object passed to PasswordGenerator's generate method
*/
interface PasswordGeneratorOptions {
  lower: boolean;
  upper: boolean;
  numbers: boolean;
  symbols: boolean;
  length: number;
}

/**
 * @class PasswordGenerator
 * @classdesc Provides the generate method to create new passwords
 * that match any restraints provided by the passed options
*/
class PasswordGenerator {
  /**
   * @param {PasswordGeneratorOptions} opts The options to constrain the password with
   *
   * @returns {string} The generated password
   *
   * @static
   *
   * @public
  */
  public static generate(opts: PasswordGeneratorOptions): string {
    let str: string = '';

    const availableTypes: Function[] = [];

    if (opts.lower) availableTypes.push(this.randomLower);
    if (opts.upper) availableTypes.push(this.randomUpper);
    if (opts.numbers) availableTypes.push(this.randomNumber);
    if (opts.symbols) availableTypes.push(this.randomSymbol);

    for (let i = 0, len = opts.length; i < len; i++) {
      str += availableTypes[Math.floor(Math.random () * availableTypes.length)]();
    }

    return str;
  }

  /**
   * @returns {string} A random lower case character
   *
   * @static
   *
   * @private
  */
  private static randomLower(): string {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  /**
   * @returns {string} A random upper case character
   *
   * @static
   *
   * @private
  */
  private static randomUpper(): string {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  /**
   * @returns {string} A random number as a character
   *
   * @static
   *
   * @private
  */
  private static randomNumber(): string {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  /**
   * @returns {string} A random symbol character from the symbols string
   *
   * @static
   *
   * @private
  */
  private static randomSymbol(): string {
    const symbols: string = '!@£$%^&*()_-=+#€,.<>/~{}[]';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

};

// Call DomHandler to setup and create a password to start with
new DomHandler();

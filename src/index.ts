function clipboard(str: string) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

class DomHandler {
  public options: PasswordGeneratorOptions = {
    lower: true,
    upper: true,
    numbers: true,
    symbols: true,
    length: 32
  };

  constructor() {
    const lowerCheck = document.getElementById('lower-check'),
          upperCheck = document.getElementById('upper-check'),
          numbersCheck = document.getElementById('numbers-check'),
          symbolsCheck = document.getElementById('symbols-check'),
          lengthInput = document.getElementById('length-input'),
          generateBtn = document.getElementById('generate-btn'),
          output = document.getElementById('output'),
          copyBtn = document.getElementById('copy-btn');

    if (lowerCheck && upperCheck && numbersCheck && symbolsCheck && lengthInput && generateBtn && output && copyBtn) {
      (<HTMLInputElement>lowerCheck).checked = this.options.lower;
      (<HTMLInputElement>upperCheck).checked = this.options.upper;
      (<HTMLInputElement>numbersCheck).checked = this.options.numbers;
      (<HTMLInputElement>symbolsCheck).checked = this.options.symbols;
      (<HTMLInputElement>lengthInput).value = this.options.length.toString();

      lengthInput.addEventListener('change', (evt: any) => this.options.length = evt.target.value);
      lowerCheck.addEventListener('change', (evt: any) => this.options.lower = evt.target.checked);
      upperCheck.addEventListener('change', (evt: any) => this.options.upper = evt.target.checked);
      numbersCheck.addEventListener('change', (evt: any) => this.options.numbers = evt.target.checked);
      symbolsCheck.addEventListener('change', (evt: any) => this.options.symbols = evt.target.checked);

      copyBtn.addEventListener('click', () => {
        clipboard((<HTMLInputElement>output).value);
      });

      generateBtn.addEventListener('click', () => {
        (<HTMLInputElement>output).value = PasswordGenerator.generate(this.options);
      });

      generateBtn.click();
    }
  }
  
};

interface PasswordGeneratorOptions {
  lower: boolean;
  upper: boolean;
  numbers: boolean;
  symbols: boolean;
  length: number;
}

export default class PasswordGenerator {
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

  private static randomLower(): string {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  private static randomUpper(): string {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  private static randomNumber(): string {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  private static randomSymbol(): string {
    const symbols: string = '!@£$%^&*()_-=+#€,.<>/~{}[]';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

};

new DomHandler();

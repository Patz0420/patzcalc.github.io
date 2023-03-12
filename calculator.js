class Calculator {
  constructor(previousDisplay, currentDisplay) {
    this.previousDisplay = previousDisplay
    this.currentDisplay = currentDisplay
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  operator(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let sum
    let prev = parseFloat(this.previousOperand)
    let current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        sum = prev + current
        break
      case '-':
        sum = prev - current
        break
      case '*':
        sum = prev * current
        break
      case '÷':
        sum = prev / current
        break
      default:
        return
    }
    this.currentOperand = sum
    this.operation = undefined
    this.previousOperand = ''
  };


  DisplayNum(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  displayUpdate() {
    this.currentDisplay.innerText =
      this.DisplayNum(this.currentOperand)
    if (this.operation != null) {
      this.previousDisplay.innerText =
        `${this.DisplayNum(this.previousOperand)} ${this.operation}`
    } else {
      this.previousDisplay.innerText = ''
    }
  }
}


let numberButtons = document.querySelectorAll('#number')
let operationButtons = document.querySelectorAll('#operation')
let equalButton = document.querySelector('#equals')
let deleteButton = document.querySelector('#delete')
let clearButton = document.querySelector('#ac')
let previousDisplay = document.querySelector('.previous-operand')
let currentDisplay = document.querySelector('.current-operand')


let calculator = new Calculator(previousDisplay, currentDisplay)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.displayUpdate()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.operator(button.innerText)
    calculator.displayUpdate()
  })
})

equalButton.addEventListener('click', button => {
  calculator.compute()
  calculator.displayUpdate()
})

clearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.displayUpdate()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.displayUpdate()
})



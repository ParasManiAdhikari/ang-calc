import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ang-calc';

  displayNumber: any = 0;
  funcT: any = '‎';
  calNumber: string = "noValue";
  firstNumber: number = 0;
  secondNumber: number = 0;
  
  onClickValue(val: string, type:any){
    if(type == 'number'){
      this.onNumberClick(val);
    }
    else if (type == 'function'){
      this.onFunctionClick(val);
    }
  }

  onNumberClick(val: string) {
    if (this.calNumber === 'noValue') {
      this.calNumber = val;
    } else {
      // Check if the current value already contains a decimal point
      if (val === '.' && this.calNumber.includes('.')) {
        return; // If it does, do nothing
      }
      this.calNumber = this.calNumber + val;
    }
    // Parse float instead of integer to allow decimal values
    if(val == '.'){
      this.displayNumber = this.calNumber
    } else this.displayNumber = parseFloat(this.calNumber);
}


  onFunctionClick(val:string){
    if(val == 'CE'){
      this.clearAll();
    } 
    else if(this.funcT == '‎'){
      this.firstNumber = this.displayNumber;
      this.calNumber = 'noValue';
      this.funcT = val;
    }
    else if(this.funcT != '‎'){
      this.secondNumber = this.displayNumber;
      this.valueCalculate(val);
    }
  }
  valueCalculate(val: string) {
    if(this.funcT == '+'){
      const Total = this.firstNumber + this.secondNumber
      this.totalAssignValues(Total, val);
    } 
    else if(this.funcT == '-'){
      const Total = this.firstNumber - this.secondNumber
      this.totalAssignValues(Total, val);
    } 
    else if(this.funcT == '*'){
      const Total = this.firstNumber * this.secondNumber
      this.totalAssignValues(Total, val);
    } 
    else if(this.funcT == '/'){
      const Total = this.firstNumber / this.secondNumber
      this.totalAssignValues(Total, val);
    } 
    else if(this.funcT == '%'){
      const Total = this.firstNumber % this.secondNumber
      this.totalAssignValues(Total, val);
    } 
  }

  totalAssignValues(Total: number, val: string){
    this.displayNumber = Total;
    this.firstNumber = Total;
    this.secondNumber = 0;
    this.calNumber = 'noValue';
    this.funcT = val;
    if(val == '='){this.onEqualPress()}
  }

  onEqualPress(){
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.funcT = '‎';
    this.calNumber = 'noValue';
  }

  clearAll(){
    this.displayNumber = 0;
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.funcT = '‎';
    this.calNumber = 'noValue';
  }
}

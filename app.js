//wait for DOMContent to load before launching the function that builds the calc
window.addEventListener('DOMContentLoaded', init);

//array of keys needed
const all = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '+', '0', '.', '-']; //all keys
const specialkeys = ['*', '/', '+', '-']; //special function keys

//everyting contained inside init
function init() {
  document.title = "JavaScript Calculator";
  console.log('ready');
  //switches to turn on and off
  let decimal = false;//decimal point('.')
  let evalSwitch = false;

  //visual body construction
  //interaction with DOM, updating styles and adding to page elements
  const container = document.createElement('div');
  container.classList.add('container');
  container.style.maxWidth = '600px';
  container.style.margin = 'auto';
  document.body.appendChild(container);
  const output = document.createElement('input');
  output.setAttribute('type', 'text');
  output.classList.add('output');
  output.style.width = '100%';
  output.style.lineHeight = '50px';
  output.style.fontSize = '3em';
  output.style.textAlign = 'right';
  container.appendChild(output);
  const main = document.createElement('div');
  main.classList.add('main');
  main.style.width = '100%';
  container.appendChild(main);

  //create buttons using loop through array items available
  all.forEach(function (val) {
    //console.log(val);
    btnGenerator(val, addOutput);
  })

  //special functions buttons
  btnGenerator('C', clearOutput);
  btnGenerator('=', evalOutput);


  function cOutput(v) {
    //function to handle errors
    output.style.border = v + ' 1px solid';
    output.style.color = v;
  }

  function evalOutput() {
    cOutput('black');
    console.log('=');
    if (output.value === "") {//output value must have a value
      cOutput('red');//throw error if no value
    }
    else if (evalSwitch) {//if spec pressed last, throw error
      cOutput('red');
    }
    else {
      output.value = eval(output.value);
    }
    if(decimal = false){
        cOutput('black');
    }
    else{
        decimal = output.value.includes('.')
    }
    // decimal = output.value.includes('.');
  }

  //clearing the output
  function clearOutput() {
    cOutput('black');
    output.value = "";
    if(decimal = false){
        cOutput('black');
    }
    else{
        decimal = output.value.includes('.')
    }
  }

  //button maker(consistency)
  function btnGenerator(text, btnFunction) {
    let btn = document.createElement('button');
    if (text=='0'){
        btn.setAttribute('type', 'button');
        btn.style.width = '48%';
        btn.style.lineHeight = '50px';
        btn.style.margin = '1%';
        btn.style.fontSize = '2em';
        btn.val = text;
        btn.textContent = text;
    }

    else if (text=='=' || text=='C' ){
        btn.setAttribute('type', 'button');
        btn.style.width = '48%';
        btn.style.lineHeight = '50px';
        btn.style.margin = '1%';
        btn.style.fontSize = '2em';
        btn.val = text;
        btn.textContent = text;
    }
    else{
        btn.setAttribute('type', 'button');
        btn.style.width = '23%';
        btn.style.lineHeight = '50px';
        btn.style.margin = '1%';
        btn.style.fontSize = '2em';
        btn.val = text;
        btn.textContent = text;
    }

    btn.addEventListener('click', btnFunction);//adding EventListener
    // btn.addEventListener("keypress", myEventHandler, false);
    main.appendChild(btn);//then added to main page

  }

  function addOutput(e) {
    console.log(decimal);
    cOutput('black');
    //console.log(e.target.val);
    //track char for decimal places (error-handling)
    let char = e.target.val;
    if (char == '.') {
      if (decimal) {
        char = '';
        cOutput('red');
      }
      else {
        decimal = true;
      }
    }
    evalSwitch = specialkeys.includes(char);
    if (evalSwitch) {
      decimal = false;
    }
    output.value += char;
  }

// function myEventHandler(e) {
//     var keyCode = e.keyCode;
//     console.log(e, keyCode, e.which)
// };

}

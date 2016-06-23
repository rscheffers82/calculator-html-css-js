// Javascript

// global vars
var MAX_DIGITS = 19;		// number
var numAndOps = [];			// collection of numbers and operators
var outcome;
//var dotExpected = false;

// input functions
$('.button').on("click", function(e) {
	var key = e.currentTarget.textContent;
	handleInput(key);
});

// keyin function

$('body').keypress(function(e){
	console.log(e.which);
	console.log(e);
	// Numbers 0 - 9
	if ( (e.which >= 48) && (e.which <= 57) ) handleInput(String.fromCharCode(e.which));
	if (e.which == 46) handleInput('.');	// .
	if (e.which == 43) handleInput('+');	// add
	if (e.which == 45) handleInput('-');	// subtract
	if (e.which == 42) handleInput('×');	// multiply
	if (e.which == 47) handleInput('÷');	// divide
	if (e.which == 13) handleInput('=');	// =
	if (e.which == 8) handleInput('C/CE');	// C/CE
});

// handling functions
var handleInput = function(val){
	switch (val) {
		//special cases
		case 'AC': 
			ac();
			break;
		case 'C/CE': 
			cce(); display();
			break;
		case '=': 
			if ( calculate() ) display();
			break;
		case '+/-': 
			if ( plus_minus() ) display();
			break;
		case '.': 
			if ( dotAllowed() ) display();
			break;
		// Operators
		case '+':
		case '-':
		case '×':
		case '÷':
			if ( validOperator(val) ) display()
			break;
		// numbers
		default: if ( validNumber(val) ) display();
		break;
	}
}

// validation functions //

var validOperator = function(operator){
	//console.log('valid operator', operator);
	// operator can only be added when there is are two spaces left
	// one of the operator and another for a number
	//if ( currentScreen.length == (MAX_DIGITS-2) ) return false
	
	// an operator must be proceeded by a number
	if ( numAndOps[numAndOps.length-1] == '' ) return false;

	// when valid handle the operator
	numAndOps.push(operator);					// add the operator into a new array element
	numAndOps[numAndOps.length] = '';
	return true;
}

var validNumber = function(val){
	console.log('valid number');
	// validation checks
	// if initial 0 is followed by a zero, cancel
	if ( (val === '0') && (numAndOps[numAndOps.length-1] === '0') ) return false;
	// if the inital 0 is present, remove it, from the array
	if ( (val > '0') && (numAndOps[numAndOps.length-1] === '0') ) numAndOps[numAndOps.length-1] = '';
	// when valid handle the number
	numAndOps[numAndOps.length-1] += val;		// add the value to the last element of the array 
	return true;
}

var dotAllowed = function() {
	console.log( /[.]/.test(numAndOps[numAndOps.length-1]) );
	// return false when a dot is already present
	if ( /[.]/.test(numAndOps[numAndOps.length-1]) ) return false;
	// last element of the array is assigned
	var currentInput = numAndOps[numAndOps.length-1];
	if (currentInput === '') return false; 
	// passed all checks, add . to the array and return true
	numAndOps[numAndOps.length-1] += '.';
	return true;
}

// display function

var display = function(){
	document.getElementById('display').textContent = numAndOps.join('');
	console.log(numAndOps);
}

// operator functions
var add = function(addMe){
	outcome += parseFloat(addMe);
	console.log(outcome);
}	

var subtract = function(subtractMe){
	outcome -= parseFloat(subtractMe);
	console.log(outcome);
}

var multiply = function(multiplyBy){
	outcome *= parseFloat(multiplyBy);
	console.log(outcome);
}

var divide = function(divideBy){
	outcome /= parseFloat(divideBy);
	console.log(outcome);
}

var plus_minus = function(){
	var replace = numAndOps[numAndOps.length-1];
	var replaceWith;

	// Operator check, the op procedure adds ''
	if ( replace == '' ) return false;
	replace = parseFloat(replace);

	// Proceed with a valid number
	if ( replace > 0 ) replaceWith = 0 - replace;
	else replaceWith = Math.abs(replace);

	// replace current value
	numAndOps[numAndOps.length-1] = replaceWith;
	console.log(numAndOps);
	return true;
}

var ac = function() {
	document.getElementById('display').textContent = '0';
	clear(true);			// clear_all
}

var cce = function() {
	// take the last input from the screen and clear it
	if ( numAndOps.length === 1 ) numAndOps[numAndOps.length-1] = '0';
	else numAndOps[numAndOps.length-1] = '';
}

var clear = function(all){
	// initialize / reset values
	numAndOps.length = 0;
	if ( all ) numAndOps[0] = '0';					// AC is pressed or initial start-up
	else numAndOps[0] = outcome.toString();			// used when = is pressed
	outcome = 0;
}

var calculate = function() {
	// When at least two numbers are available, proceed, else return
	if (numAndOps.length <= 2 ) return false;
	var op;
	var nextValue;
	// assign outcome with the first value
	outcome = parseFloat(numAndOps.shift());
	while (numAndOps.length > 0) {
		op = numAndOps.shift();
		nextValue = parseFloat(numAndOps.shift());
		switch(op){
			case '+': 
				add(nextValue);
				break;
			case '-': 
				subtract(nextValue);
				break;
			case '×':
				multiply(nextValue);
				break;
			case '÷':
				divide(nextValue);
				break;
		}
	}
	// dealing with large outcome

	// deal with large amount of digits after .

	// Reset app's main vars
	clear();
	return true;
}

// initialize values to start with a clean app
clear(true);

/*

function startSearch(e){
  if ( (e.keyCode || e.which) == 13 ) { //Enter keycode
    subject = $('#subject').val();

*/
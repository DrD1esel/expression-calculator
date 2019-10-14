function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  expr = expr.replace(/ /g,'');
	var numbers = expr.match(/\d+/g).reverse();
	var priorities = {'-':1, '+':1, '*':2, '/':2};		
	var output = [];
	var stack = [];
	var lastOperator;
	var values = [];
	
	expr.replace(/\d+/g,'D').split('').forEach(elem=>{	
		if (elem=='D') output.push(numbers.pop());
		else if (elem=='(') stack.push(elem);
		else if (elem==')'){
			var isFound=false;			
			while (stack.length>0){				
				var temp = stack.pop();				
				if (temp=='(') {
					isFound=true;
					break;
				}
				output.push(temp);
			}
			if (!isFound) throw new Error('ExpressionError: Brackets must be paired')
				
		} else {
			while (priorities[elem]<=priorities[lastOperator]){
				output.push(stack.pop());
				lastOperator=stack[stack.length-1]=='('?'':stack[stack.length-1];
			}
			stack.push(elem);		
		}
		lastOperator=stack[stack.length-1]=='('?'':stack[stack.length-1];
	})	
	
	stack.reverse().forEach(elem=>{		
		if (elem!='(') output.push(elem);
		else throw new Error('ExpressionError: Brackets must be paired')
	})
	
	output.forEach(elem=>{
			
		if ('+-*/'.indexOf(elem)!=-1){			
			var second=+values.pop();
			var first=+values.pop();			
			if (elem=='*') values.push(first*second)
			if (elem=='/'){
				if(second==0) throw new Error('TypeError: Division by zero.')
				else values.push(first/second)
			}
			if (elem=='+') values.push(first+second)
			if (elem=='-') values.push(first-second)
		} else values.push(elem);
	})	
	return values.pop();
}

module.exports = {
  expressionCalculator
}
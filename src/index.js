function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  expr = '(' + expr.replace(/ /gi, '') + ')';
  var brackets;

  while ((brackets = expr.match(/\([0-9.n\+\-\*\/]*\)/g)) != null) {
    for (var i = 0; i < brackets.length; i++) {
      var replacer = brackets[i]
      while (replacer.charAt(0) == '(' && replacer.charAt(replacer.length - 1) == ')') {
        replacer = replacer.substring(1, replacer.length - 1)
      }
      replacer.match(/[0-9.n\*\/]+/g).forEach(m => { replacer = replacer.replace(m, solve(m)) })
      replacer = solve(replacer)
      expr = expr.replace(brackets[i], replacer);
    }
  }

  function solve(simpleExpr) {

    var foi = simpleExpr.search(/[\/\*\-\+]/);


    if (foi == -1) return simpleExpr;
    if (simpleExpr.charAt(0) == 'n') simpleExpr = simpleExpr.replace('n', '-')

    var result = +simpleExpr.substring(0, foi)
    var operation = simpleExpr.charAt(foi)
    var second = ''

    for (var i = foi + 1; i < simpleExpr.length; i++) {
      var currChar = simpleExpr.charAt(i);

      if (currChar == 'n') second += '-';
      else if ('/*+-'.search(new RegExp("\\" + currChar)) != -1 || i == simpleExpr.length - 1) {

        if (i == simpleExpr.length - 1) second += currChar;
        if (operation == '/') {
          if (second == 0) throw "TypeError: Devision by zero."
          result /= second;
        }
        else if (operation == '*') result *= second;
        else if (operation == '+') result += (+second);
        else result -= second;
        second = ''
        operation = currChar;
      }
      else second += currChar;      
    }
    if (result < 0) result = 'n' + (-result);
    return result+'';

  }  
  if (expr.match(/[\)\(]+/)) throw "ExpressionError: Brackets must be paired"
  if (expr.charAt(0) == 'n') expr = expr.replace('n', '-')
  return +expr
}

module.exports = {
  expressionCalculator
}
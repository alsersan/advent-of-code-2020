const fs = require("fs");
const input = fs.readFileSync("./day18Input.txt").toString();

const test = "1 + 2 * 3 + 4 * 5 + 6";
const test2 = "5 + (8 * 3 + 9 + 3 * 4 * 3)";
const test3 = "2 * 3 + (4 * 5)";
const test4 = "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))";
const test5 = "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2";

const parseInput = (input) => {
  return input.trim().split("\n");
};

const expressions = parseInput(input);

// PART 1

const resolvePart1 = (expressions) => {
  let sum = 0;
  expressions.forEach((expression) => {
    let list = expression.replace(/ /g, "").split("");
    list = checkParentheses(list);
    sum += checkExpression(list);
  });
  return sum;
};

console.time("Part1");
const answer1 = resolvePart1(expressions);
console.timeEnd("Part1");
console.log(`Answer Part 1: ${answer1}`);

// PART 2

const resolvePart2 = (expressions) => {
  let sum = 0;
  expressions.forEach((expression) => {
    let list = expression.replace(/ /g, "").split("");
    list = checkParentheses(list, true);
    list = checkAddition(list);
    sum += checkExpression(list, true);
  });
  return sum;
};

console.time("Part2");
const answer2 = resolvePart2(expressions);
console.timeEnd("Part2");
console.log(`Answer Part 2: ${answer2}`);

// FUNCTIONS

function checkParentheses(expression, isPart2) {
  const copy = [...expression];
  let startIndex = undefined;
  let endIndex = undefined;
  for (let i = 0; i < expression.length; i++) {
    if (/\(/.test(expression[i])) startIndex = i;
    if (/\)/.test(expression[i])) {
      endIndex = i;
      break;
    }
  }
  if (endIndex) {
    const result = checkExpression(
      expression.slice(startIndex + 1, endIndex),
      isPart2
    );
    copy.splice(startIndex, endIndex - startIndex + 1, result.toString());
    const nextCheck = checkParentheses(copy, isPart2);
    return nextCheck;
  }
  return expression;
}

function checkAddition(expression) {
  const copy = [...expression];
  let operation = undefined;
  let index = 0;
  for (let i = 0; i < expression.length; i++) {
    if (/\+/.test(expression[i])) {
      operation =
        parseInt(expression[i - 1], 10) + parseInt(expression[i + 1], 10);
      index = i;
      break;
    }
  }
  if (operation) {
    copy.splice(index - 1, 3, operation.toString());
    const nextCheck = checkAddition(copy);
    return nextCheck;
  }
  return expression;
}

function checkExpression(expression, isPart2) {
  let exp = expression;
  if (isPart2) {
    exp = checkAddition(expression);
  }
  let operandA = 0;
  let operandB = 0;
  let operator = "";
  exp.forEach((el, index) => {
    if (/\d/.test(el) && index === 0) {
      operandA = parseInt(el, 10);
    } else if (/\+|\*/.test(el)) {
      operator = el;
    } else if (/\d/.test(el)) {
      operandB = parseInt(el, 10);
      operandA = calculate(operandA, operandB, operator);
    }
  });
  return operandA;
}

function calculate(a, b, operator) {
  if (operator === "+") {
    return a + b;
  } else {
    return a * b;
  }
}

const fs = require("fs");

const data = fs.readFileSync("./day6Input.txt").toString();
const input = data
  .trim()
  .split("\n\n")
  .map((el) => el.split("\n"));

const testData = `abc

a
b
c

ab
ac

a
a
a
a

b`;

const testInput = testData
  .trim()
  .split("\n\n")
  .map((el) => el.split("\n"));

console.log(testInput);

// Part 1

const getGroupInput = (group) => {
  const questions = new Map();

  group.forEach((el) => {
    for (const c of el) {
      if (questions.has(c)) {
        questions.set(c, questions.get(c) + 1);
      } else {
        questions.set(c, 1);
      }
    }
  });

  return questions.size;
};

const getAllAnsweredQuestions = (input) => {
  let answeredQuestions = 0;

  input.forEach((el) => (answeredQuestions += getGroupInput(el)));

  return answeredQuestions;
};

const answer = getAllAnsweredQuestions(testInput);
console.log(answer);

// Part 2

const getGroupInput2 = (group) => {
  const questions = new Map();

  group.forEach((el) => {
    for (const c of el) {
      if (questions.has(c)) {
        questions.set(c, questions.get(c) + 1);
      } else {
        questions.set(c, 1);
      }
    }
  });

  let answeredByAll = 0;
  for (let k of questions.keys()) {
    if (questions.get(k) === group.length) answeredByAll++;
  }

  return answeredByAll;
};

const getAllAnsweredQuestions2 = (input) => {
  let answeredQuestions = 0;

  input.forEach((el) => (answeredQuestions += getGroupInput2(el)));

  return answeredQuestions;
};

const answer2 = getAllAnsweredQuestions2(input);
console.log(answer2);

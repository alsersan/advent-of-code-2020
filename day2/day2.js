const fs = require("fs");

const data = fs.readFileSync("./day2Input.txt").toString();
const input = data.trim().split("\n");

const testInput = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

const validInput = [];

// Part1
const part1 = (input) => {
  input.forEach((item) => checkInput(item, isValidPart1));

  const answer = validInput.filter((element) => element === true).length;
  console.log(answer);
};

// part1(input);

// Part 2
const part2 = (input) => {
  input.forEach((item) => checkInput(item, isValidPart2));

  const answer = validInput.filter((element) => element === true).length;
  console.log(answer);
};

part2(input);

// Functions

function checkString(string, letter) {
  letterCount = 0;
  for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) === letter) letterCount++;
  }
  return letterCount;
}

function isValidPart1(min, max, password, letter) {
  const letterCount = checkString(password, letter);
  return letterCount >= min && letterCount <= max ? true : false;
}

function isValidPart2(pos1, pos2, password, letter) {
  if (password[pos1 - 1] === letter && password[pos2 - 1] !== letter) {
    return true;
  }
  if (password[pos1 - 1] !== letter && password[pos2 - 1] === letter) {
    return true;
  } else {
    return false;
  }
}

function checkInput(input, callback) {
  const splitInput = input.split(" ");
  const positions = splitInput[0].split("-");
  const pos1 = positions[0];
  const pos2 = positions[1];
  const password = splitInput[2];
  const letter = splitInput[1][0];

  validInput.push(callback(pos1, pos2, password, letter));
}

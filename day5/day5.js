const fs = require("fs");

const data = fs.readFileSync("./day5Input.txt").toString();
const input = data.trim().split("\n");

const testData = `FBFBBFFRLR
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;

const testInput = testData.trim().split("\n");

// Part 1

const checkInput1 = (input) => {
  let currentMax = 0;
  input.forEach((el) => {
    const ID = checkRow(el) * 8 + checkColumn(el);
    if (ID > currentMax) currentMax = ID;
  });
  return currentMax;
};

const answer1 = checkInput1(input);
console.log(answer1);

// Part2

const checkInput2 = (input) => {
  const arr = [];
  input.forEach((el) => {
    arr.push(checkRow(el) * 8 + checkColumn(el));
  });
  return arr.sort((a, b) => a - b);
};

const findSeat = (list) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i + 1] !== list[i] + 1) {
      return list[i] + 1;
    }
  }
};

const listOfSeats = checkInput2(input);
const answer2 = findSeat(listOfSeats);
console.log(answer2);

// Functions

function checkRow(input) {
  let min = 0;
  let max = 127;
  for (let i = 0; i < 7; i++) {
    if (input[i] === "F") {
      max = Math.floor(max - (max - min) / 2);
    } else if (input[i] === "B") {
      min = Math.ceil(min + (max - min) / 2);
    }
  }
  return min;
}

function checkColumn(input) {
  min = 0;
  max = 7;
  for (let i = 7; i < input.length; i++) {
    if (input[i] === "L") {
      max = Math.floor(max - (max - min) / 2);
    } else if (input[i] === "R") {
      min = Math.ceil(min + (max - min) / 2);
    }
  }
  return min;
}

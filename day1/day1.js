const fs = require("fs");

const testInput = [1721, 979, 366, 299, 675, 1456];
const data = fs.readFileSync("./day1Input.txt").toString();
const input = data.split("\n").map(Number);

// Part 1
const part1 = () => {
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] + input[j] === 2020) {
        return input[i] * input[j];
      }
    }
  }
};

// Part 2

const part2 = () => {
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      for (let x = 0; x < input.length; x++) {
        if (input[i] + input[j] + input[x] === 2020) {
          if (input[i] * input[j] * input[x] !== 0) {
            return input[i] * input[j] * input[x];
          }
        }
      }
    }
  }
};

console.log(part1());
console.log(part2());

const fs = require("fs");
const input = fs.readFileSync("./day9Input.txt").toString();

const testInput = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

const parseInput = (input, preambleLength) => {
  const data = input
    .trim()
    .split("\n")
    .map((el) => parseInt(el, 10));
  const preamble = data.slice(0, preambleLength);
  const numbers = data.slice(preambleLength);
  return [data, preamble, numbers];
};

const [data, preamble, numbers] = parseInput(input, 25);

// PART 1

const main1 = (preamble, numberList) => {
  let invalid = 0;
  for (const number of numberList) {
    for (const num of preamble) {
      if (preamble.includes(number - num)) {
        invalid = 0;
        break;
      }
      invalid = number;
    }
    preamble.shift();
    preamble.push(number);
    if (invalid !== 0) break;
  }
  return invalid;
};

console.time("Part1");
const answer1 = main1(preamble, numbers);
console.log(`Answer Part 1: ${answer1}`);
console.timeEnd("Part1");

// Part 2

const main2 = (data, number) => {
  let minIndex = 0;
  let maxIndex = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] >= number) continue;
    minIndex = i;
    let sum = 0;
    for (let j = i; j < data.length; j++) {
      sum += data[j];
      if (sum === number) {
        maxIndex = j;
        break;
      }
      if (sum > number) break;
    }
    if (sum === number) break;
  }
  const newArr = data.slice(minIndex, maxIndex + 1);
  return Math.min(...newArr) + Math.max(...newArr);
};

console.time("Part2");
const answer2 = main2(data, answer1);
console.log(`Answer Part 2: ${answer2}`);
console.timeEnd("Part2");

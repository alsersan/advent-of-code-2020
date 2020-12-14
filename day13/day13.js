const fs = require("fs");
const input = fs.readFileSync("./day13Input.txt").toString();

const testInput = `939
7,13,x,x,59,x,31,19`;

const parseInput = (input) => {
  const data = input.trim().split("\n");
  const timestamp = parseInt(data[0], 10);
  const IDs = data[1]
    .split(",")
    .map((el) => (el === "x" ? el : parseInt(el, 10)));
  return [timestamp, IDs];
};

const [timestamp, IDs] = parseInput(input);

// PART 1

const part1 = (timestamp, IDs) => {
  const fiteredIDs = IDs.filter((el) => el !== "x");
  const possible = [];
  fiteredIDs.forEach((ID) => {
    let multiplier = 2;
    let time = ID;
    do {
      time = ID * multiplier;
      multiplier++;
    } while (time < timestamp);
    possible.push(time);
  });
  const earliest = possible.sort((a, b) => a - b)[0];
  let ID = 0;
  for (let num of IDs) {
    if (earliest % num === 0) {
      ID = num;
      break;
    }
  }
  return (earliest - timestamp) * ID;
};
console.time("Part1");
const answer1 = part1(timestamp, IDs);
console.log(`Answer Part 1: ${answer1}`);
console.timeEnd("Part1");
// PART 2

// First approach. Too much processing time. Never got the answer.
const part2 = (IDs) => {
  const IDMap = new Map();
  IDs.forEach((el, index) => {
    if (index !== 0 && el !== "x") IDMap.set(index, el);
  });
  let IDarr = [];
  let multiplier = 2;
  let time = IDs[0];
  do {
    IDarr = [IDs[0]];
    time = IDs[0] * multiplier;
    multiplier++;
    for (let [key, value] of IDMap) {
      if ((time + key) % value === 0) IDarr.push(value);
    }
  } while (IDarr.length !== IDMap.size + 1);
  return time;
};

// Second approach. Instead of checking everything for each multiple of IDs[0], we only check
// increments which are also divisible by the previous numbers. Those increments are determined
// calculating the LCM of the already checked numbers.

const greatestCommonDivisor = (a, b) => {
  let R = 0;
  while (a % b > 0) {
    R = a % b;
    a = b;
    b = R;
  }
  return b;
};

const leastCommonMultiple = (a, b) => {
  const gdc = greatestCommonDivisor(a, b);
  return (a * b) / gdc;
};

const part2b = (IDs) => {
  const IDMap = new Map();
  IDs.forEach((el, index) => {
    if (index !== 0 && el !== "x") IDMap.set(index, el);
  });
  let increment = IDs[0];
  let time = IDs[0];
  for (let [key, value] of IDMap) {
    while ((time + key) % value !== 0) {
      time += increment;
    }
    increment = leastCommonMultiple(increment, value);
  }
  return time;
};

console.time("Part2");
const answer2 = part2b(IDs);
console.log(`Answer Part 2: ${answer2}`);
console.timeEnd("Part2");

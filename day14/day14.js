const fs = require("fs");
const input = fs.readFileSync("./day14Input.txt").toString();

const testInput = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

const testInput2 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;

const parseInput = (input) => {
  return input.trim().split("\n");
};

const program = parseInput(input);

// PART 1

const part1 = (program) => {
  let mask = [];
  const memory = new Map();
  program.forEach((el) => {
    if (/mask/.test(el)) {
      mask = el.split(/mask = /)[1].split("");
    } else {
      [address, value] = el.match(/\d+/g).map((el) => parseInt(el, 10));
      const binaryValue =
        "0".repeat(36 - value.toString(2).length) + value.toString(2);

      let operation = "";
      mask.forEach((bit, index) => {
        if (bit === "X") {
          operation += binaryValue[index];
        } else {
          operation += bit;
        }
      });
      memory.set(address, parseInt(operation, 2));
    }
  });
  let sum = 0;
  for (let value of memory.values()) {
    sum += value;
  }
  return sum;
};

console.time("Part1");
const answer1 = part1(program);
console.log(`Answer Part 1 : ${answer1}`);
console.timeEnd("Part1");

// PART 2

const part2 = (program) => {
  let mask = [];
  const memory = new Map();
  program.forEach((el) => {
    if (/mask/.test(el)) {
      mask = el.split(/mask = /)[1].split("");
    } else {
      [address, value] = el.match(/\d+/g).map((el) => parseInt(el, 10));
      const binaryAddress =
        "0".repeat(36 - address.toString(2).length) + address.toString(2);

      let addressList = [""];
      mask.forEach((bit, index) => {
        if (bit === "X") {
          addressList.forEach((el, index) => {
            addressList[index] = el + "0";
            addressList.push(el + "1");
          });
        } else if (bit === "0") {
          addressList.forEach(
            (el, idx) => (addressList[idx] = el + binaryAddress[index])
          );
        } else {
          addressList.forEach((el, idx) => (addressList[idx] = el + bit));
        }
      });
      addressList.forEach((address) => memory.set(parseInt(address, 2), value));
    }
  });
  let sum = 0;
  for (let value of memory.values()) {
    sum += value;
  }
  return sum;
};

console.time("Part2");
const answer2 = part2(program);
console.log(`Answer Part 2 : ${answer2}`);
console.timeEnd("Part2");

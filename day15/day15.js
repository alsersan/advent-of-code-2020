const testInput1 = `0,3,6`; // Answer P1: 436  |  Answer P2: 175594
const testInput2 = `1,3,2`; // Answer P1: 1    |  Answer P2: 2578
const testInput3 = `2,1,3`; // Answer P1: 10   |  Answer P2: 3544142
const testInput4 = `1,2,3`; // Answer P1: 27   |  Answer P2: 261214
const testInput5 = `2,3,1`; // Answer P1: 78   |  Answer P2: 6895259
const testInput6 = `3,2,1`; // Answer P1: 438  |  Answer P2: 18
const testInput7 = `3,1,2`; // Answer P1: 1836 |  Answer P2: 362
const input = `16,11,15,0,1,7`;

const parseInput = (input) => {
  return input.split(",").map((el) => parseInt(el, 10));
};

// PART 1, PART 2

const resolve = (input, count) => {
  const numbers = parseInput(input);
  const turns = new Map();

  let lastNum = 0;
  for (let i = 0; i < count; i++) {
    if (i < numbers.length) {
      if (i === 0) {
        lastNum = numbers[i];
      } else {
        turns.set(numbers[i - 1], i - 1);
        lastNum = numbers[i];
      }
    } else {
      if (turns.has(lastNum)) {
        const currentNum = i - 1 - turns.get(lastNum);
        turns.set(lastNum, i - 1);
        lastNum = currentNum;
      } else {
        turns.set(lastNum, i - 1);
        lastNum = 0;
      }
    }
  }
  return lastNum;
};

console.time("Part1");
const answer1 = resolve(input, 2020);
console.timeEnd("Part1");
console.log(`Answer Part 1: ${answer1}`);

console.time("Part2");
const answer2 = resolve(input, 30000000);
console.timeEnd("Part2");
console.log(`Answer Part 2: ${answer2}`);

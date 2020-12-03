const fs = require("fs");

const data = fs.readFileSync("./day3Input.txt").toString();
const input = data.trim().split("\n");

const testData = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

const testInput = testData.trim().split("\n");

let trees = 0;

// Part 1

const answerPart1 = checkPosition(input, 3, 1);
console.log(answerPart1);

// Part2

const part2 = () => {
  const answer1 = checkPosition(input, 1, 1);
  const answer2 = checkPosition(input, 5, 1);
  const answer3 = checkPosition(input, 7, 1);
  const answer4 = checkPosition(input, 1, 2);

  return answer1 * answer2 * answer3 * answer4 * answerPart1;
};

const answerPart2 = part2();
console.log(answerPart2);

// Functions

function checkPosition(input, right, down, inputIndex = 0, inputPosition = 0) {
  if (inputIndex === 0) trees = 0;
  if (input[inputIndex].charAt(inputPosition) === "#") {
    trees++;
  }

  let newInputPosition = inputPosition + right;

  if (newInputPosition >= input[inputIndex].length) {
    newInputPosition = newInputPosition - input[inputIndex].length;
  }

  let newInputIndex = inputIndex + down;

  if (newInputIndex < input.length) {
    checkPosition(input, right, down, newInputIndex, newInputPosition);
  }
  return trees;
}

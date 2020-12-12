const fs = require("fs");
const input = fs.readFileSync("./day11Input.txt").toString();

const testInput = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((el) => el.split(""));
};

// PART 1

const main1 = () => {
  const layout = parseInput(input);
  const answer = findOccupiedSeats(layout, changePlacePart1);
  console.log(`Ànswer Part 1: ${answer}`);
};
console.time("Part1");
main1();
console.timeEnd("Part1");

// PART 2

const main2 = () => {
  const layout = parseInput(input);
  const answer = findOccupiedSeats(layout, changePlacePart2);
  console.log(`Ànswer Part 2: ${answer}`);
};
console.time("Part2");
main2();
console.timeEnd("Part2");

// FUNCTIONS

function findOccupiedSeats(layout, callback) {
  let referenceLayout = [];
  let modifiedLayout = deepClone(layout);
  do {
    referenceLayout = deepClone(modifiedLayout);
    for (let i = 0; i < modifiedLayout.length; i++) {
      for (let j = 0; j < modifiedLayout[i].length; j++) {
        modifiedLayout[i][j] = callback(i, j, referenceLayout);
      }
    }
  } while (referenceLayout.toString() !== modifiedLayout.toString());
  return modifiedLayout
    .toString()
    .split(",")
    .filter((el) => el === "#").length;
}

function changePlacePart1(row, column, layout) {
  let occupiedSeats = 0;
  switch (layout[row][column]) {
    case ".":
      return ".";
    case "L":
      occupiedSeats = checkSeatPart1(row, column, layout);
      return occupiedSeats ? "L" : "#";
    case "#":
      occupiedSeats = checkSeatPart1(row, column, layout);
      return occupiedSeats >= 4 ? "L" : "#";
  }
}

function changePlacePart2(row, column, layout) {
  let occupiedSeats = 0;
  switch (layout[row][column]) {
    case ".":
      return ".";
    case "L":
      occupiedSeats = checkSeatPart2(row, column, layout);
      return occupiedSeats ? "L" : "#";
    case "#":
      occupiedSeats = checkSeatPart2(row, column, layout);
      return occupiedSeats >= 5 ? "L" : "#";
  }
}

function checkSeatPart1(row, column, layout) {
  return [
    [row - 1, column - 1],
    [row - 1, column],
    [row - 1, column + 1],
    [row, column - 1],
    [row, column + 1],
    [row + 1, column - 1],
    [row + 1, column],
    [row + 1, column + 1],
  ]
    .map((el) => {
      if (layout[el[0]] && !el.includes(-1)) {
        return layout[el[0]][el[1]];
      }
    })
    .filter((el) => el === "#").length;
}

function checkSeatPart2(row, column, layout) {
  return [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]
    .map((el) => {
      let pos = [row + el[0], column + el[1]];
      let location = ".";
      while (layout[pos[0]] && layout[pos[0]][pos[1]]) {
        if (layout[pos[0]][pos[1]] !== ".") {
          location = layout[pos[0]][pos[1]];
          break;
        }
        [pos[0], pos[1]] = [pos[0] + el[0], pos[1] + el[1]];
      }
      return location;
    })
    .filter((el) => el === "#").length;
}

function deepClone(array) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push([...array[i]]);
  }
  return newArray;
}

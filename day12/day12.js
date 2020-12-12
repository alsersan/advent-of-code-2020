const fs = require("fs");
const input = fs.readFileSync("./day12Input.txt").toString();

const testInput = `
F10
N3
F7
R90
F11`;

const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((el) => [el.substring(0, 1), parseInt(el.substring(1), 10)]);
};

const instructions = parseInput(input);

// PART 1

const part1 = (input) => {
  let northSouth = 0;
  let eastWest = 0;
  let direction = 90;
  input.forEach((el) => {
    switch (el[0]) {
      case "F":
        if (Math.abs(Math.sin((direction * Math.PI) / 180)) === 1) {
          Math.sin((direction * Math.PI) / 180) > 0
            ? (eastWest += el[1])
            : (eastWest -= el[1]);
        } else {
          Math.cos((direction * Math.PI) / 180) > 0
            ? (northSouth += el[1])
            : (northSouth -= el[1]);
        }
        break;
      case "N":
        northSouth += el[1];
        break;
      case "E":
        eastWest += el[1];
        break;
      case "W":
        eastWest -= el[1];
        break;
      case "S":
        northSouth -= el[1];
        break;
      case "R":
        direction += el[1];
        break;
      case "L":
        direction -= el[1];
        break;
      default:
        console.log("something went wrong");
    }
  });
  return Math.abs(northSouth) + Math.abs(eastWest);
};

const answer1 = part1(instructions);
console.log(`Answer Part 1: ${answer1}`);

// PART 2

const part2 = (input) => {
  let ship = [0, 0];
  const waypoint = [10, 1];
  input.forEach((el) => {
    switch (el[0]) {
      case "F":
        const move = [waypoint[0] * el[1], waypoint[1] * el[1]];
        [ship[0], ship[1]] = [ship[0] + move[0], ship[1] + move[1]];
        break;
      case "N":
        waypoint[1] += el[1];
        break;
      case "E":
        waypoint[0] += el[1];
        break;
      case "W":
        waypoint[0] -= el[1];
        break;
      case "S":
        waypoint[1] -= el[1];
        break;
      case "R":
        if (Math.abs(Math.sin((el[1] * Math.PI) / 180)) === 1) {
          Math.sin((el[1] * Math.PI) / 180) > 0
            ? ([waypoint[0], waypoint[1]] = [waypoint[1], waypoint[0] * -1])
            : ([waypoint[0], waypoint[1]] = [waypoint[1] * -1, waypoint[0]]);
        } else {
          Math.cos((el[1] * Math.PI) / 180) > 0
            ? undefined
            : ([waypoint[0], waypoint[1]] = [
                waypoint[0] * -1,
                waypoint[1] * -1,
              ]);
        }
        break;
      case "L":
        if (Math.abs(Math.sin((el[1] * Math.PI) / 180)) === 1) {
          Math.sin((el[1] * Math.PI) / 180) > 0
            ? ([waypoint[0], waypoint[1]] = [waypoint[1] * -1, waypoint[0]])
            : ([waypoint[0], waypoint[1]] = [waypoint[1], waypoint[0] * -1]);
        } else {
          Math.cos((el[1] * Math.PI) / 180) > 0
            ? undefined
            : ([waypoint[0], waypoint[1]] = [
                waypoint[0] * -1,
                waypoint[1] * -1,
              ]);
        }
        break;
      default:
        console.log("something went wrong");
    }
    console.log(ship, waypoint);
  });
  return Math.abs(ship[0]) + Math.abs(ship[1]);
};

const answer2 = part2(instructions);
console.log(`Answer Part 2: ${answer2}`);

const fs = require("fs");
const input = fs.readFileSync("./day8Input.txt").toString();

const testInput = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

const parseInputToMap = (input) => {
  const data = input.trim().split("\n");
  const map = new Map();
  data.forEach((el, index) => {
    const operation = el.split(" ")[0];
    const sign = el.split(" ")[1].match(/\D/)[0];
    const number = el.split(" ")[1].match(/\d+/)[0];
    map.set(index, [operation, sign, number]);
  });
  return map;
};

const visited = new Map();
const allOperations = parseInputToMap(input);

// PART 1

console.log(`Answer part 1: ${checkOperation(allOperations, 0, visited)}`);

// PART 2

const changeOperations = (map, visited) => {
  let accumulator = 0;
  for (let [key, value] of visited) {
    if (value === "acc") continue;

    const newValue = value === "jmp" ? "nop" : "jmp";
    const elements = [...map.get(key)];
    elements[0] = newValue;
    const newMap = new Map(map);
    newMap.set(key, elements);
    const newVisited = new Map();

    const acc = checkOperation(newMap, 0, newVisited, true);

    if (acc) {
      accumulator += acc;
      break;
    }
  }
  return accumulator;
};

console.log(`Answer Part 2: ${changeOperations(allOperations, visited)}`);

// Functions

function checkOperation(map, mapElement, visited, part2 = false) {
  let accumulator = 0;
  if (visited.has(mapElement) && part2) {
    accumulator = undefined;
  } else if (mapElement >= map.size) {
    return accumulator;
  } else if (!visited.has(mapElement)) {
    const operation = map.get(mapElement);
    visited.set(mapElement, operation[0]);
    switch (operation[0]) {
      case "acc":
        operation[1] === "+"
          ? (accumulator += parseInt(operation[2], 10))
          : (accumulator -= parseInt(operation[2], 10));
        accumulator += checkOperation(map, mapElement + 1, visited, part2);
        break;
      case "jmp":
        const newElement =
          operation[1] === "+"
            ? mapElement + parseInt(operation[2], 10)
            : mapElement - parseInt(operation[2], 10);

        accumulator += checkOperation(map, newElement, visited, part2);
        break;
      default:
        accumulator += checkOperation(map, mapElement + 1, visited, part2);
    }
  }
  return accumulator;
}

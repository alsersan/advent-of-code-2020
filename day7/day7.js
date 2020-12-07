const fs = require("fs");

const input = fs.readFileSync("./day7Input.txt").toString();

const testInput = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const parseInput = (input) => {
  const data = input.trim().split("\n");
  const keys = data.map((el) => el.split(/ bags/)[0]);
  const values = data.map((el) => el.match(/\d \w+ \w+/g));
  return [keys, values];
};

const [testKeys, testValues] = parseInput(testInput);
const [keys, values] = parseInput(input);

const createRulesMap = (keys, values) => {
  const map = new Map();
  keys.forEach((key, index) => map.set(key, values[index]));
  return map;
};

const colorRules = createRulesMap(keys, values);

// PART 1
const checkColor = (data, color, referenceColor) => {
  let counter = 0;
  if (visited1.has(color)) {
    return visited1.get(color);
  } else {
    const values = data.get(color);
    if (values) {
      values.forEach((value) => {
        const newColor = value.substring(2);
        if (newColor === referenceColor) counter++;
        counter += checkColor(data, newColor, referenceColor) ? 1 : 0;
      });
      const hasColor = counter ? true : false;
      visited1.set(color, hasColor);
      return hasColor;
    } else {
      return false;
    }
  }
};

const getAnswer1 = (map, referenceColor) => {
  for (let color of map.keys()) {
    if (!visited1.has(color)) {
      checkColor(map, color, referenceColor);
    }
  }
  let count = 0;
  visited1.forEach((value) => (value === true ? count++ : undefined));
  return count;
};

const visited1 = new Map();

const answer = getAnswer1(colorRules, "shiny gold");
console.log("Answer Part 1: " + answer);

// PART 2
const getAnswer2 = (data, color, referenceColor) => {
  let counter = 0;
  const values = data.get(color);
  if (values) {
    values.forEach((value) => {
      const newColor = value.substring(2);
      const numberOfBags = parseInt(value.match(/\d+/)[0], 10);
      counter += numberOfBags;
      counter += numberOfBags * getAnswer2(data, newColor, referenceColor);
    });
  }
  return counter;
};

const answer2 = getAnswer2(colorRules, "shiny gold", "shiny gold");
console.log("Answer Part 2: " + answer2);

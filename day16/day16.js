const fs = require("fs");
const input = fs.readFileSync("./day16Input.txt").toString();

const testInput = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

const testInput2 = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;

const parseInput = (input) => {
  const fields = input.trim().split("\n\n");
  const rules = fields[0].split("\n").map((el) => el.split(":"));
  rules.forEach(
    (el) =>
      ([el[1], el[2]] = el[1]
        .match(/\d+-\d+/g)
        .map((el) => el.split("-").map((num) => parseInt(num, 10))))
  );
  const ticket = fields[1]
    .split("\n")
    .slice(1)[0]
    .split(",")
    .map((num) => parseInt(num, 10));
  const nearby = new Set(
    fields[2]
      .split("\n")
      .slice(1)
      .map((el) => el.split(",").map((num) => parseInt(num, 10)))
  );
  return [rules, ticket, nearby];
};

const [rules, ticket, nearby] = parseInput(input);

// PART 1

const resolvePart1 = (rules, nearby) => {
  let sum = 0;
  const invalidTickets = new Set();
  for (let ticket of nearby) {
    for (let num of ticket) {
      let invalidCount = 0;
      for (let rule of rules) {
        if (
          !(
            (num >= rule[1][0] && num <= rule[1][1]) ||
            (num >= rule[2][0] && num <= rule[2][1])
          )
        )
          invalidCount++;
      }
      if (invalidCount === rules.length) {
        sum += num;
        invalidTickets.add(ticket);
      }
    }
  }
  const validTickets = new Set(
    [...nearby].filter((el) => !invalidTickets.has(el))
  );
  return [sum, validTickets];
};

console.time("Part1");
const [answer1, validTickets] = resolvePart1(rules, nearby);
console.timeEnd("Part1");
console.log(`Answer Part 1: ${answer1}`);

// PART 2

const resolvePart2 = (rules, ticket, nearby) => {
  const fields = new Map();
  while (fields.size < rules.length) {
    for (let i = 0; i < ticket.length; i++) {
      const validRulesCount = new Map();
      for (let ticket of nearby) {
        const num = ticket[i];
        for (let rule of rules) {
          if (
            (num >= rule[1][0] && num <= rule[1][1]) ||
            (num >= rule[2][0] && num <= rule[2][1])
          ) {
            validRulesCount.set(
              rule[0],
              (validRulesCount.get(rule[0]) || 0) + 1
            );
          }
        }
      }
      let count = [];
      for (let [key, value] of validRulesCount) {
        if (value === nearby.size && !fields.has(key)) count.push(key);
      }
      if (count.length === 1) fields.set(count[0], i);
    }
  }
  let multiplication = 1;
  for (let [key, value] of fields) {
    if (key.includes("departure")) multiplication *= ticket[value];
  }
  return multiplication;
};

console.time("Part2");
const answer2 = resolvePart2(rules, ticket, validTickets);
console.timeEnd("Part2");
console.log(`Answer Part 1: ${answer2}`);

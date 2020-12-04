const fs = require("fs");

const data = fs.readFileSync("./day4Input.txt").toString();
const input = data
  .trim()
  .split("\n\n")
  .map((el) => el.replace(/\n/g, " "));

const testData = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in;`;

const testInput = testData
  .trim()
  .split("\n\n")
  .map((el) => el.replace(/\n/g, " "));

// Part 1

const getFieldsPart1 = (input) => {
  return input.map((el) => el.split(" ").map((el) => el.split(":")[0]));
};

const checkFieldsPart1 = (input) => {
  let validPassports = 0;

  input.map((el) => {
    if (el.length === 8) {
      validPassports++;
    } else if (el.length === 7 && !el.includes("cid")) {
      validPassports++;
    }
  });

  return validPassports;
};

const fields = getFieldsPart1(input);
const answer = checkFieldsPart1(fields);
console.log(answer);

// Part 2

const getFieldsPart2 = (input) => {
  return input.map((el) => el.split(" ").map((el) => el.split(":")));
};

const checkFieldsPart2 = (input) => {
  let validPassports = 0;

  input.map((el) => {
    if (el.length === 8) {
      const firstCheck = el
        .map((el) => checkIndividualField(el))
        .filter((el) => el === false).length;
      if (firstCheck === 0) validPassports++;
    } else if (el.length === 7) {
      // Check if cid is not present
      if (!checkCidField(el)) {
        const secondCheck = el
          .map((el) => checkIndividualField(el))
          .filter((el) => el === false).length;
        if (secondCheck === 0) validPassports++;
      }
    }
  });

  return validPassports;
};

const fields2 = getFieldsPart2(input);
const answer2 = checkFieldsPart2(fields2);
console.log(answer2);

function checkCidField(input) {
  let hasCid;
  input.map((el) => {
    if (el[0] === "cid") hasCid = true;
  });
  return hasCid;
}

function checkIndividualField(field) {
  let isValid = false;

  switch (field[0]) {
    case "byr":
      isValid = checkDigits(field[1], 4, 1920, 2002);
      break;
    case "iyr":
      isValid = checkDigits(field[1], 4, 2010, 2020);
      break;
    case "eyr":
      isValid = checkDigits(field[1], 4, 2020, 2030);
      break;
    case "hgt":
      if (/^([\d]{3}cm|[\d]{2}in)$/.test(field[1])) {
        const hgt = field[1].match(/\d+/)[0];
        if (checkRange(hgt, 150, 193) || checkRange(hgt, 59, 76)) {
          isValid = true;
        }
      }
      break;
    case "hcl":
      isValid = /^#[a-f | \d]{6}$/.test(field[1]);
      break;
    case "ecl":
      ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].map((el) => {
        if (field[1] === el) isValid = true;
      });
      break;
    case "pid":
      isValid = checkDigits(field[1], 9);
      break;
    case "cid":
      isValid = true;
      break;
  }
  return isValid;
}

function checkDigits(number, length, min, max) {
  let isValid = false;
  if (number.length === length) isValid = true;
  if (min && max) isValid = checkRange(number, min, max);
  return isValid;
}

function checkRange(number, min, max) {
  const parsedNumber = parseInt(number, 10);
  return parsedNumber >= min && parsedNumber <= max;
}

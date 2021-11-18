import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2020;
const DAY = 2;

// solution path: /home/adam/src/advent-of-code/years/2020/02/index.ts
// data path    : /home/adam/src/advent-of-code/years/2020/02/data.txt
// problem url  : https://adventofcode.com/2020/day/2

async function p2020day2_part1(input: string, ...params: any[]) {
	const lines = input.split("\n").map(String);

	var count = 0;

	for (let i = 0; i < lines.length; i++) {
		// for each line, split it by space. 0 == min-max number of chars; 1 == char, 2 == password
		var item = lines[i].split(" ");
		//set min and max. each can be a 2 digit number
		var range = item[0].split("-").map(Number);
		//get character needed
		var chara = item[1].substr(0, 1);
		var re = new RegExp(chara, "g")
		var numReq = (item[2].match(re) || []).length;
		if (numReq >= range[0] && numReq <= range[1]) {
			count++;
		}
	}

	return count;
}

async function p2020day2_part2(input: string, ...params: any[]) {
	const lines = input.split("\n").map(String);

	var count = 0;

	for (let i = 0; i < lines.length; i++) {
		// for each line, split it by space. 0 == min-max number of chars; 1 == char, 2 == password
		var item = lines[i].split(" ");
		//set min and max. each can be a 2 digit number
		var range = item[0].split("-").map(Number);
		//get character needed
		var chara = item[1].substr(0, 1);
		var re = new RegExp(chara, "g");
		var p1 = item[2].substring(range[0] - 1, range[0]);
		var p2 = item[2].substring(range[1] - 1, range[1]);

		if ((p1 == chara || p2 == chara) && !(p1 == chara && p2 == chara)) {
			count++;
		}
		//var numReq = (item[2].match(re) || []).length;
		//if (numReq >= range[0] && numReq <= range[1]) {
		//	count++;
		//}
	}

	return count;
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2020day2_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2020day2_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day2_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day2_part2(input));
	const part2After = performance.now();
	
	logSolution(2, 2020, part1Solution, part2Solution);

	log(chalk.gray("--- Performance ---"));
	log(chalk.gray(`Part 1: ${util.formatTime(part1After - part1Before)}`));
	log(chalk.gray(`Part 2: ${util.formatTime(part2After - part2Before)}`));
	log();
}

run()
	.then(() => {
		process.exit();
	})
	.catch(error => {
		throw error;
	});

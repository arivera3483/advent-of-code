import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";
import { group } from "console";

const YEAR = 2021;
const DAY = 4;

// solution path: /home/adam/src/advent-of-code/years/2021/04/index.ts
// data path    : /home/adam/src/advent-of-code/years/2021/04/data.txt
// problem url  : https://adventofcode.com/2021/day/4

async function p2021day4_part1(input: string, ...params: any[]) {
	const groups = input.split("\n\n");
	for (const group of groups) {

		const numbers = group[0].split(',').map((item) => +item.trim());

		const lines = group.split("\n");
		for (const line of lines) {
			
		}
	}

	return "Not implemented";
}

async function p2021day4_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n\n22 13 17 11  0\n8  2 23  4 24\n21  9 14 16  7\n6 10  3 18  5\n1 12 20 15 19\n\n3 15  0  2 22\n9 18 13 17  5\n19  8  7 25 23\n20 11 10 24  4\n14 21 16 12  6\n\n14 21 17 24  4\n10 16 15  9 19\n18  8 23 26 20\n22 11 13  6  5\n\n2  0 12  3  7`,
		extraArgs: [],
		expected: `4512`
	}];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day4_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day4_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day4_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day4_part2(input));
	const part2After = performance.now();
	
	logSolution(4, 2021, part1Solution, part2Solution);

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

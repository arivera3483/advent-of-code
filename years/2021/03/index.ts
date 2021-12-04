import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 3;

// solution path: /home/adam/src/advent-of-code/years/2021/03/index.ts
// data path    : /home/adam/src/advent-of-code/years/2021/03/data.txt
// problem url  : https://adventofcode.com/2021/day/3

async function p2021day3_part1(input: string, ...params: any[]) {
	const lines = input.split("\n");

	let gamma = '';
	let epsilon = '';

	for (let i = 0; i < lines[0].length; i++) {
		const ones = lines.map((number) => number[i] === '1').filter((bit) => bit);
		if (ones.length >= lines.length / 2) {
			gamma += '1';
			epsilon += '0';
		} else {
			gamma += '0';
			epsilon += '1';
		}
	}
	return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

async function p2021day3_part2(input: string, ...params: any[]) {
	const lines = input.split("\n");

	let oxygensearch = lines;
	let scrubbersearch = lines;
	let idx = 0;

	while(oxygensearch.length > 1 || scrubbersearch.length > 1) {
		if (oxygensearch.length > 1) {
			const ones = oxygensearch
				.map((number) => number[idx] === '1')
				.filter((bit) => bit);
			oxygensearch = oxygensearch.filter(
				(number) => 
					number[idx] ===
					(ones.length >= oxygensearch.length / 2 ? '1' : '0'));
		}
		if (scrubbersearch.length > 1) {
			const ones = scrubbersearch
				.map((number) => number[idx] === '1')
				.filter((bit) => bit);
			scrubbersearch = scrubbersearch.filter(
				(number) =>
					number[idx] ===
					(ones.length >= scrubbersearch.length / 2 ? '0' : '1'));
		}
		idx++;
	}

	return parseInt(oxygensearch[0], 2) * parseInt(scrubbersearch[0], 2);
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010`,
		extraArgs: [],
		expected: `198`
	}];
	const part2tests: TestCase[] = [{
		input: `00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010`,
		extraArgs: [],
		expected: `230`
	}];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day3_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day3_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day3_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day3_part2(input));
	const part2After = performance.now();
	
	logSolution(3, 2021, part1Solution, part2Solution);

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

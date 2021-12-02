import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 2;

// solution path: /home/adam/src/advent-of-code/years/2021/02/index.ts
// data path    : /home/adam/src/advent-of-code/years/2021/02/data.txt
// problem url  : https://adventofcode.com/2021/day/2

async function p2021day2_part1(input: string, ...params: any[]) {
	const lines = input.split("\n");

	var depth = 0, distance = 0;

	for (const line of lines) {
		var pline = line.split(" ");
		var direction = pline[0];
		var units: number = +pline[1];

		switch(direction) {
			case "forward":
				distance += units;
				break;
			case "up":
				depth -= units;
				break;
			case "down":
				depth += units;
		}
	}

	return distance*depth;
}

async function p2021day2_part2(input: string, ...params: any[]) {
	const lines = input.split("\n");

	var depth = 0, distance = 0, aim = 0;

	for (const line of lines) {
		var pline = line.split(" ");
		var direction = pline[0];
		var units: number = +pline[1];

		switch(direction) {
			case "forward":
				distance += units;
				depth = depth + (aim * units);
				break;
			case "up":
				aim -= units;
				break;
			case "down":
				aim += units;
		}
	}

	return distance*depth;
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2`,
		extraArgs: [],
		expected: `150`
	}];
	const part2tests: TestCase[] = [{
		input: `forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2`,
		extraArgs: [],
		expected: `900`
	}];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day2_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day2_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day2_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day2_part2(input));
	const part2After = performance.now();
	
	logSolution(2, 2021, part1Solution, part2Solution);

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

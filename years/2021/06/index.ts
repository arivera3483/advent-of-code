import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 6;

// solution path: /home/adam/src/advent-of-code/years/2021/06/index.ts
// data path    : /home/adam/src/advent-of-code/years/2021/06/data.txt
// problem url  : https://adventofcode.com/2021/day/6

function updateFish(lanternfish: number[]){
	for (let i = 0; i < lanternfish.length; i++){
		if (lanternfish[i] == 0) {
			lanternfish[i] = 6;
			lanternfish.push(9);
		} else {
			lanternfish[i] -= 1;
		}
	}

	return lanternfish;
}

async function p2021day6_part1(input: string, ...params: any[]) {
	let myfish = input.split(",").map((number) => +number);
	let i = 0;
	for (i; i < 80; i++){
		updateFish(myfish);
	}
	return myfish.length;
}

async function p2021day6_part2(input: string, ...params: any[]) {
	let myfish = input.split(",").map((number) => +number);
	let i = 0;
	for (i; i < 256; i++){
		updateFish(myfish);
	}
	return myfish.length;
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `3,4,3,1,2`,
		extraArgs: [],
		expected: `5934`
	}];
	const part2tests: TestCase[] = [{
		input: `3,4,3,1,2`,
		extraArgs: [],
		expected: `26984457539`
	}];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day6_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day6_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day6_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day6_part2(input));
	const part2After = performance.now();
	
	logSolution(6, 2021, part1Solution, part2Solution);

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

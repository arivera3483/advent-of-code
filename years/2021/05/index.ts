import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 5;

// solution path: /home/adam/src/advent-of-code/years/2021/05/index.ts
// data path    : /home/adam/src/advent-of-code/years/2021/05/data.txt
// problem url  : https://adventofcode.com/2021/day/5

const range = (a: number, b?: number, step = 1): number[] => {
    const size = Math.ceil(b !== undefined ? (b - a) / step : a / step);
    const offset = b !== undefined ? a : 0;
    return [...Array(size).keys()].map(i => offset + i * step);
};

const scan = <T, X>(xs: Array<X>, seed: T, fn: (state: T, next: X) => T): T[] =>
    xs.reduce((states, x) => states.concat([fn(states[states.length - 1], x)]), [seed]);

const linePoints = ([[x1, y1], [x2, y2]]: number[][]): number[][] => {
    const incx = x1 < x2 ? 1 : x1 > x2 ? -1 : 0;
    const incy = y1 < y2 ? 1 : y1 > y2 ? -1 : 0;
    const size = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
    return scan(range(size), [x1, y1], ([x, y]) => [x + incx, y + incy]);
};

const overlaps = (lines: number[][][]): number => {
    const overlaps = new Map<string, number>();
    const points = lines.flatMap(l => linePoints(l));
    points.map(p => p.toString()).forEach(p => overlaps.set(p, (overlaps.get(p) || 0) + 1));
    return Array.from(overlaps.values()).filter(x => x >= 2).length;
};

async function p2021day5_part1(input: string, ...params: any[]) {
	const lines = input.split("\n");
	const linear = lines.map(l => l.split("->").map(p => p.split(",").map(x => parseInt(x))));
	const straight = linear.filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2);
	return overlaps(straight);
}

async function p2021day5_part2(input: string, ...params: any[]) {
	const lines = input.split("\n");
	const linear = lines.map(l => l.split("->").map(p => p.split(",").map(x => parseInt(x))));
	const straight = linear.filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2);
	return overlaps(linear);
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `0,9 -> 5,9\n8,0 -> 0,8\n9,4 -> 3,4\n2,2 -> 2,1\n7,0 -> 7,4\n6,4 -> 2,0\n0,9 -> 2,9\n3,4 -> 1,4\n0,0 -> 8,8\n5,5 -> 8,2`,
		extraArgs: [],
		expected: `5`
	}];
	const part2tests: TestCase[] = [{
		input: `0,9 -> 5,9\n8,0 -> 0,8\n9,4 -> 3,4\n2,2 -> 2,1\n7,0 -> 7,4\n6,4 -> 2,0\n0,9 -> 2,9\n3,4 -> 1,4\n0,0 -> 8,8\n5,5 -> 8,2`,
		extraArgs: [],
		expected: `12`
	}];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day5_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day5_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day5_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day5_part2(input));
	const part2After = performance.now();
	
	logSolution(5, 2021, part1Solution, part2Solution);

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

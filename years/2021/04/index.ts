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

interface BoardNumber {
    value: number;
    drawn: boolean;
}

type Board = BoardNumber[][];

function isBingo(board: Board): boolean {
    search: for (let i = 0; i < 5; i++) {
        if (board[i].findIndex((number) => !number.drawn) === -1) return true;
        for (let j = 0; j < 5; j++) {
            if (!board[j][i].drawn) continue search;
        }
        return true;
    }
    return false;
}

function allNotDrawn(board: Board): BoardNumber[] {
    return board.flat(2).filter((number) => !number.drawn);
}

function draw(board: Board, value: number): void {
    const match = board.flat(2).find((number) => number.value === value);
    if (match) match.drawn = true;
}

async function p2021day4_part1(input: string, ...params: any[]) {
	const groups = input.split("\r\n\r\n").map((item) => item.trim());
	const boards: Board[] = [];
	const numbers = groups[0].split(',').map((item) => +item.trim());

	for (const item of groups.slice(1)) {
		boards.push(
			item.split('\r\n').map((line) =>
				line
					.trim()
					.split(/\s+/)
					.map((number) => ({value: +number, drawn: false}))
			)
		);
	}

	let firstResult: number | undefined;
	let lastResult: number | undefined;

	for (const number of numbers) {
		const left = boards.filter((board) => !isBingo(board));
		if (!left.length) break;
		for (const board of left) {
			draw(board, number);
			if (isBingo(board)) {
				const remainder = allNotDrawn(board);
				lastResult = number * remainder.reduce((a, b) => a + b.value, 0);
				if (firstResult === undefined) firstResult = lastResult;
			}
		}
	}

	return firstResult;
}

async function p2021day4_part2(input: string, ...params: any[]) {
	const groups = input.split("\r\n\r\n").map((item) => item.trim());
	const boards: Board[] = [];
	const numbers = groups[0].split(',').map((item) => +item.trim());

	for (const item of groups.slice(1)) {
		boards.push(
			item.split('\r\n').map((line) =>
				line
					.trim()
					.split(/\s+/)
					.map((number) => ({value: +number, drawn: false}))
			)
		);
	}

	let firstResult: number | undefined;
	let lastResult: number | undefined;

	for (const number of numbers) {
		const left = boards.filter((board) => !isBingo(board));
		if (!left.length) break;
		for (const board of left) {
			draw(board, number);
			if (isBingo(board)) {
				const remainder = allNotDrawn(board);
				lastResult = number * remainder.reduce((a, b) => a + b.value, 0);
				if (firstResult === undefined) firstResult = lastResult;
			}
		}
	}

	return lastResult;
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\r\n\r\n22 13 17 11  0\r\n 8  2 23  4 24\r\n21  9 14 16  7\r\n 6 10  3 18  5\r\n 1 12 20 15 19\r\n\r\n 3 15  0  2 22\r\n 9 18 13 17  5\r\n19  8  7 25 23\r\n20 11 10 24  4\r\n14 21 16 12  6\r\n\r\n14 21 17 24  4\r\n10 16 15  9 19\r\n18  8 23 26 20\r\n22 11 13  6  5\r\n 2  0 12  3  7`,
		extraArgs: [],
		expected: `4512`
		}];
	const part2tests: TestCase[] = [{
		input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\r\n\r\n22 13 17 11  0\r\n 8  2 23  4 24\r\n21  9 14 16  7\r\n 6 10  3 18  5\r\n 1 12 20 15 19\r\n\r\n 3 15  0  2 22\r\n 9 18 13 17  5\r\n19  8  7 25 23\r\n20 11 10 24  4\r\n14 21 16 12  6\r\n\r\n14 21 17 24  4\r\n10 16 15  9 19\r\n18  8 23 26 20\r\n22 11 13  6  5\r\n 2  0 12  3  7`,
		extraArgs: [],
		expected: `1924`
		}];

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

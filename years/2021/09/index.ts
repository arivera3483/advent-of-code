import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";
import * as grid from '../../../util/grid';

const YEAR = 2021;
const DAY = 9;

// solution path: /home/adam/src/advent-of-code/years/2021/09/index.ts
// data path    : /home/adam/src/advent-of-code/years/2021/09/data.txt
// problem url  : https://adventofcode.com/2021/day/9

function findLocalMinima(g: grid.Grid) {
	const localMinima: number[] = [];
	const localMinimaCell: grid.Cell[] = [];

	for (const cell of g) {
			let neighbors: number[] = [];
			
				if (
					(+cell.isNorthEdge() || +cell.value < +cell.north()!.value) &&
					(+cell.isEastEdge() || +cell.value < +cell.east()!.value) &&
					(+cell.isWestEdge() || +cell.value < +cell.west()!.value) &&
					(+cell.isSouthEdge() || +cell.value < +cell.south()!.value)
				) {
				localMinima.push(+cell.value);
				localMinimaCell.push(cell);
			}
		}

	return { localMinima, localMinimaCell };

}

async function p2021day9_part1(input: string, ...params: any[]) {
	const g = new grid.Grid({ serialized: input });
	const localmin = findLocalMinima(g).localMinima;

	const sum = _.sum(localmin) + localmin.length;
	
	return sum;
}

async function p2021day9_part2(input: string, ...params: any[]) {
	const g = new grid.Grid({ serialized: input });
	const localmin = findLocalMinima(g).localMinima;

	
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `2199943210
3987894921
9856789892
8767896789
9899965678`,
		extraArgs: [],
		expected: `15`
	}];
	const part2tests: TestCase[] = [{
		input: `2199943210
3987894921
9856789892
8767896789
9899965678`,
		extraArgs: [],
		expected: `1134`
	}];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day9_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day9_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day9_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day9_part2(input));
	const part2After = performance.now();
	
	logSolution(9, 2021, part1Solution, part2Solution);

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

import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";
import { group } from "console";

const YEAR = 2021;
const DAY = 8;

// solution path: /home/adam/src/advent-of-code/years/2021/08/index.ts
// data path    : /home/adam/src/advent-of-code/years/2021/08/data.txt
// problem url  : https://adventofcode.com/2021/day/8

async function p2021day8_part1(input: string, ...params: any[]) {
	const lines = input.split("\n");
	let count = 0;

	for (const line of lines) {
		const groups = line.split(" ");
		//for (let i = 0; i < 10; i++) {
			// signal observations
		//}
		for (let j = 11; j < 15; j++) {
			// output value
			switch (groups[j].length){
				case 2: // Can only be a 1
					count++;
					break;
				case 3: // Can only be a 7
					count++;
					break;
				case 4: // Can only be a 4
					count++;
					break;
				case 5: // Can be a 2, 3, or 5
					//count++;
					break;
				case 6: // Can be a 0, 6, or 9 (nice.)
					//count++;
					break;
				case 7: // Can only be an 8
					count++;
					break;
			}

		}
	}
	return count;
}

function getDigitPatterns(input: string[]) {
	input.sort((a, b) => a.length - b.length);
	let key:string[] = ["","","","","","","","","",""]
	key[1] = input.shift() as string;
	key[7] = input.shift() as string;
	key[4] = input.shift() as string;
	key[8] = input.pop() as string;
	let threeTwoFive = input.slice(0,3);
	let zeroNineSix = input.slice(3,6);
	key[6] = zeroNineSix.filter(e => !([...key[1]].every(f => e.includes(f))))[0];
	zeroNineSix = zeroNineSix.filter(e => e !== key[6]);
	key[9] = zeroNineSix.filter(e => [...key[4]].every(f => e.includes(f)))[0];
	key[0] = zeroNineSix.filter(e => e !== key[9])[0];
	key[3] = threeTwoFive.filter(e => [...key[1]].every(f => e.includes(f)))[0];
	threeTwoFive = threeTwoFive.filter(e => e !== key[3]);
	key[5] = threeTwoFive.filter(e => [...e].every(f => key[6].includes(f)))[0];
	key[2] = threeTwoFive.filter(e => e !== key[5])[0];
	return key.map(e => [...e].sort().join(""));
}

async function p2021day8_part2(input: string, ...params: any[]) {
	const lines = input.split("\n").map(e => e.split(" | ").map(e => e.split(/\s+/)));
	let num = 0;

	for (let display of lines) {
		const key = Object.fromEntries([...getDigitPatterns(display[0]).entries()].map(e => [e[1], e[0]]));
		let digits = "";
		for (let output of display[1].map(e => [...e].sort().join(""))) {
			digits += key[output].toString();
		}

		num += parseInt(digits, 10);

	}	
	return num;
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe\nedbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc\nfgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg\nfbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb\naecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea\nfgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb\ndbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe\nbdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef\negadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb\ngcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
		extraArgs: [],
		expected: `26`
	}];
	const part2tests: TestCase[] = [{
		input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe\nedbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc\nfgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg\nfbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb\naecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea\nfgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb\ndbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe\nbdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef\negadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb\ngcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
		extraArgs: [],
		expected: `61229`
	}];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day8_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day8_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day8_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day8_part2(input));
	const part2After = performance.now();
	
	logSolution(8, 2021, part1Solution, part2Solution);

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

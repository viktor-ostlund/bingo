import { boards, drawNumbers } from './input_data/real_input.js'
import { prepareBoards, prepareDrawNumbers } from './prepareData.js'

const parsedBoards = prepareBoards(boards)
const parsedDrawNumbers = prepareDrawNumbers(drawNumbers)

const boardsWithFoundMoment = parsedBoards.map((number) => parsedDrawNumbers[number])

let index = 0
const boardsSolutionMoment = []
let currentColumns = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }
let currentQuickest = Infinity
let currentLargest = 0

while (index < boardsWithFoundMoment.length) {
    if (boardsWithFoundMoment[index] > currentLargest) currentLargest = boardsWithFoundMoment[index]
    if ((index + 1) % 5 === 0) {
        if (currentQuickest > currentLargest) currentQuickest = currentLargest
        currentLargest = 0
    }
    if (boardsWithFoundMoment[index] > currentColumns[index % 5]) currentColumns[index % 5] = boardsWithFoundMoment[index]
    if ((index + 1) % 25 === 0) {
        boardsSolutionMoment.push(Math.min(currentQuickest, currentColumns[0], currentColumns[1], currentColumns[2], currentColumns[3], currentColumns[4]))
        currentColumns = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }
        currentQuickest = Infinity
    }
    index++
}

function indexOfBiggest(array) {
    var biggest = 0;
    for (let i = 1; i < array.length; i++) {
        if (array[i] > array[biggest]) biggest = i;
    }
    return biggest;
}

const lastBoardIndex = indexOfBiggest(boardsSolutionMoment)
const lastBoardMoment = boardsSolutionMoment[lastBoardIndex]
const nums = drawNumbers.split(',')

const lastNumber = nums[lastBoardMoment]

const slowestBoard = parsedBoards.slice(lastBoardIndex * 25, lastBoardIndex * 25 + 25)

const unchecked = slowestBoard.filter((number, i) => parsedDrawNumbers[number] > lastBoardMoment)

const uncheckedTotal = unchecked.reduce((a, b) => {
    return Number(a) + Number(b);
  }, 0)

console.log(uncheckedTotal * lastNumber)

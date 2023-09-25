import { boardsData, drawNumbersData } from './input_data/real_input.js'
// TODO: Add validations to input data with error handling
import { prepareBoards, prepareDrawNumbers } from './prepareData.js'
import { getSumOfArray, indexOfBiggest } from './utils.js'

const ROW_SIZE = 5
const BOARD_SIZE = ROW_SIZE ** 2

const calculateBingoSum = (boards, drawNumbers) => {
    const boardsParsed = prepareBoards(boards)
    const drawNumbersParsed = prepareDrawNumbers(drawNumbers)
    const drawNumbersUnparsed = drawNumbers.split(',')
    const boardNumbersWithTurns = boardsParsed.map((number) => drawNumbersParsed[number])

    const boardsBingoTurn = []
    let currentBiggestRow = 0
    let currentQuickestRow = Infinity
    let currentBiggestColumns = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }

    boardNumbersWithTurns.forEach((boardNumber, index) => {
        if (boardNumber > currentBiggestRow) currentBiggestRow = boardNumber
        if ((index + 1) % ROW_SIZE === 0) {
            if (currentQuickestRow > currentBiggestRow) currentQuickestRow = currentBiggestRow
            currentBiggestRow = 0
        }
        if (boardNumber > currentBiggestColumns[index % ROW_SIZE]) currentBiggestColumns[index % ROW_SIZE] = boardNumber
        if ((index + 1) % BOARD_SIZE === 0) {
            boardsBingoTurn.push(
                Math.min(
                    currentQuickestRow,
                    currentBiggestColumns[0],
                    currentBiggestColumns[1],
                    currentBiggestColumns[2],
                    currentBiggestColumns[3],
                    currentBiggestColumns[4]
                )
            )
            currentBiggestColumns = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }
            currentQuickestRow = Infinity
        }
    })

    const lastBoardIndex = indexOfBiggest(boardsBingoTurn)
    const lastBoardMoment = boardsBingoTurn[lastBoardIndex]
    const lastNumber = drawNumbersUnparsed[lastBoardMoment]
    const slowestBoardStart = lastBoardIndex * BOARD_SIZE
    const slowestBoard = boardsParsed.slice(slowestBoardStart, slowestBoardStart + BOARD_SIZE)
    const unchecked = slowestBoard.filter((number) => drawNumbersParsed[number] > lastBoardMoment)
    const uncheckedTotal = getSumOfArray(unchecked)

    return uncheckedTotal * lastNumber
}

const bingoSum = calculateBingoSum(boardsData, drawNumbersData)

console.log(`BINGO: \x1b[33m${bingoSum}\x1b[33m`)

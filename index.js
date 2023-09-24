import { boards, drawNumbers } from './input_data/test_data.js'
import { prepareBoards, prepareDrawNumbers } from './prepareData.js'

const parsedBoards = prepareBoards(boards)
const parsedDrawNumbers = prepareDrawNumbers(drawNumbers)

const boardsWithFoundMoment = parsedBoards.map((number) => parsedDrawNumbers[number])

console.log(boardsWithFoundMoment)

let index = 0
const eachRowFoundMoment = []
const eachRowFoundMomentY = []
let currentLargest = 0
let currentLargestY = 0

while (index < boardsWithFoundMoment.length) {
    if (boardsWithFoundMoment[index] > currentLargest) currentLargest = boardsWithFoundMoment[index]
    if ((index + 1) % 5 === 0) {
        eachRowFoundMoment.push(currentLargest)
        currentLargest = 0
    }
    // FIX
    if (boardsWithFoundMoment[index + 5] > currentLargestY) currentLargestY = boardsWithFoundMoment[index + 5]
    if ((index + 1) % 5 === 0) {
        eachRowFoundMomentY.push(currentLargestY)
        currentLargestY = 0
    }
    index++
}

console.log(eachRowFoundMoment, eachRowFoundMomentY)
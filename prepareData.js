export const prepareBoards = (boards) => boards
    .replaceAll('\n', ' ')
    .replaceAll('  ', ' ')
    .split(' ')

export const prepareDrawNumbers = (drawNumbers) => drawNumbers
    .split(',')
    .reduce((a, v, i) => ({ ...a, [v]: i}), {})
export const indexOfBiggest = (array) => {
    let biggest = 0;
    for (let i = 1; i < array.length; i++) {
        if (array[i] > array[biggest]) biggest = i;
    }
    return biggest;
}

export const getSumOfArray = (array) => {
    return array.reduce((a, b) => {
        return Number(a) + Number(b);
    }, 0)
}
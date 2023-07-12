export const generateLotteryNumbers = (): number[] => {
  const numbers: number[] = []

  while (numbers.length < 5) {
    const randomNum = Math.floor(Math.random() * 90) + 1

    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum)
    }
  }

  return numbers
}

export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat().format(number).replace(/,/g, " ")
}

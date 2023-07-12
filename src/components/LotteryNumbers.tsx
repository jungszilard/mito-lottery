import _ from "lodash"

interface ILotteryNumbersProps {
  lotteryNumbers: number[]
}

const LotteryNumbers = ({ lotteryNumbers }: ILotteryNumbersProps) => {
  const renderEmptyNumbers = () => {
    const emptyNumbers = []

    for (let i = 0; i < 5; i++) {
      emptyNumbers.push(
        <div
          key={i}
          className='w-8.5 border border-mito-secondary rounded-base flex justify-center items-center ml-4'
        ></div>
      )
    }

    return emptyNumbers
  }

  return (
    <div className='flex'>
      {_.isEmpty(lotteryNumbers)
        ? renderEmptyNumbers()
        : lotteryNumbers.map((lotteryNumber) => (
            <div
              key={lotteryNumber}
              className='w-8.5 border border-mito-secondary rounded-base flex justify-center items-center ml-4'
            >
              {lotteryNumber}
            </div>
          ))}
    </div>
  )
}

export default LotteryNumbers

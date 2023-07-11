"use client"
import clsx from "clsx"
import _ from "lodash"
import { useEffect, useState } from "react"
import RangeSlider from "../components/RangeSlider"
import Image from "next/image"
import checkIcon from "../../public/check.svg"

const generateLotteryNumbers = (): number[] => {
  const numbers: number[] = []

  while (numbers.length < 5) {
    const randomNum = Math.floor(Math.random() * 90) + 1

    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum)
    }
  }

  return numbers
}

export default function Home() {
  const [lotteryNumbers, setLotteryNumbers] = useState<number[]>([])
  const [lottery2matches, setLottery2matches] = useState<number>(0)
  const [lottery3matches, setLottery3matches] = useState<number>(0)
  const [lottery4matches, setLottery4matches] = useState<number>(0)
  const [lotteryNumbersTip, setLotteryNumbersTip] = useState<number[]>([])
  const [isRandomNumber, setIsRandomNumber] = useState<boolean>(false)
  const [conditionMet, setConditionMet] = useState(false)
  const [ticketNumber, setTicketNumber] = useState(0)
  const [intervalValue, setIntervalValue] = useState<number>(1)

  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat().format(number).replace(/,/g, " ")
  }

  const handleRandomNumber = () => {
    setIsRandomNumber(!isRandomNumber)
    !isRandomNumber && setLotteryNumbersTip(generateLotteryNumbers())
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (_.isEmpty(lotteryNumbersTip) || conditionMet) {
        clearInterval(interval)
        return
      }
      const newNumbers = generateLotteryNumbers()
      setLotteryNumbers(newNumbers)

      const isWinning = newNumbers.every((lotteryNumber) =>
        lotteryNumbersTip.includes(lotteryNumber)
      )

      if (isWinning) {
        setConditionMet(true)
        clearInterval(interval)
      } else {
        setTicketNumber((prevTicketNumber) => prevTicketNumber + 1)
        const matchesNumber = newNumbers.filter((number) =>
          lotteryNumbersTip.includes(number)
        )

        switch (matchesNumber.length) {
          case 2:
            setLottery2matches((prevLottery2matches) => prevLottery2matches + 1)
            break
          case 3:
            setLottery3matches((prevLottery3matches) => prevLottery3matches + 1)
            break
          case 4:
            setLottery4matches((prevLottery4matches) => prevLottery4matches + 1)
            break
        }
      }
    }, intervalValue)

    return () => {
      clearInterval(interval)
    }
  }, [conditionMet, lotteryNumbersTip, intervalValue])

  return (
    <div data-testid='home-page'>
      <p className='text-4.5xl font-bold capitalize mb-8'>Result</p>
      <div className='flex mb-8'>
        <div className='flex bg-mito-secondary text-white font-bold py-4.5 px-6 rounded-base'>
          <div className='mr-6'>
            <p data-testid='number-of-ticket'>Number of tickets:</p>
            <p className='text-sm'>Years spent:</p>
            <p className='text-sm'>Cost of tickets:</p>
          </div>
          <div>
            <p>{formatNumber(ticketNumber)}</p>
            <p className='text-sm'>
              {formatNumber(Math.floor(ticketNumber / 51))}
            </p>
            <p className='text-sm'>{formatNumber(ticketNumber * 300)},00 Ft</p>
          </div>
        </div>
      </div>
      <div className='flex mb-8'>
        <div className='flex border border-solid border-result-border rounded-base'>
          <div className='border-r border-solid border-result-border w-32 h-18 flex flex-col justify-between items-center py-3'>
            <p className='font-bold text-xs'>2 matches</p>
            <p className='font-extrabold'>{formatNumber(lottery2matches)}</p>
          </div>
          <div className='border-r border-solid border-result-border w-32 h-18 flex flex-col justify-between items-center py-3'>
            <p className='font-bold text-xs'>3 matches</p>
            <p className='font-extrabold'>{formatNumber(lottery3matches)}</p>
          </div>
          <div className='border-r border-solid border-result-border w-32 h-18 flex flex-col justify-between items-center py-3'>
            <p className='font-bold text-xs'>4 matches</p>
            <p className='font-extrabold'>{formatNumber(lottery4matches)}</p>
          </div>
          <div className='w-32 h-18 flex flex-col justify-between items-center py-3'>
            <p className='font-bold text-xs'>5 matches</p>
            <p className='font-extrabold'>{conditionMet ? 1 : 0}</p>
          </div>
        </div>
      </div>
      <div className='flex h-9.5 mb-6 '>
        <p className='my-auto w-40'>Winning numbers:</p>
        {lotteryNumbers &&
          lotteryNumbers
            // .sort((n1, n2) => n1 - n2)
            .map((lotteryNumber) => (
              <div
                key={lotteryNumber}
                className='w-8.5 border border-mito-secondary rounded-base flex justify-center items-center ml-4'
              >
                {lotteryNumber}
              </div>
            ))}
      </div>
      <div className='flex h-9.5 mb-8'>
        <p className='my-auto w-40'>Your numbers:</p>
        {lotteryNumbersTip &&
          lotteryNumbersTip
            // .sort((n1, n2) => n1 - n2)
            .map((lotteryNumber) => (
              <div
                key={lotteryNumber}
                className='w-8.5 border border-mito-secondary rounded-base flex justify-center items-center ml-4'
              >
                {lotteryNumber}
              </div>
            ))}
      </div>
      <div className='flex items-center mb-8'>
        <div className='mr-14'>Play with random numbers:</div>
        <button
          className={clsx(
            "cursor-pointer w-8 h-8 border border-mito-primary rounded",
            conditionMet ? "opacity-50 cursor-not-allowed" : "hover:bg-grey-700"
          )}
          onClick={() => handleRandomNumber()}
          disabled={conditionMet}
        >
          {isRandomNumber && (
            <div className='flex items-center justify-center'>
              <Image priority src={checkIcon} alt='random number' />
            </div>
          )}
        </button>
      </div>
      {/* <div>{intervalValue}</div> */}
      <p>Speed</p>
      <RangeSlider
        min={1}
        max={1000}
        step={1}
        intervalValue={intervalValue}
        setIntervalValue={setIntervalValue}
      />
      {conditionMet && <p>Condition met!</p>}
    </div>
  )
}

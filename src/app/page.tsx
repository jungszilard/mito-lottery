"use client"
import clsx from "clsx"
import _ from "lodash"
import { useEffect, useState } from "react"
import RangeSlider from "../components/RangeSlider"

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
  const [conditionMet, setConditionMet] = useState(false)
  const [ticketNumber, setTicketNumber] = useState(0)
  const [intervalValue, setIntervalValue] = useState<number>(1)

  const lotteryMatchesNumber = (newNumbers: number[]) => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (_.isEmpty(lotteryNumbersTip) || conditionMet) {
        clearInterval(interval)
        return
      }
      const newNumbers = generateLotteryNumbers()

      const isWinning = newNumbers.every((lotteryNumber) =>
        lotteryNumbersTip.includes(lotteryNumber)
      )
      if (isWinning) {
        setConditionMet(true)
        clearInterval(interval)
      } else {
        setTicketNumber((prevTicketNumber) => prevTicketNumber + 1)
        lotteryMatchesNumber(newNumbers)
        setLotteryNumbers(newNumbers)
      }
    }, intervalValue)

    return () => {
      clearInterval(interval)
    }
  }, [conditionMet, lotteryNumbersTip, intervalValue])

  return (
    <div>
      <div>Result</div>
      <div>
        <div>Number of tickets: {ticketNumber}</div>
        <div>Years spent: {Math.floor(ticketNumber / 51)}</div>
        <div>Cost of tickets: {ticketNumber * 300} Ft</div>
      </div>
      <div>
        <div>2 matches {lottery2matches}</div>
        <div>3 matches {lottery3matches}</div>
        <div>4 matches {lottery4matches}</div>
      </div>
      <p>Winning numbers:</p>
      {conditionMet
        ? lotteryNumbersTip
            .sort((n1, n2) => n1 - n2)
            .map((lotteryNumber) => (
              <div key={lotteryNumber}>{lotteryNumber}</div>
            ))
        : lotteryNumbers &&
          lotteryNumbers
            .sort((n1, n2) => n1 - n2)
            .map((lotteryNumber) => (
              <div key={lotteryNumber}>{lotteryNumber}</div>
            ))}
      <p>Your numbers:</p>
      {lotteryNumbersTip &&
        lotteryNumbersTip
          .sort((n1, n2) => n1 - n2)
          .map((lotteryNumber) => (
            <div key={lotteryNumber}>{lotteryNumber}</div>
          ))}
      <div>
        <div>Play with random numbers:</div>
        <button
          className={clsx(
            "bg-blue-500 text-white font-bold py-2 px-4 border border-blue-700 rounded",
            conditionMet ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          )}
          onClick={() => setLotteryNumbersTip(generateLotteryNumbers())}
          disabled={conditionMet}
        >
          Lotto szam generalas
        </button>
      </div>
      <div>
        <input
          type='checkbox'
          name='checkbox-three'
          id='checkbox-three'
          className='bg-pink-300 hover:bg-pink-400 cursor-pointer 
    w-12 h-12 border-3 border-rose-500 rounded-lg checked:bg-rose-600'
        />
        <label className='ml-3'>Checkbox Three</label>
      </div>
      <div>{intervalValue}</div>
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

"use client"
import clsx from "clsx"
import _ from "lodash"
import { useEffect, useState } from "react"
import RangeSlider from "../components/RangeSlider"
import Image from "next/image"
import checkIcon from "../../public/check.svg"
import LotteryNumbers from "../components/LotteryNumbers"
import Modal from "../components/Modal"
import ResultDetails from "../components/ResutDetails"
import Summary from "../components/Summary"

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

  useEffect(() => {
    isRandomNumber
      ? setLotteryNumbersTip(generateLotteryNumbers())
      : setLotteryNumbersTip([])
  }, [isRandomNumber])

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
      <Summary ticketNumber={ticketNumber} />
      <ResultDetails
        lottery2matches={lottery2matches}
        lottery3matches={lottery3matches}
        lottery4matches={lottery4matches}
        lottery5matches={conditionMet ? 1 : 0}
      />
      <div className='flex h-9.5 mb-6 mt-8'>
        <p className='my-auto w-40'>Winning numbers:</p>
        <LotteryNumbers lotteryNumbers={lotteryNumbers} />
      </div>
      <div className='flex h-9.5 mb-8'>
        <p className='my-auto w-40'>Your numbers:</p>
        <LotteryNumbers lotteryNumbers={lotteryNumbersTip} />
      </div>
      <div className='flex items-center mb-8'>
        <div className='mr-14'>Play with random numbers:</div>
        <button
          className={clsx(
            "cursor-pointer w-8 h-8 border border-mito-primary rounded",
            conditionMet ? "opacity-50 cursor-not-allowed" : "hover:bg-grey-700"
          )}
          onClick={() => setIsRandomNumber(!isRandomNumber)}
          disabled={conditionMet}
        >
          {isRandomNumber && (
            <div className='flex items-center justify-center'>
              <Image priority src={checkIcon} alt='random number' />
            </div>
          )}
        </button>
      </div>
      <p>Speed</p>
      <RangeSlider
        min={1}
        max={1000}
        step={1}
        intervalValue={intervalValue}
        setIntervalValue={setIntervalValue}
      />
      {conditionMet && <p>Condition met!</p>}
      {_.isEmpty(lotteryNumbersTip) && (
        <Modal
          setLotteryNumbersTip={setLotteryNumbersTip}
          setIsRandomNumber={setIsRandomNumber}
        />
      )}
    </div>
  )
}

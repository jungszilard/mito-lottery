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
import { generateLotteryNumbers } from "../components/utils"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  setIsRandomNumber,
  setSelectedLotteryNumbers,
} from "../redux/slices/lotteryNumberSlice"

export default function Home() {
  const dispatch = useAppDispatch()

  const intervalValue = useAppSelector((state) => state.inetrval.intervalValue)
  const isRandomNumber = useAppSelector(
    (state) => state.lotteryNumber.isRandomNumber
  )
  const selectedLotteryNumbers = useAppSelector(
    (state) => state.lotteryNumber.selectedLotteryNumbers
  )

  const [drawnLotteryNumbers, setDrawnLotteryNumbers] = useState<number[]>([])

  const [twoMatchingNumbers, setTwoMatchingNumbers] = useState<number>(0)
  const [threeMatchingNumbers, setThreeMatchingNumbers] = useState<number>(0)
  const [fourMatchingNumbers, setFourMatchingNumbers] = useState<number>(0)
  const [isFiveMatchingNumbers, setIsFiveMatchingNumbers] = useState(false)

  const [numberOfTickets, setNumberOfTickets] = useState(0)

  useEffect(() => {
    isRandomNumber
      ? dispatch(setSelectedLotteryNumbers(generateLotteryNumbers()))
      : dispatch(setSelectedLotteryNumbers([]))
  }, [isRandomNumber, dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      if (_.isEmpty(selectedLotteryNumbers) || isFiveMatchingNumbers) {
        clearInterval(interval)
        return
      }
      const newNumbers = generateLotteryNumbers()
      setDrawnLotteryNumbers(newNumbers)

      const isWinning = newNumbers.every((lotteryNumber) =>
        selectedLotteryNumbers.includes(lotteryNumber)
      )

      if (isWinning) {
        setIsFiveMatchingNumbers(true)
        clearInterval(interval)
      } else {
        setNumberOfTickets((prevNumberOfTickets) => prevNumberOfTickets + 1)
        const matchesNumber = newNumbers.filter((number) =>
          selectedLotteryNumbers.includes(number)
        )

        switch (matchesNumber.length) {
          case 2:
            setTwoMatchingNumbers(
              (prevLottery2matches) => prevLottery2matches + 1
            )
            break
          case 3:
            setThreeMatchingNumbers(
              (prevLottery3matches) => prevLottery3matches + 1
            )
            break
          case 4:
            setFourMatchingNumbers(
              (prevLottery4matches) => prevLottery4matches + 1
            )
            break
        }
      }
    }, intervalValue)

    return () => {
      clearInterval(interval)
    }
  }, [isFiveMatchingNumbers, selectedLotteryNumbers, intervalValue])

  return (
    <div data-testid='home-page'>
      <p className='text-3xl sm:text-4.5xl font-bold capitalize mb-8'>Result</p>
      <Summary numberOfTickets={numberOfTickets} />
      <ResultDetails
        lottery2matches={twoMatchingNumbers}
        lottery3matches={threeMatchingNumbers}
        lottery4matches={fourMatchingNumbers}
        lottery5matches={isFiveMatchingNumbers ? 1 : 0}
      />
      <div className='text-xs sm:text-base font font-semibold	sm:font-normal'>
        <div className='flex h-7 sm:h-9.5 mb-6 mt-8'>
          <p className='my-auto w-40'>Winning numbers:</p>
          <LotteryNumbers lotteryNumbers={drawnLotteryNumbers} />
        </div>
        <div className='flex h-7 sm:h-9.5 mb-8'>
          <p className='my-auto w-40'>Your numbers:</p>
          <LotteryNumbers lotteryNumbers={selectedLotteryNumbers} />
        </div>
        <div className='flex items-center mb-8'>
          <div className='mr-5 sm:mr-14'>Play with random numbers:</div>
          <button
            className={clsx(
              "cursor-pointer w-4 sm:w-8 h-4 sm:h-8 border border-mito-primary rounded",
              isFiveMatchingNumbers
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-grey-700"
            )}
            onClick={() => dispatch(setIsRandomNumber(!isRandomNumber))}
            disabled={isFiveMatchingNumbers}
          >
            {isRandomNumber && (
              <div className='flex items-center justify-center'>
                <Image
                  priority
                  src={checkIcon}
                  alt='random number'
                  className='w-2.5 sm:w-fit'
                />
              </div>
            )}
          </button>
        </div>
        <p>Speed</p>
        <RangeSlider min={1} max={1000} step={1} />
      </div>
      {_.isEmpty(selectedLotteryNumbers) && <Modal />}
    </div>
  )
}

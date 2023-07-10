import { Dispatch, SetStateAction } from "react"

interface IRangeSlider {
  min: number
  max: number
  step: number
  intervalValue: number
  setIntervalValue: Dispatch<SetStateAction<number>>
}

const RangeSlider = ({
  min,
  max,
  step,
  intervalValue,
  setIntervalValue,
}: IRangeSlider) => {
  return (
    <div className='grid place-items-center bg-green-300'>
      <input
        id='steps-range'
        type='range'
        min={min}
        max={max}
        value={intervalValue}
        onChange={(e) => setIntervalValue(parseInt(e.target.value))}
        step={step}
        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
      ></input>
    </div>
  )
}

export default RangeSlider

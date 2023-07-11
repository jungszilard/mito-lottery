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
    <div className=''>
      <input
        id='steps-range'
        type='range'
        min={min}
        max={max}
        value={intervalValue}
        onChange={(e) => setIntervalValue(parseInt(e.target.value))}
        step={step}
        className='w-full h-2 bg-mito-secondary rounded-lg appearance-none cursor-pointer'
      ></input>
    </div>
  )
}

export default RangeSlider

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setIntervalValue } from "../redux/slices/intervalSlice"

interface IRangeSliderProps {
  min: number
  max: number
  step: number
}

const RangeSlider = ({ min, max, step }: IRangeSliderProps) => {
  const dispatch = useAppDispatch()
  const intervalValue = useAppSelector((state) => state.inetrval.intervalValue)

  return (
    <div className=''>
      <input
        id='steps-range'
        type='range'
        min={min}
        max={max}
        value={intervalValue}
        onChange={(e) => dispatch(setIntervalValue(parseInt(e.target.value)))}
        step={step}
        className='w-full h-2 bg-mito-secondary rounded-lg appearance-none cursor-pointer'
      ></input>
    </div>
  )
}

export default RangeSlider

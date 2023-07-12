/* eslint-disable no-unused-vars */
import { useForm, SubmitHandler } from "react-hook-form"
import { Dispatch, SetStateAction } from "react"
import _ from "lodash"
import { generateLotteryNumbers } from "./utils"

type FormData = {
  number1: number
  number2: number
  number3: number
  number4: number
  number5: number
}

enum FIELD_NUMBER {
  number1 = "number1",
  number2 = "number2",
  number3 = "number3",
  number4 = "number4",
  number5 = "number5",
}

type FieldOption = "number1" | "number2" | "number3" | "number4" | "number5"

interface IModalProps {
  setLotteryNumbersTip: Dispatch<SetStateAction<number[]>>
  setIsRandomNumber: Dispatch<SetStateAction<boolean>>
}

const Modal = ({ setLotteryNumbersTip, setIsRandomNumber }: IModalProps) => {
  const {
    setError,
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = (numbers) => {
    const lotteryNumbers = Object.values(numbers)
    const duplicatedNumbers = _.uniq(
      _.filter(lotteryNumbers, (num, index) =>
        _.includes(lotteryNumbers, num, index + 1)
      )
    )

    if (_.isEmpty(duplicatedNumbers)) {
      setLotteryNumbersTip(lotteryNumbers)
      setIsRandomNumber(false)
    } else {
      duplicatedNumbers.forEach((number: number) => {
        const fields = _.pickBy(numbers, (val) => val === number)
        Object.keys(fields).forEach((field) => {
          return setError(field as FieldOption, {
            type: "custom",
            message: "The lottery number is being used multiple times",
          })
        })
      })
    }
  }

  const handleLotteryNumber = (fieldName: FieldOption, number: number) => {
    if (number < 1 || number > 90) resetField(fieldName)
  }

  const renderLotteryNumberField = (
    field: FIELD_NUMBER,
    lotteryNumber: number
  ) => {
    return (
      <div className='mb-3 flex justify-around items-center'>
        <label>Pick your lottery number {lotteryNumber}:</label>
        <input
          className='w-8.5 h-9.5 ml-5 border border-mito-secondary rounded-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center'
          type='number'
          {...register(field, { required: true, valueAsNumber: true })}
          onChange={(e) => handleLotteryNumber(field, parseInt(e.target.value))}
        />
        {errors[field] && (
          <p className='text-red-500 text-xs italic'>
            {errors[field]?.message
              ? errors[field]?.message
              : "Lottery number is required"}
          </p>
        )}
      </div>
    )
  }

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-6'>
            {/*header*/}
            <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
              <h3 className='text-3xl font-semibold'>
                Pick your lottery numbers
              </h3>
            </div>
            {/*body*/}
            <div className='relative p-6 flex-auto'>
              <form onSubmit={handleSubmit(onSubmit)}>
                {renderLotteryNumberField(FIELD_NUMBER.number1, 1)}
                {renderLotteryNumberField(FIELD_NUMBER.number2, 2)}
                {renderLotteryNumberField(FIELD_NUMBER.number3, 3)}
                {renderLotteryNumberField(FIELD_NUMBER.number4, 4)}
                {renderLotteryNumberField(FIELD_NUMBER.number5, 5)}
                <div className='flex items-center justify-end pt-6 mt-4 border-t border-solid border-slate-200 rounded-b'>
                  <button
                    className='bg-blue-400 hover:bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => {
                      setLotteryNumbersTip(generateLotteryNumbers())
                      setIsRandomNumber(true)
                    }}
                  >
                    Play with random numbers
                  </button>
                  <button
                    className='bg-emerald-400 hover:bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='submit'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  )
}

export default Modal

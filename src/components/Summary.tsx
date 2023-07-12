import { formatNumber } from "./utils"

interface ISummaryProps {
  ticketNumber: number
}

const Summary = ({ ticketNumber }: ISummaryProps) => {
  return (
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
  )
}

export default Summary

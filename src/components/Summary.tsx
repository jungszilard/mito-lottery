import { formatNumber } from "./utils"

interface ISummaryProps {
  numberOfTickets: number
}

const Summary = ({ numberOfTickets }: ISummaryProps) => {
  return (
    <div className='sm:flex mb-8'>
      <div className='flex flex-col bg-mito-secondary text-white font-bold py-4.5 px-4 sm:px-6 rounded sm:rounded-base'>
        <div className='grid grid-cols-2 gap-4'>
          <p className='text-sm sm:text-base' data-testid='number-of-ticket'>
            Number of tickets:
          </p>
          <p className='text-sm sm:text-base'>
            {formatNumber(numberOfTickets)}
          </p>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <p className='text-sm'>Years spent:</p>
          <p className='text-sm'>
            {formatNumber(Math.floor(numberOfTickets / 53))}
          </p>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <p className='text-sm'>Cost of tickets:</p>
          <p className='text-sm'>{formatNumber(numberOfTickets * 300)},00 Ft</p>
        </div>
      </div>
    </div>
  )
}

export default Summary

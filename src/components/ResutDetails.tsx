import { formatNumber } from "../app/page"

interface IRresultDetailsProps {
  lottery2matches: number
  lottery3matches: number
  lottery4matches: number
  lottery5matches: number
}

const ResultDetails = ({
  lottery2matches,
  lottery3matches,
  lottery4matches,
  lottery5matches,
}: IRresultDetailsProps) => {
  return (
    <div className='flex'>
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
          <p className='font-extrabold'>{lottery5matches}</p>
        </div>
      </div>
    </div>
  )
}

export default ResultDetails

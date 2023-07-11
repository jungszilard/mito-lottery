import Image from "next/image"
import lotteryIcon from "../../public/lottery.svg"

const Header = () => {
  return (
    <div className='h-15 bg-gradien-primary flex items-center'>
      <Image
        priority
        src={lotteryIcon}
        alt='Lottery app icon'
        className='ml-5 mr-8 '
        data-testid='lottery-icon'
      />
      <p className='text-white text-4xl	font-bold capitalize'>
        Lottery simulator
      </p>
    </div>
  )
}

export default Header

import '../app.css'
import logo2 from "/images/Logo-Eauchezmoi.png"
import bg from '/images/bg-nav.png'
import bgwave from '/images/bg-wave.png'
const Header = () => {
    return (

        <div className='flex h-[80px]  w-full items-center justify-between relative' >
            <img
                src={bg}
                className='absolute h-24 top-0 z-[-1000] w-full'
            />
            <img
                src={bg}
                className='absolute animate-waveX h-24 top-0 z-[-1000] w-full'
            />
            {/* Duplicate image to create seamless transition */}

            <div className='flex  h-24 justify-between items-center w-full px-4'>
       

                <img src={logo2} className='' />
                <a href='https://www.cieau.com' className='text-white '>CIEAU</a>
            </div>


        </div>)
}
export default Header;

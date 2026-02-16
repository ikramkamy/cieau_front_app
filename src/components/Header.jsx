import '../app.css'
import logo2 from "/images/Logo-Eauchezmoi.png"
import bg from '/images/bg-nav.png'
import bgwave from '/images/bg-wave.png'
const Header = () => {
    return (

        <div className='flex h-[80px]  w-full items-center justify-between relative' >
            {/* <img
                src={bg}
                className='absolute h-24 top-0 z-[-1000] w-[200%] '
            /> */}

            {/* <img
                src={bg}
                className='absolute  animate-waveX  rotate-0  h-24 top-0 z-[-1000] w-[200%] '
            /> */}
            {/* <img
                src={bg}
                className='absolute animate-waveX h-24 top-0 z-[-1000] w-[200%] '
            /> */}
            {/* Duplicate image to create seamless transition */}

            <div className='flex bg-primary-50   [clip-path:ellipse(120%_100%_at_50%_0%)]  h-24 justify-between items-center w-full px-4'>
                <div class="relative bg-blue-500 h-64 overflow-hidden">


                    <svg
                        class="absolute bottom-0 w-[200%] animate-wave"
                        viewBox="0 0 1440 150"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="white"
                            d="M0,64L80,80C160,96,320,128,480,133.3C640,139,800,117,960,96C1120,75,1280,53,1360,42.7L1440,32V150H0Z"
                        />
                    </svg>


                    <svg
                        class="absolute bottom-0 left-[100%] w-[200%] animate-wave"
                        viewBox="0 0 1440 150"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="white"
                            d="M0,64L80,80C160,96,320,128,480,133.3C640,139,800,117,960,96C1120,75,1280,53,1360,42.7L1440,32V150H0Z"
                        />
                    </svg>

                </div>


                <img src={logo2} className='' />
                <a href='https://www.cieau.com' className='text-white '>CIEAU</a>
            </div>


        </div>)
}
export default Header;

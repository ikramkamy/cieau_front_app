import '../app.css'
import chart from '/images/chart.svg';
import Logo from '/images/logo.png'
import logo2 from "/images/Logo-Eauchezmoi.png"

const SplashScreen = () => {
    return (

        <div className='splash-water-wave h-[100vh] px-4 w-full bg-primary-50 absolute top-0 z-[500] flex justify-center  items-center' >

            <div className='flex flex-col justify-center items-center'>
                <img src={logo2} className='' />

                 
                <h2 className='font-[600] mt-4 mb-2 uppercase text-white w-[300] bg-secondary'>une application créée par</h2>
                <img src={Logo} width={250} height={100} className='bg-white rounded p-4' />

               
            </div>

 <h6 className='text-white w-full absolute bottom-5 flex justify-end px-4'>©Tous droits réservés - EauChezMoi {new Date().getFullYear()
}</h6>
        </div>)
}
export default SplashScreen;

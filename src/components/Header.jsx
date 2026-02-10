import '../app.css'
import logo2 from "/images/Logo-Eauchezmoi.png"
const Header = () => {
    return (

        <div className='flex h-[80px]  items-center justify-between bg-primary-50' >
            <div className='flex justify-between items-center w-full px-4'>
                <img src={logo2} className='' />
                <a href='https://www.cieau.com' className='text-white '>CIEAU</a>
            </div>


        </div>)
}
export default Header;

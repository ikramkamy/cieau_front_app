import '../app.css'
import chart from '/images/chart.svg';
const DataCard = ({ value, unit, title, info, data_graph }) => {
    return (

        <div className='flex justify-center ' >
            <div className=" flex flex-col justify-center items-start  w-[180px] h-[180px] bg-[url('/images/bg-card.svg')] bg-size-([100%]) bg-no-repeat bg-center bg-auto md:bg-contain text-white p-4 font-bold">
                <div className='flex  text-primary-50 w-full d-flex justify-content-start bg-primary uppercase text-sm fw-bolder'>Chlore total</div>
                <div className='fw-bolder  text-black flex mt-2 text-3xl items-end '>15.8 <span className='ml-1 text-sm fw-lighter'>f°</span>
                </div>
                <div className='bg-white rounded mt-2 w-fit p-2 flex'>
                    <img src={chart} className='cursor-pointer mr-2' />
                    <span className='text-black uppercase text-sm cursor-pointer hover:text-primary'>Voir le détail</span>
                </div>
            </div>

        </div>)
}
export default DataCard;

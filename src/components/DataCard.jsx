import { useEffect, useState } from 'react';
import '../app.css'
import chart from '/images/chart.svg';
const DataCard = ({ value, unit, title, info, data_graph }) => {
    const [data, setData] = useState([])
    const [average, setAverage] = useState([])

    function calculateAverage(data) {
        if (!data || data.length === 0) return 0;

        const sum = data.reduce((acc, item) => acc + Number(item.value), 0);
        const average = sum / data.length;

        return Number(average.toFixed(4)); // round to 2 decimals
    }

    useEffect(() => {
        var moyenne =calculateAverage(data_graph)
        console.log("data_graph",data_graph)
        setAverage(moyenne)
    }, [])
    return (

        <div className='flex justify-center ' >
            <div className=" flex flex-col justify-center items-start  w-[180px] h-[180px] bg-[url('/images/bg-card.svg')] bg-size-([100%]) bg-no-repeat bg-center bg-auto md:bg-contain text-white p-4 font-bold">
                <div className='flex  text-primary-50 w-full d-flex justify-content-start bg-primary uppercase text-sm fw-bolder'>{title}</div>
                <div className='fw-bolder  text-black flex mt-2 text-3xl items-end '>{average}<span className='ml-1 text-sm fw-lighter'>{unit}</span>
                </div>
                <div className='bg-white rounded mt-2 w-fit p-2 flex'>
                    <img src={chart} className='cursor-pointer mr-2' />
                    <span className='text-black uppercase text-sm cursor-pointer hover:text-primary'>Voir le détail</span>
                </div>
            </div>

        </div>)
}
export default DataCard;

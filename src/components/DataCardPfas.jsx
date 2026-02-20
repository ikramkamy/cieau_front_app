import { useEffect, useState } from 'react';
import '../app.css'
import chart from '/images/chart.svg';
const DataCardPFAS = ({ value, unit, title,SubTitle, info, data_graph ,onpenInfo}) => {
    const [data, setData] = useState([])
    const [average, setAverage] = useState([])

    function calculateAverage(data) {
        if (!data || data.length === 0) return 'N/C';

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

        <div className='flex justify-center  w-fit' >
            <div className="flex flex-col justify-center items-center  w-[280px] h-[110px] bg-[url('/images/frame2.png')] bg-size-([100%]) bg-no-repeat bg-center bg-auto md:bg-contain text-white p-1 font-bold">
                
                
                <div className=" w-9/12">
                <div className='flex relative  text-primary-50 w-full d-flex justify-content-start items-start flex-col uppercase text-[10px] fw-bolder'
                >{title}

                     <span className='absolute top-3 text-[9px] text-black font-normal'>{SubTitle}</span>
                </div>
               
                <div className='fw-bolder  text-black flex  text-lg items-end '>{average}<span className='ml-1 text-sm fw-lighter'>{unit}</span>
                </div>
                <div className='bg-white rounded-xl  w-fit py-2 px-4 flex' onClick={()=>onpenInfo()}>
                    <img src={chart} className='cursor-pointer mr-2' />
                    <span className='text-black uppercase text-[9px] cursor-pointer hover:text-primary'>Voir le détail</span>
                </div>
                </div>
            </div>

        </div>)
}
export default DataCardPFAS;

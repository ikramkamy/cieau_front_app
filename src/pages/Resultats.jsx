import { useParams } from "react-router-dom";
import DataCard from "../components/DataCard";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../components/Header";


const Results = () => {
    const INSEE = useParams('INSEE').INSEE;
    const PORT = import.meta.env.VITE_PORT;
    const token = import.meta.env.VITE_TOKEN;
    const [chimique, setChimique] = useState([]);
    const [minirals, setMinirals] = useState([]);
    const dataCommunes = useState({})
    async function splitParameters(data) {
        const priorityKeys = ['TH', 'PH', 'CL2TOT', 'PESTOT'];

        const priorityParams = [];
        const otherParams = [];

        Object.keys(data).forEach((key) => {
            if (priorityKeys.includes(key)) {
                priorityParams.push({
                    key,
                    ...data[key]
                });
            } else {
                otherParams.push({
                    key,
                    ...data[key]
                });
            }
        });

        setChimique(priorityParams)
        setMinirals(otherParams)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${PORT}/${INSEE}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                console.log(`${PORT}/${INSEE}`, response);

                splitParameters(response.data.resultats)
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [])



    console.log('chimique', chimique)
    return (
        <div className=" fw-bold">

            <Header />


            <div className="w-full flex justify-center">
                <div className="flex w-[80%]  mt-10  justify-between">
                    <div className="flex flex-wrap justify-start items-start gap-0  w-25 lg:w-25  ">
                        <h1 className="w-full font-bold">Analyse Chimique</h1>

                        <div className="grid grid-cols-1 justify-start items-start  md:grid-cols-2 gap-0 w-full">
                            {chimique.map((e) => <DataCard title={e.key} value={e.params.SISE} unit={e.params.unite} data_graph={e.values} />)}
                        </div>
                    </div>
                    <div className="flex flex-wrap  items-start gap-2 w-50  ">
                        <h1 className="w-full font-bold">Analyse Chimique</h1>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
                            {minirals.map((e) => <DataCard title={e.key} value={e.params.SISE} unit={e.params.unite} data_graph={e.values} />)}
                        </div>
                    </div>

                </div>
            </div>


        </div>)
}

export default Results;
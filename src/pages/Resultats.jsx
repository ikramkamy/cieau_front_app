import { useParams } from "react-router-dom";
import DataCard from "../components/DataCard";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../components/Header";
import CommunePopup from "../components/ConformiteCard"
import frame from '/images/Frame.png'
import InformationPLV from "../components/InformationPLV";
const Results = () => {
    const INSEE = useParams('INSEE').INSEE;
    const PORT = import.meta.env.VITE_PORT;
    const token = import.meta.env.VITE_TOKEN;
    const [chimique, setChimique] = useState([]);
    const [minirals, setMinirals] = useState([]);
    const [dataCommunes, setDataCommunes] = useState({})
    //'NO3', 'SO4','PH', 'CA','MG','K', 'HCO3', 'CLVYL', 'PH'
    // async function splitParameters(data) {
    //     const priorityKeys = ['TH','FMG', , 'CL2TOT', 'PESTOT', 'SPFAS20', 'S4PFAS'];

    //     const priorityParams = [];
    //     const otherParams = [];

    //     Object.keys(data).forEach((key) => {
    //         if (priorityKeys.includes(key)) {
    //             priorityParams.push({
    //                 key,
    //                 ...data[key]
    //             });
    //         } else {
    //             otherParams.push({
    //                 key,
    //                 ...data[key]
    //             });
    //         }
    //     });

    //     setChimique(priorityParams)
    //     setMinirals(otherParams)
    // }
    async function splitParameters(data) {
        const priorityKeys = ['TH', 'FMG', 'CL2TOT', 'PESTOT', 'SPFAS20', 'S4PFAS'];

        const priorityParams = [];
        const otherParams = [];

        // Ensure priority keys always exist
        priorityKeys.forEach((key) => {
            if (data[key]) {
                priorityParams.push({
                    key,
                    params: data[key]
                });
            } else {
                priorityParams.push({
                    key,
                    params: {
                        SISE: 'N/C',
                        unite: ''
                    }
                });
            }
        });

        // Handle remaining keys
        Object.keys(data).forEach((key) => {
            if (!priorityKeys.includes(key)) {
                otherParams.push({
                    key,
                    params: data[key]
                });
            }
        });

        setChimique(priorityParams);
        setMinirals(otherParams);
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
                setDataCommunes({
                    bacterio: response.data.bacterio,
                    date: response.data.dernier_plv_date,
                    conclusion: response.data.conclusion,
                })
            } catch (err) {
                console.error(err);
            }
        };


        fetchData();
    }, [])



    console.log('chimique', chimique, minirals)
    return (
        <div className="fw-bold flex flex-col justify-center items-center">

            <Header />


            <div className="w-full flex justify-center">
                <div className="flex w-[80%]   mt-10  justify-evenly">
                    <div className="flex flex-col   w-[30%] lg:w-25  ">
                        <h1 className="w-full font-bold">Analyse Chimique</h1>


                        <div className="flex   w-full flex-col ">
                            <div className="grid grid-cols-1 justify-center items-start  md:grid-cols-2 gap-2 w-full">
                                {chimique.map((e) => <DataCard title={e.key} value={e.params.SISE} unit={e.params.unite} data_graph={e.params.values} />)}


                            </div>
                            <div className="flex mt-2 w-full justify-start h-10  ">
                                <CommunePopup conclusion={dataCommunes.conclusion} />
                                {/* <div className="flex flex-col w-11/12">

                                    <div className="header w-[450px] relative   bg-tertiary-50 py-4 px-2">
                                        <img src={frame} alt="frame" className="w-full h-[35%] absolute" />
                                        <div className="flex justify-between ">
                                            <span className="uppercase font-bold text-xs">
                                                conformité bactériologique :
                                            </span>
                                            <div> {dataCommunes.bacterio === 1 ? (
                                                <span className="text-success-100 flex items-center">
                                                    <div className="w-2 h-2 bg-success-100 shadow-lg rounded-full mr-1"></div>
                                                    <div>oui</div>
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <div className="w-2 h-2 bg-red-500 shadow-lg rounded-full mr-1"></div>
                                                    <div>non</div>
                                                </span>
                                            )}
                                            </div>


                                        </div>
                                        <div>
                                            <div className="w-full flex justify-between font-bold ">
                                                <span>Date Derniers Prélèvements:</span>
                                                <span>{dataCommunes.date || "Non disponible"}</span>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-[450px] h-[10vh] ">
                                        <p className=" text-start"> {dataCommunes.conclusion}</p>
                                     
                                    </div>




                                </div> */}


                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col  gap-0  w-25 lg:w-25  ">
                        <h1 className="w-full font-bold">Composition minéral</h1>


                        <div className="flex w-full justify-start  flex-col">
                            <div className="grid grid-cols-1 justify-start items-start  md:grid-cols-2 gap-2 w-full">
                                {minirals.map((e) => <DataCard title={e.key} value={e.params.SISE} unit={e.params.unite} data_graph={e.params.values} />)}


                            </div>
                            <div className="w-50 flex justify-center  bg-red-300">
                                {/* <CommunePopup conclusion={dataCommunes.conclusion} /> */}
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div className="w-[60%] mt-10 ">
                <InformationPLV />
            </div>


        </div >)
}

export default Results;
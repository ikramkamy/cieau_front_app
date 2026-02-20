import { useParams } from "react-router-dom";
import DataCard from "../components/DataCard";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../components/Header";
import CommunePopup from "../components/ConformiteCard"
import frame from '/images/Frame.png'
import InformationPLV from "../components/InformationPLV";
import ChemicalElementModal from "../components/PopuP";
import DataCardPFAS from "../components/DataCardPfas";
const Results = () => {
    const INSEE = useParams('INSEE').INSEE;
    const PORT = import.meta.env.VITE_PORT;
    const token = import.meta.env.VITE_TOKEN;
    const [chimique, setChimique] = useState([]);
    const [minirals, setMinirals] = useState([]);
    const [dataCommunes, setDataCommunes] = useState({})
    const [showPopup, setShowPopup] = useState(false)
    const [selectedelement, setSelectedelement] = useState()
    //'NO3', 'SO4','PH', 'CA','MG','K', 'HCO3', 'Na' ,
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
    // async function splitParameters(data) {
    //     const priorityKeys = ['TH', 'FMG', 'CL2TOT', 'PESTOT', 'SPFAS20', 'S4PFAS'];
    //     const secondaryKeys = ['NO3', 'SO4', 'PH', 'CA', 'MG', 'K', 'HCO3', 'Na'];

    //     const priorityParams = [];
    //     const otherParams = [];

    //     // 🔹 Handle priority keys (always present)
    //     priorityKeys.forEach((key) => {
    //         priorityParams.push({
    //             key,
    //             params: data[key] || {
    //                 SISE: 'N/C',
    //                 unite: '',
    //                 values: []
    //             }
    //         });
    //     });

    //     secondaryKeys.forEach((key) => {
    //         otherParams.push({
    //             key,
    //             params: data[key] || {
    //                 SISE: 'N/C',
    //                 unite: ''
    //             }
    //         });
    //     });

    //     setChimique(priorityParams);
    //     setMinirals(otherParams);
    // }
    async function splitParameters(data) {

        const parametersMeta = {
            TH: {
                SubTitle: "",
                commercialName: "Total Hardness",
                description: "Measures calcium and magnesium concentration in water."
            },
            FMG: {
                SubTitle: "",
                commercialName: "Magnesium",
                description: "Magnesium concentration contributing to water hardness."
            },
            CL2TOT: {
                SubTitle: "",
                commercialName: "Total Chlorine",
                description: "Total chlorine residual present in water."
            },
            PESTOT: {
                SubTitle: "",
                commercialName: "Total Pesticides",
                description: "Sum of detected pesticide residues in water."
            },
           SPFAS20: {
    SubTitle: "(Total des principaux PFAS surveillés dans l'eau potable)",
    commercialName: "PFAS – 20 substances réglementées",
    description: `Les PFAS sont une grande famille de composés chimiques utilisés depuis les années 1950 pour leurs propriétés antiadhésives, imperméabilisantes et résistantes à la chaleur.
On les retrouve dans certains revêtements antiadhésifs, textiles, emballages alimentaires, mousses anti-incendie et de nombreux produits industriels.
Ils se dégradent très lentement dans l'environnement et peuvent ainsi s'accumuler dans l'eau, les sols et les organismes vivants. Leur recherche est désormais obligatoire dans l'eau potable, avec des valeurs réglementaires fixées pour protéger la santé du consommateur.
<br/>
Parmi les 20 PFAS suivis, 4 d'entre eux (PFOS, PFOA, PFNA, PFHxS) disposent aussi d'une valeur réglementaire spécifique.
<br/>
Les résultats présentés ici indiquent les concentrations mesurées dans votre eau et permettent de les comparer aux seuils réglementaires en vigueur
<br/>
<strong>Somme des 4 PFAS</strong><br/>
Valeur mesurée : <span class="text-red-600 font-bold">0,027</span> µg/L<br/>
Valeur réglementaire : 0,02 µg/L
`
},
            S4PFAS: {
                SubTitle: "(4 PFAS particulièrement surveillés au niveau sanitaire)",
                commercialName: "PFAS – 4 substances prioritaires",
                description: `Les PFAS sont une grande famille de composés chimiques utilisés depuis les années 1950 pour leurs propriétés antiadhésives, imperméabilisantes et résistantes à la chaleur.
On les retrouve dans certains revêtements antiadhésifs, textiles, emballages alimentaires, mousses anti-incendie et de nombreux produits industriels.
Ils se dégradent très lentement dans l'environnement et peuvent ainsi s'accumuler dans l'eau, les sols et les organismes vivants. Leur recherche est désormais obligatoire dans l'eau potable, avec des valeurs réglementaires fixées pour protéger la santé du consommateur. 

Parmi les 20 PFAS suivis, 4 d'entre eux (PFOS, PFOA, PFNA, PFHxS) disposent aussi d'une valeur réglementaire spécifique. 

Les résultats présentés ici indiquent les concentrations mesurées dans votre eau et permettent de les comparer aux seuils réglementaires en vigueur

Somme des 4 PFAS
Valeur mesurée : 0,027 µg/L
Valeur réglementaire : 0,02 µg/L
`
            },
            NO3: {
                SubTitle: "",
                commercialName: "Nitrates",
                description: "Indicates agricultural contamination risk."
            },
            SO4: {
                SubTitle: "",
                commercialName: "Sulfates",
                description: "Naturally occurring mineral affecting taste."
            },
            PH: {
                SubTitle: "",
                commercialName: "pH",
                description: "Indicates acidity or alkalinity of water."
            },
            CA: {
                SubTitle: "",
                commercialName: "Calcium",
                description: "Essential mineral contributing to hardness."
            },
            MG: {
                SubTitle: "",
                commercialName: "Magnesium",
                description: "Mineral contributing to total hardness."
            },
            K: {
                SubTitle: "",
                commercialName: "Potassium",
                description: "Naturally present mineral element."
            },
            HCO3: {
                SubTitle: "",
                commercialName: "Bicarbonates",
                description: "Responsible for buffering capacity of water."
            },
            Na: {
                SubTitle: "",
                commercialName: "Sodium",
                description: "Salt-related mineral, important for taste and diet."
            }
        };

        const priorityKeys = ['TH', 'FMG', 'CL2TOT', 'PESTOT', 'SPFAS20', 'S4PFAS'];
        const secondaryKeys = ['NO3', 'SO4', 'PH', 'CA', 'MG', 'K', 'HCO3', 'Na'];

        const priorityParams = [];
        const otherParams = [];

        priorityKeys.forEach((key) => {
            priorityParams.push({
                key,
                commercialName: parametersMeta[key]?.commercialName || key,
                description: parametersMeta[key]?.description || "",
                SubTitle: parametersMeta[key]?.SubTitle,
                params: data[key] || {
                    SISE: 'N/C',
                    unite: '',
                    values: []
                }
            });
        });

        secondaryKeys.forEach((key) => {
            otherParams.push({
                key,
                commercialName: parametersMeta[key]?.commercialName || key,
                description: parametersMeta[key]?.description || "",
                params: data[key] || {
                    SISE: 'N/C',
                    unite: ''
                }
            });
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

    const closeInfo = (e) => {
        console.log('target', e)
        setShowPopup(!showPopup)
        setSelectedelement(e)
    }

    console.log('chimique', chimique, minirals)
    return (
        <div className="fw-bold flex flex-col justify-center items-center">

            <Header />


            <div className="w-full flex justify-center">
                <div className="flex w-[80%]   mt-10  justify-evenly">
                    <div className="flex flex-col   w-[50%] lg:w-25  ">
                        <h1 className="w-full font-bold mb-1">Analyse Chimique</h1>


                        <div className="flex   w-full flex-col ">
                            <div className="grid grid-cols-1 justify-center items-start  md:grid-cols-2 gap-2 w-full">
                                {chimique.map((e, index) => <DataCard key={index}  SubTitle={e.SubTitle}  onpenInfo={() => closeInfo(e)} info={e} title={e.commercialName} value={e.params.SISE} unit={e.params.unite} data_graph={e.params.values} />)}


                            </div>
                            <div className="flex  mt-2 w-full justify-center h-10">
                                <CommunePopup conclusion={dataCommunes.conclusion} />
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col   w-[50%] lg:w-25  ">
                        <h1 className="w-full font-bold mb-1">Composition minéral</h1>


                        <div className="flex w-full justify-start  flex-col">
                            <div className="grid grid-cols-1 justify-start items-start  md:grid-cols-2 gap-2 w-full">
                                {minirals.map((e, index) => <div>
                                    <DataCard key={index} SubTitle={e.SubTitle} onpenInfo={() => closeInfo(e)} title={e.commercialName} value={e.params.SISE} unit={e.params.unite} data_graph={e.params.values} />

                                    {showPopup && <div className="h-full w-full bg-primary-50"><ChemicalElementModal
                                        onClose={closeInfo} definition={selectedelement.description} info={selectedelement} elementName={selectedelement.key} chartTitle={`ÉVOLUTION DU ${selectedelement.key} SUR 12 MOIS`} /></div>}

                                </div>
                                )}

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

<div className="relative bg-blue-50 rounded-[2rem] p-6 overflow-hidden">
  {/* Optional: Add subtle highlight effect */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-20 rounded-full -mr-8 -mt-8 blur-xl"></div>
  
  <div className="relative z-10">
    <h3 className="text-blue-600 font-bold text-sm uppercase mb-2">
      FLUOR
    </h3>
    <p className="text-gray-800 text-3xl font-bold mb-4">
      0.2 <span className="text-lg font-normal text-gray-600">mg/L</span>
    </p>
    
    <button className="bg-white rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      VOIR LE DÉTAIL
    </button>
  </div>
</div>
        </div >)
}

export default Results;
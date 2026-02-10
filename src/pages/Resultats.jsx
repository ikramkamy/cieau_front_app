import { useParams } from "react-router-dom";
import DataCard from "../components/DataCard";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";



const Results = () => {
    const INSEE = useParams('INSEE').INSEE;
    const PORT = import.meta.env.VITE_PORT;
    const token = import.meta.env.VITE_TOKEN;

    const dataCommunes = useState({})
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
                console.log(`${PORT}/${INSEE}`,response);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [])
    return (<div className="bg-dark fw-bold">


        <DataCard />
    </div>)
}

export default Results;
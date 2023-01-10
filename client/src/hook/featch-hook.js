import axios from "axios";
import { useEffect, useState } from "react";
import { getuserName } from '../helper/helper'

axios.defaults.baseURL = 'http://localhost:8080';


/** custom hook */
export default function useFetch(){
    const [getData, setData] = useState({ isLoading : false, apiData: null, status: null, serverError: null })

    useEffect(() => {

        const fetchData = async () => {
            try {
                const { username } = await getuserName();
                
                setData(prev => ({ ...prev, isLoading: true}));
                
                const { data, status } =  await axios.get(`/api/getUser/${username}`);
                
                if(status === 201){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }

                setData(prev => ({ ...prev, isLoading: false}));
                
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };

        fetchData()

    }, []);

    return [getData, setData];
    
}
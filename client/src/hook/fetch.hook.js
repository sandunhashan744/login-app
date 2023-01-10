// import axios from "axios";
// import { useEffect, useState } from "react";
// import { getuserName } from '../helper/helper'

// axios.defaults.baseURL = 'http://localhost:8080';

// export default function useData() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//         const { username } = await getuserName();

//         const response = await axios.get(`/api/getUser/${username}`);
//         console.log(response)
//         const newData = await response.json();
//         setData(newData);
//     };

//     fetchData();

//   }, []);

//   return [data, setData];
// }
import React,{useContext,useEffect,useState} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import Moment from "moment";
import { Chart } from "react-chartjs-2";
import { creatorContext } from "../../Context/CreatorState";
import ServiceContext from "../../Context/services/serviceContext";
import { host } from "../../config/config";

function Test() {
  ChartJS.register(
    ...registerables,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const [allSubscribers, setallSubscribers] = useState()

  const getAllSubscribers = async(date,month,year) => {
    const response = await fetch(`${host}/api/subscribe/getall?date=${date}&month=${month}&year=${year}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "jwt-token": localStorage.getItem('jwtToken')
        }
    })
    const json = await response.json()
    if(json.success){
        setallSubscribers(json.res)
    }

}


useEffect(() => {
  getAllSubscribers(22,9,2022)

}, [])


const {getallservices,services} =  useContext(ServiceContext)


const [queryDataLabels, setQueryDataLabels] = useState([])
let object2 ={}


for (let index = allSubscribers?.length-1; index >= 0; index--) {
  let e = allSubscribers[index]
  let datefound = Moment(e?.subscribedOn).format("DD/MM")
  if(!object2.hasOwnProperty([datefound])){
    object2[datefound] = 1;
  }
  else{
    object2[datefound]++ ;
  }
  
}



  return (
    <div style={{width:"70vw",height:"50vh"}}>
      <h2>Charts and Graphs</h2>
      <Chart
        type="bar"
        data={{
          labels: Object.keys(object2),
          datasets: [
            {
              label: "Number of Subscribers / Day",
              data: Object.values(object2),
              backgroundColor: [
                "rgb(115,220,189,0.8)",
                
              ],
              borderColor: [
                "rgb(115,220,189,0.8)",
    
              ],
              borderWidth: 1,
              width:5
            },
        ],
        }}
        options={{
          animation:{
            duration:1000,
            easing:"easeInBounce"
          },
          pan: {
            // Boolean to enable panning
            enabled: true,

            // Panning directions. Remove the appropriate direction to disable 
            // Eg. 'y' would only allow panning in the y direction
            mode: 'y',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            speed: 10
          }
        }}
       
        width={600} 
        height={300}
      />
    </div>
  );
}

export default Test;


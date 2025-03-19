import customAxios from "@/api/customAxios";
import { appContext } from "@/context/ContextProvider";
import React, { useContext, useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";


const chartConfig = {
  formation: {
    label: "participants",
    color: "#2563eb",
  },
};

const ChartComponent = () => {

    const {token} = useContext(appContext);

    const [participantsPerFormation,setParticipantsPerFormation] = useState([]);
    
// get Participants Per Formation 
  const getParticipantsPerFormation = async () => {
    const response = await customAxios.get('charts/participants-par-formation', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setParticipantsPerFormation(response.data);
    console.log(response.data);

  }

  useEffect(() => {
    getParticipantsPerFormation();
  }, []);

    // format data for chart   
  const chartData =  participantsPerFormation.map( el => ( { intitule: el.intitule , participants : el.nbr_participants } ) ) ;


  return (
    <div className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="intitule" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="participants" fill={chartConfig.formation.color} radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;

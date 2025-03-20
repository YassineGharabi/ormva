import customAxios from "@/api/customAxios";
import { appContext } from "@/context/ContextProvider";
import React, { useContext, useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis,  Legend, ResponsiveContainer, Tooltip } from "recharts";


const chartConfig = {
  formation: {
    label: "participants",
    color: "#2563eb",
  },
};

const TauxDePresenceParToutFormation = () => {

  const {token} = useContext(appContext);

  const [tauxDePresence,setTauxDePresence] = useState([]);
    
  // get Participants Per Formation 
    const getTauxDePresence = async () => {
      const response = await customAxios.get('charts/taux-presence-absence', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setTauxDePresence(response.data);
      console.log(response.data);
  
    }
  
    useEffect(() => {
      getTauxDePresence();
    }, []);



  return (
    <div className="min-h-[180px] w-full relative">
      <ResponsiveContainer width="100%" >
        <BarChart data={[tauxDePresence]}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip/>
          <Legend />
          <Bar dataKey="Presence" fill={chartConfig.formation.color} radius={4} />
          <Bar dataKey="Absence" fill={chartConfig.formation.color} radius={4} />
        </BarChart>
      </ResponsiveContainer>
      <span className="text-black/85 font-semibold text-center absolute bottom-7 left-7" >Taux de présence et d'absence</span>
    </div>
  );
};

export default TauxDePresenceParToutFormation;

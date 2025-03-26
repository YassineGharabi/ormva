import { Bar, BarChart, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton"


const chartConfig = {
  formation: {
    label: "participants",
    color: "#2563eb",
  },
};

const TauxDePresenceParToutFormation = ({tauxDePresence,loading}) => {

  return (
    <div className="min-h-[180px] w-full relative">
      {
        loading ?
          <Skeleton className='w-full h-full' /> :
          <>
            <ResponsiveContainer width="100%" >
              <BarChart data={[tauxDePresence]}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Presence" fill={chartConfig.formation.color} radius={4} />
                <Bar dataKey="Absence" fill={chartConfig.formation.color} radius={4} />
              </BarChart>
            </ResponsiveContainer>
            <span className="text-black/85 dark:text-white font-semibold text-center absolute bottom-7 left-7" >Taux de présence et d'absence</span>
          </>
      }
    </div>
  );
};

export default TauxDePresenceParToutFormation;

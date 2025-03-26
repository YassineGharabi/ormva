import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";


const chartConfig = {
  formation: {
    label: "participants",
    color: "#2563eb",
  },
};

const NombreDeParticipantsParFormation = ({participantsPerFormation,loading}) => {

  // format data for chart   
  const chartData = participantsPerFormation.map(el => ({ intitule: el.intitule, participants: el.nbr_participants }));


  return (
    <div className="min-h-[200px] w-full relative">
      {
        loading ?
          <Skeleton className='w-full h-[360px]' /> :
          <>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={chartData}>
                <XAxis dataKey="intitule" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="participants" fill={chartConfig.formation.color} radius={4} />
              </BarChart>
            </ResponsiveContainer>
            <span className="text-black/85 dark:text-white font-semibold text-center absolute bottom-[-20px] left-28" >Répartition du nombre de participants par formation</span>
          </>
      }
    </div>
  );
};

export default NombreDeParticipantsParFormation;

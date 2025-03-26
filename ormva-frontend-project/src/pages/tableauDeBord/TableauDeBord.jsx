import customAxios from '@/api/customAxios'
import { appContext } from '@/context/ContextProvider'
import { useContext, useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Brain, BriefcaseBusiness, Users } from 'lucide-react'
import TauxDePresenceParToutFormation from './TauxDePresenceParToutFormation'
import NombreDeFormationParAnnee from './NombreDeFormationParAnnee'
import { Skeleton } from '@/components/ui/skeleton'
import NombreDeParticipantsParFormation from './NombreDeParticipantsParFormation'



const TableauDeBord = () => {

  const { token } = useContext(appContext);

  const [totalCountData, setTotalCountData] = useState([]);

  const [nombreParAnnee, setNombreParAnnee] = useState({});

  const [participantsPerFormation, setParticipantsPerFormation] = useState([]);

  const [tauxDePresence, setTauxDePresence] = useState([]);

  const [loading, setLoading] = useState(true);


  // this function to get all data for tableau de bord


  const getTableauDeBordData = async () => {

    try {

      const [totalCount, formationsParAnnee, participantsParFormation, tauxPresence] = await Promise.all([
        customAxios.get('charts/total-count', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        customAxios.get('charts/formation-par-annee', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        customAxios.get('charts/participants-par-formation', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        customAxios.get('charts/taux-presence-absence', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      ]);

      if ([totalCount, formationsParAnnee, participantsParFormation, tauxPresence].every(response => response.status == 200)) 
      {
        setTotalCountData(totalCount.data);
        setNombreParAnnee(formationsParAnnee.data);
        setParticipantsPerFormation(participantsParFormation.data);
        setTauxDePresence(tauxPresence.data);
        setLoading(false);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getTableauDeBordData();
  }, []);


  const cardData = [
    {
      name: 'Formateurs',
      value: totalCountData.fourmateurs_n_total,
      icon: <BriefcaseBusiness className="h-4 w-4 text-gray-600 " />,
      route: 'fourmateur'
    },
    {
      name: 'Participants',
      value: totalCountData.employes_n_total,
      icon: <Users className="h-4 w-4 text-gray-600 " />,
      route: 'employes'
    },
    {
      name: 'Formations',
      value: totalCountData.formations_n_total,
      icon: <Brain className="h-4 w-4 text-gray-600 " />,
      route: 'formations'
    }
  ];


  return (
    <>
      <div className='grid grid-cols-4 gap-3 ' >
        {
          cardData.map((data, key) =>
            loading ?
              <Skeleton key={key} /> :
              <Card key={key} >
                <CardHeader>
                  <CardTitle className='flex justify-between items-center font-medium ' > {data.name} {data.icon}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-2xl font-bold' >{data.value}</p>
                  <CardDescription>Nombre total</CardDescription>
                </CardContent>
              </Card>
          )
        }
        <TauxDePresenceParToutFormation tauxDePresence={tauxDePresence} loading={loading} />

      </div>
      <div className='grid grid-cols-2 gap-3 items-center' >
        <NombreDeParticipantsParFormation participantsPerFormation={participantsPerFormation} loading={loading} />
        <NombreDeFormationParAnnee nombreParAnnee={nombreParAnnee} loading={loading} />
      </div>
    </>
  )
}

export default TableauDeBord
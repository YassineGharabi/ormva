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
import ChartComponent from './NombreDeParticipantsParFormation'
import TauxDePresenceParToutFormation from './TauxDePresenceParToutFormation'
import NombreDeFormationParAnnee from './NombreDeFormationParAnnee'



const TableauDeBord = () => {

  const { token } = useContext(appContext);

  const [totalCountData, setTotalCountData] = useState([]);

  // get total of formation , fourmateurs , employes
  const getTotal = async () => {
    const response = await customAxios.get('charts/total-count', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setTotalCountData(response.data);

  }

  useEffect(() => {
    getTotal();
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
        <TauxDePresenceParToutFormation/>

      </div>
      <div className='grid grid-cols-2 gap-3 items-center' >
        <ChartComponent />
        <NombreDeFormationParAnnee/>
      </div>
    </>
  )
}

export default TableauDeBord
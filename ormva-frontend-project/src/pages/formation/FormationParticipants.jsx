import customAxios from '@/api/customAxios';
import SelectWithSearch from '@/components/CustomSelect';
import { DataTable } from '@/components/table/Data-table';
import { Button } from '@/components/ui/button';
import { appContext } from '@/context/ContextProvider';
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const FormationParticipants = () => {

    const {id} = useParams();

    const {token} = useContext(appContext);

    const [participants,setParticipants] = useState([]);

    const [showSelect,setShowSelect] = useState(false);

    const [selectedEmployes , setSelectedEmployes ] = useState([]);

    const [runEffect , setRunEffect ] = useState(0);
 
    const [employes , setEmployes] = useState([]);

    const [formation , setFormation ] = useState([]);

    // function to add partisipants to formation

    const assignParticipants = async () => {

      try{
        const response = await customAxios.post(`assign-employe/${id}`,{
          selectedEmployes : selectedEmployes
        },{
          headers : {
            Authorization : `Bearer ${token}`
          }
        });

        if( response.status == 200 ){
            toast.success('Ajouté avec succès', {
              duration: 2000
            });
          setRunEffect(runEffect + 1);
          setSelectedEmployes([]);
        }

      }catch(err){
        toast.error('L\'employé ou les employés sont déjà participants à cette formation.');
        setRunEffect(runEffect + 1);
        setSelectedEmployes([]);
        console.error(err);
      }
    }

    // funstion to get all employes
    const getEmployes = async () => {
      try {
        const response = await customAxios.get('employes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (response.status == 200) {
          setEmployes(response.data.data);
        }
  
      } catch (err) {
        console.error(err);
      }
    }
  
    useEffect(() => {
        getEmployes();
    }, [showSelect]);
  


    // funstion to get all participant belong to a formation
    const getParticipants = async () =>{
        try{

            const response = await customAxios.get(`formation-participant/${id}`,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
    
            if(response.status == 200){
              setParticipants(response.data.employes);
              setFormation(response.data);
            }

        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        getParticipants();
    },[runEffect]);


      // columns of table
  const columns = [
    {
      accessorKey: "id",
      header: "#ID",
      cell: ({ row  }) => {
        return <span >{row.index + 1}</span>
      },
    },
    {
      accessorKey: "nom_complet",
      header: "Nom de employe",
    },
    {
      accessorKey: "matricule",
      header: "Matricule",
    },
    {
      accessorKey: "pivot.presence",
      header: "Presence",
      cell: ({ row  }) => {
        const presence = row.getValue('pivot_presence');
        return <span >{presence ? 'Présent' : 'Absent' }</span>
      },
    },
    {
      accessorKey: "pivot.note",
      header: "note",
    }
];
  return (
    <>
        <h1 className='uppercase font-semibold tracking-wider' >La liste des participants à la formation  <span className='underline' >{formation?.intitule}</span> </h1>
        <div className={`flex  ${ showSelect ? 'justify-between' : 'justify-end' } `} >
          {
            showSelect &&
            <div className='flex gap-1' >
            <div >
              {/* this in some check if the current employe id === partisipant id and filter filtring by this condition */}
              <SelectWithSearch options={ employes.filter(employe => !participants.some(participant => participant.id === employe.id))} setSelectedEmployes={setSelectedEmployes} selectedEmployes={selectedEmployes}  />
            </div>
            <Button onClick={assignParticipants} className='mt-0.5' >Valider</Button>
            </div>
          }
            <Button onClick={()=>setShowSelect(true)}  >Ajout de participants</Button>
        </div>
        <DataTable columns={columns} data={participants} />
    </>
  )
}

export default FormationParticipants
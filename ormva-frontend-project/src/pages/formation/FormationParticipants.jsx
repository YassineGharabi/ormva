import customAxios from '@/api/customAxios';
import SelectWithSearch from '@/components/CustomSelect';
import { DataTable } from '@/components/table/Data-table';
import { Button } from '@/components/ui/button';
import { appContext } from '@/context/ContextProvider';
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, SquarePen, Trash, Trash2Icon } from 'lucide-react';
import ParticipantUpdate from './ParticipantUpdate';


const FormationParticipants = () => {
    // id of current formation
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
          selectedEmployes : selectedEmployes ,
          date_d : formation.date_debut ,
          date_f : formation.date_fin
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
        if(err.response.status == 400){
          toast.error(`${err.response.data.message} : ${err.response.data.participants?.map( name => name )}`);
        }
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

    // function that handle remove employe from formation

    const handleRemove = async ( id , employe_id ) => {

        try{
          const deletingLoading = toast.loading('Veuillez patienter');
          const response = await customAxios.post(`remove-employe/${id}`,{ employe_id : employe_id },{
            headers : {
              Authorization : `Bearer ${token}`
            }
          });

          if( response.status == 200 ){
            toast.dismiss(deletingLoading);
            setRunEffect(runEffect + 1);
            setTimeout(()=>{ // Short delay before showing success toast to not be prevent by toast dismiss
              toast.success(response.data.message, {
                duration: 2000,
                icon: <Trash2Icon />
              })});
          }
          
        }catch(err){
          toast.dismiss(deletingLoading);
          console.error(err);
        }
    }


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
    }    // column of actions
    ,{
      id: "actions",
      cell: ({ row }) => {
        const employe = row.original
        const employe_id = employe.id;
        const [openUpdateDialog,setOpenUpdateDialog] = useState(false);
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog} >
                <DialogTrigger className='flex gap-2 items-center text-sm px-2 py-1 rounded-sm w-full hover:bg-gray-600/5 dark:hover:bg-[#262626] my-1' >
                  <SquarePen className="h-4 w-4 text-gray-600 cursor-pointer" /> Modifier
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Formailire de Modification</DialogTitle>
                    <DialogDescription>Participant : { employe.nom_complet } </DialogDescription>
                    <ParticipantUpdate employe={employe} id={id} setOpenUpdateDialog={setOpenUpdateDialog} setRunEffect={setRunEffect} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <AlertDialog>
              <AlertDialogTrigger className='flex gap-2 items-center text-sm px-2 py-1 rounded-sm w-full hover:bg-gray-600/5 dark:hover:bg-[#262626] my-1' > <Trash className='w-4 h-4 text-gray-600' /> Supprimer</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>En êtes-vous absolument sûre ?</AlertDialogTitle>
                  <AlertDialogDescription>
                  Cela retire définitivement l'employé de cette formation.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={()=>handleRemove( id , employe_id )}  >Supprimer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>


            </DropdownMenuContent>

          </DropdownMenu>
        )
      },
    },
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
import customAxios from '@/api/customAxios';
import { DataTable } from '@/components/table/Data-table'
import { appContext } from '@/context/ContextProvider';
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

import React, { useContext, useEffect, useState } from 'react'

import { SquarePen, Trash } from "lucide-react"
import { toast } from 'sonner';




const FourmateurList = () => {

  const [fourmateurs, setFourmateurs] = useState([]);
  const { token } = useContext(appContext);

  const handleDelete = async (id) =>{
    try{
      // delete fourmateur on db
      const response = await customAxios.delete(`fourmateurs/${id}`,{
        headers : {
          Authorization : `Bearer ${token}`,
        }
      });
      console.log(response);
      // delete fourmateur in client side
      if(response.status == 200){
        setFourmateurs( fourmateurs.filter( fourmateur => fourmateur.id !== id  ));
        toast.success('Supprimer avec succès');
      }
      
    }catch(err){
      console.error(err)
    }

  }

  const columns = [
    {
      accessorKey: "id",
      header: "#ID",
    },
    {
      accessorKey: "nom",
      header: "Nom",
    },
    {
      accessorKey: "contact",
      header: "Contact",
    },
    {
      accessorKey: "domain",
      header: "Domain",
    },
    {
      accessorKey: "entreprise",
      header: "Entreprise",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const fourmateur = row.original
        const { id , nom}  = fourmateur;


        return (
          <span className='flex items-center gap-2 '>
            <SquarePen className="h-4 w-4 cursor-pointer" />
            {/* alert dialogue */}
            <AlertDialog>
              <AlertDialogTrigger><Trash className="h-4 w-4 cursor-pointer" /></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>En êtes-vous absolument sûre ?</AlertDialogTitle>
                  <AlertDialogDescription>
                  Cela supprimera définitivement ce fourmateur {nom}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={()=>handleDelete(id)} >Supprimer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </span>
        )
      },
    },
  ];

  const getFourmateurs = async () => {
    try {
      const response = await customAxios.get('fourmateurs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status == 200) {
        setFourmateurs(response.data.data);
      }

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getFourmateurs();
  }, []);

  return (
    <>
      <DataTable columns={columns} data={fourmateurs} />
    </>
  )
}

export default FourmateurList
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import React, { useContext, useEffect, useState } from 'react'

import { SquarePen, Trash, Trash2Icon } from "lucide-react"
import { toast } from 'sonner';
import FourmateurUpdate from './FourmateurUpdate';




const FourmateurList = () => {


  const { token , setFourmateurs , fourmateurs} = useContext(appContext);
  // to run effect to get fourmateurs after updating
  const [runEffect,setRunEffect] = useState(0);

  const handleDelete = async (id) => {
    const deletingLoading = toast.loading('Veuillez patienter');
    try {
      // delete fourmateur on db
      const response = await customAxios.delete(`fourmateurs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      // delete fourmateur in client side
      if (response.status == 200) {
        toast.dismiss(deletingLoading);
        setFourmateurs(fourmateurs.filter(fourmateur => fourmateur.id !== id));

        setTimeout(()=>{ // Short delay before showing success toast to not be prevent by toast dismiss
          toast.success(response.data.message, {
            duration: 2000,
            icon: <Trash2Icon />
          });
        },100);

      }

    } catch (err) {
      console.error(err);
      toast.dismiss(deletingLoading);

    }

  }
  // columns of table
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
    // column of actions
    {
      id: "actions",
      cell: ({ row }) => {
        const fourmateur = row.original
        const { id, nom } = fourmateur;
        const [openUpdateDialog,setOpenUpdateDialog] = useState(false);

        return (
          <span className='flex items-center gap-2 '>
            <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog} >
              <DialogTrigger>
                <SquarePen className="h-4 w-4 cursor-pointer" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Formailire de Modifier</DialogTitle>
                  <DialogDescription>Fourmateur : {nom}</DialogDescription>
                  <FourmateurUpdate fourmateur={fourmateur} setOpenUpdateDialog={setOpenUpdateDialog} setRunEffect={setRunEffect} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
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
                  <AlertDialogAction onClick={() => handleDelete(id)} >Supprimer</AlertDialogAction>
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
  }, [runEffect]);

  return (
    <>
      <DataTable columns={columns} data={fourmateurs} />
    </>
  )
}

export default FourmateurList
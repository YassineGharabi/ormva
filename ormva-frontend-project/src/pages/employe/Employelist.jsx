import customAxios from '@/api/customAxios';
import { DataTable } from '@/components/table/Data-table'
import { appContext } from '@/context/ContextProvider';
import { MoreHorizontal, SquarePen, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import React, { useContext, useEffect, useState } from 'react'

import {  Trash2Icon } from "lucide-react"
import { toast } from 'sonner';
import EmployeUpdate from './EmployeUpdate';







const Employelist = () => {


  const { token , setEmployes , employes } = useContext(appContext);
  // to run effect to get fourmateurs after updating
  const [runEffect,setRunEffect] = useState(0);


  const handleDelete = async (id) => {
    const deletingLoading = toast.loading('Veuillez patienter');
    try {
      // delete fourmateur on db
      const response = await customAxios.delete(`employes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      // delete fourmateur in client side
      if (response.status == 200) {
        toast.dismiss(deletingLoading);
        setEmployes(employes.filter(employe => employe.id !== id));

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
      cell: ({ row  }) => {
        return <span >{row.index + 1}</span>
      },
    },
    {
      accessorKey: "nom_complet",
      header: "Nom",
    },
    {
      accessorKey: "matricule",
      header: "Matricule",
    },
    {
      accessorKey: "cin",
      header: "Cin",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "service",
      header: "Service",
    },
    {
      accessorKey: "bureau",
      header: "Bureau",
    },
    // column of actions
    {
      id: "actions",
      cell: ({ row }) => {
        const employe = row.original
        const {id , nom_complet} = employe;
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
              <DropdownMenuItem>Suivi les fourmations</DropdownMenuItem>

              <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog} >
              <DialogTrigger className='flex gap-2 items-center text-sm px-2 py-1 rounded-sm w-full hover:bg-gray-600/5 dark:hover:bg-[#262626] my-1' >
                <SquarePen className="h-4 w-4 text-gray-600 cursor-pointer" /> Modifier
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Formailire de Modifier</DialogTitle>
                  <DialogDescription>Employe : {nom_complet} </DialogDescription>
                  <EmployeUpdate employe={employe} setOpenUpdateDialog={setOpenUpdateDialog} setRunEffect={setRunEffect} />
                </DialogHeader>
              </DialogContent>
            </Dialog>

              <AlertDialog>
              <AlertDialogTrigger className='flex gap-2 items-center text-sm px-2 py-1 rounded-sm w-full hover:bg-gray-600/5 dark:hover:bg-[#262626] my-1' > <Trash className='w-4 h-4 text-gray-600' /> Supprimer</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>En êtes-vous absolument sûre ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cela supprimera définitivement ce employe .
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={()=>handleDelete(id)} >Supprimer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
    
  ];

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
  }, [runEffect]);

  return (
    <>
      <DataTable columns={columns} data={employes} />
    </>
  )
}

export default Employelist


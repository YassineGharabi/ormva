import customAxios from '@/api/customAxios';
import { DataTable } from '@/components/table/Data-table';
import { appContext } from '@/context/ContextProvider';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
import { SquarePen, Trash, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import DocumentUpdate from './DocumentUpdate';

const DocumentList = () => {

  const {id} = useParams();

  const {token} = useContext(appContext);

  const [runEffect,setRunEffect] = useState(0);

  const [documents,setDocuments] = useState([]);

  // function to get all docs belongs to this formation
  const getDocs = async () =>{

    try{

      const response = await customAxios.get(`getdocs/${id}`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      if(response.status == 200)
      {
        setDocuments(response.data.data);
      }
      
    }catch(err){
      console.error(err);
    }
  }

  // call this function in the first render of componant and if run effect change
  useEffect(()=>{
    getDocs();
  },[runEffect]);


  // function that delete doc 

  const handleDelete = async (id) =>{
    const deletingLoading = toast.loading('Veuillez patienter');
    try{

      
      const response = await customAxios.delete(`doc_pedagogiques/${id}`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      if( response.status == 200 )
      {
        toast.dismiss(deletingLoading);
        setDocuments( documents.filter( document => document.id != id ) );
        setTimeout(()=>{ // Short delay before showing success toast to not be prevent by toast dismiss
          toast.success(response.data.message, {
            duration: 2000,
            icon: <Trash2Icon />
          });
        },100);

      }

    }catch(err){
      console.error(err)
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
      accessorKey: "file",
      header: "File",
      cell: ({ row }) => {
        const file = row.getValue("file")
        return <a href={file} className='text-blue-500 hover:underline' target="_blank"  >Télécharger</a>
      },
    },
    {
      accessorKey: "fileName",
      header: "Nom du fichier",
    },
    {
      accessorKey: "type",
      header: "Type",
    },

    // column of actions
    {
      id: "actions",
      cell: ({ row }) => {
        const document = row.original
        const { id , type } = document;
        const [openUpdateDialog,setOpenUpdateDialog] = useState(false);

        return (
          <span className='flex items-center gap-2 '>
            <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog} >
              <DialogTrigger>
                <SquarePen className="h-4 w-4 cursor-pointer" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Formailire de Modification</DialogTitle>
                  <DialogDescription>Document : </DialogDescription>
                  <DocumentUpdate document={document} setOpenUpdateDialog={setOpenUpdateDialog} setRunEffect={setRunEffect} />
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
                    Cela supprimera définitivement ce document {type}.
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
  



  return (
        <>
          <h1 className='uppercase tracking-wider' >Formation : {documents[0]?.formation.intitule}</h1>
          <DataTable columns={columns} data={documents} />
        </>
  )
}

export default DocumentList
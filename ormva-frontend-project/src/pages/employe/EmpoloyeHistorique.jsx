import customAxios from '@/api/customAxios'
import { DataTable } from '@/components/table/Data-table'
import { appContext } from '@/context/ContextProvider'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EmpoloyeHistorique = () => {

  const {id} = useParams();

  const {token} = useContext(appContext);

  const [ formations , setFormations ] = useState([]);

  const [ employe , setEmploye ] = useState([]);

  // function to get the generated attestation
  const getAttestationPdf = async (idFormation) => {

    const body = {
      employe_id : id ,
      formation_id : idFormation
    };

    try{

      const response = await customAxios.post('attestation-pdf',body,{
        headers : {
          Authorization : `Bearer ${token}`,
        },
        responseType : 'blob'
      });

      // Create a download link for the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "attestation.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

    }catch(err){
      console.error(err);
    }


  }

  // function to get participes of an employe
  const getFormation = async () => {
    const response = await customAxios.get(`employe-formations/${id}`,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });

    if( response.status == 200 ){
      setFormations(response.data.formations);
      setEmploye(response.data.employe);
    }

  }
  useEffect(()=>{
    getFormation();
  },[])

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
      accessorKey: "intitule",
      header: "Nom de formation",
    },
    {
        accessorKey: "pivot.presence",
        header: "Status de presence",
        cell: ({ row }) => {
          const presence = row.getValue("pivot_presence");
          return <span >{presence ? 'Présent' : 'Absent' }</span>
        },
      },
    {
      accessorKey: "pivot.note",
      header: "Note",
    },
    // column of actions
    {
      id: "actions",
      cell: ({ row }) => {
        const particip = row.original
        const presence = row.getValue("pivot_presence");
        return (
          presence ? 
        <a onClick={()=>getAttestationPdf(particip.id)} className='text-blue-500 hover:underline cursor-pointer'>
          Télécharger attestation PDF 
        </a> :
        <span className='text-red-500 hover:underline cursor-not-allowed ' >
          Aucune attestation
        </span>
        )
      },
    },
];

  return (
    <>
        <h1 className='uppercase font-semibold tracking-wider' >Les formations du participant {employe?.nom_complet}</h1>
        <DataTable columns={columns} data={formations} />
    </>
  )
}

export default EmpoloyeHistorique
import customAxios from '@/api/customAxios';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { appContext } from '@/context/ContextProvider';
import { FileDown } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const FormationShow = () => {

  const { id } = useParams();

  const { token } = useContext(appContext);

  const [formation, setFormation] = useState([]);

  // function to get convocation pdf
  const getConvocationPdf = async () => {

    try {
      const response = await customAxios.get(`convocation-pdf/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      });

      // handle dowload
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute("download", "convocation.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      console.error(err);
    }

  }

  // function to get data of formation by id

  const getFormation = async () => {
    try {
      const response = await customAxios.get(`formations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status == 200) {
        setFormation(response.data);
      }

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getFormation();
  }, []);


  return (
    <Card className='mt-10' >
      {/* show formation */}
      <div className='space-y-3 p-8  w-full' >
        <div className='flex items-center gap-3' >
          <span className='font-semibold text-xl uppercase' >Intitule :</span>
          {
            formation[0]?.intitule ?
            <span className='text-lg capitalize' >{formation[0]?.intitule}</span> :
            <Skeleton className='w-48 h-6' />
          }
        </div>
        <div className='flex items-center gap-3 flex-wrap' >
          <span className='font-semibold text-xl uppercase' >Description :</span>
          {
            formation[0]?.description ?
            <span className='text-lg capitalize' >{formation[0]?.description}</span> :
            <Skeleton className='w-96 h-6' />
          }
        </div>
        <div className='flex items-center gap-3' >
          <span className='font-semibold text-xl uppercase' >Date de debut :</span>
          {
            formation[0]?.date_debut ?
            <span className='text-lg capitalize' >{formation[0]?.date_debut}</span> :
            <Skeleton className='w-48 h-6' />
          }
        </div>
        <div className='flex items-center gap-3' >
          <span className='font-semibold text-xl uppercase' >Date de fin :</span>
          {
            formation[0]?.date_fin ?
            <span className='text-lg capitalize' >{formation[0]?.date_fin}</span> :
            <Skeleton className='w-48 h-6' />
          }
        </div>
        <div className='flex items-center gap-3' >
          <span className='font-semibold text-xl uppercase' >Duree :</span>
          {
            formation[0]?.duree ?
            <span className='text-lg capitalize' >{formation[0]?.duree}</span> :
            <Skeleton className='w-20 h-6' />
          }
        </div>
        <div className='flex items-center gap-3' >
          <span className='font-semibold text-xl uppercase' >Lieu :</span>
          {
            formation[0]?.lieu ?
            <span className='text-lg capitalize' >{formation[0]?.lieu}</span> :
            <Skeleton className='w-48 h-6' />
          }
        </div>
        <div className='flex items-center gap-3' >
          <span className='font-semibold text-xl uppercase' >Nombre maximum de participants :</span>
          {
            formation[0]?.nombre_max ?
            <span className='text-lg capitalize' >{formation[0]?.nombre_max}</span> :
            <Skeleton className='w-20 h-6' />
          }
        </div>
        <div className='flex items-center gap-3' >
          <span className='font-semibold text-xl uppercase' >Formateur :</span>
          {
            formation[0]?.formateur.nom ?
            <span className='text-lg capitalize' >{formation[0]?.formateur.nom}</span> :
            <Skeleton className='w-48 h-6' />
          }
        </div>
        <CardFooter className='flex justify-end gap-1' >
          <Button onClick={getConvocationPdf} > <FileDown /> Télécharger convocation PDF</Button>
          <Link to='participants' >
            <Button>Participants</Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  )
}

export default FormationShow
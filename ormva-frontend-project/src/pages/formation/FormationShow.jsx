import customAxios from '@/api/customAxios';
import { Button } from '@/components/ui/button';
import { appContext } from '@/context/ContextProvider';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const FormationShow = () => {

  const {id} = useParams();

  const {token} = useContext(appContext);

  const [formation , setFormation] = useState([]);

  // function to get data of formation by id

  const getFormation = async () => {
    try{
      const response = await customAxios.get(`formations/${id}`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });

      if(response.status == 200){
        setFormation(response.data);
      }

    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    getFormation();
  },[]);


  return (
    <div className='flex justify-center mt-10 ' >
        {/* show formation */}
        <div className='space-y-3 p-8 bg-[#FAFAFA] rounded-md dark:bg-[#171717]' >
          <p className='space-x-4' >
            <span className='font-semibold text-xl uppercase' >Intitule :</span>
            <span className='text-lg uppercase' >{formation[0]?.intitule}</span>
          </p>
          <p className='space-x-4' >
            <span className='font-semibold text-xl uppercase' >Description :</span>
            <span className='text-lg uppercase' >{formation[0]?.description}</span>
          </p>
          <p className='space-x-4' >
            <span className='font-semibold text-xl uppercase' >Date de debut :</span>
            <span className='text-lg uppercase' >{formation[0]?.date_debut}</span>
          </p>
          <p className='space-x-4' >
            <span className='font-semibold text-xl uppercase' >Date de fin :</span>
            <span className='text-lg uppercase' >{formation[0]?.date_fin}</span>
          </p>
          <p className='space-x-4' >
            <span className='font-semibold text-xl uppercase' >Duree :</span>
            <span className='text-lg uppercase' >{formation[0]?.duree}</span>
          </p>
          <p className='space-x-4' >
            <span className='font-semibold text-xl uppercase' >Lieu :</span>
            <span className='text-lg uppercase' >{formation[0]?.lieu}</span>
          </p>
          <p className='space-x-4' >
            <span className='font-semibold text-xl uppercase' >Nombre maximum de participants :</span>
            <span className='text-lg uppercase' >{formation[0]?.nombre_max}</span>
          </p>
          <p className='space-x-4' >
            <span className='font-semibold text-xl uppercase' >Formateur :</span>
            <span className='text-lg uppercase' >{formation[0]?.formateur.nom}</span>
          </p>
          <div className='flex justify-end' >
          <Link to='participants' >
          <Button>Participants</Button>
          </Link>
          </div>
        </div>

    </div>
  )
}

export default FormationShow
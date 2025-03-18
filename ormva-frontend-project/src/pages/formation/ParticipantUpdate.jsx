import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea';
import customAxios from '@/api/customAxios';
import { appContext } from '@/context/ContextProvider';
import { toast } from 'sonner';


const formSchema = yup.object({
  presence: yup.string().required('Champ obligatoire'),
  note: yup.string().required('Champ obligatoire')
});


const ParticipantUpdate = ({employe , id , setRunEffect , setOpenUpdateDialog }) => {

  const {token} = useContext(appContext);

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      presence: employe.pivot.presence == 1 ? 'Pre' : 'Abs' ,
      note: employe.pivot.note
    }
  });

  // function handle submit and update in db

  const onSubmit = async (values) => {
    const updateloading = toast.loading('Veuillez patienter');
    try{

      const response = await customAxios.put(`update-employe/${id}`,{...values, "employe_id" : employe.id },{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });

      if(response.status == 200){
        toast.dismiss(updateloading);
        setRunEffect( prevState => prevState + 1 );
        setOpenUpdateDialog(false);
    
        setTimeout(()=>{ // Short delay before showing success toast
          toast.success("Modifier avec succès",{
            duration: 2000,
          });
        },100)
    
      }

    }catch(err){
      console.error(err);
    }

  
  }


  return (
    <Form {...form} >
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4' >
      {/* formateur select input */}
      <FormField
        control={form.control}
        name="presence"
        render={({ field }) => (
          <FormItem >
            <FormLabel>Presence</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}  >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez le statut de presence" />
                </SelectTrigger>
              </FormControl >
              <SelectContent  >
                <SelectItem value='Pre' >Présent</SelectItem>
                <SelectItem value='Abs' >Absent</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* matricule input */}
      <FormField
        control={form.control}
        name="note"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Note</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder='Note de participation' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type='submit' disabled={ !form.formState.isDirty } >Modifier</Button>
    </form>
    </Form>
  )
}

export default ParticipantUpdate
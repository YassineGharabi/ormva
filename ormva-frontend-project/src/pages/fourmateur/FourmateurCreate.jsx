import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { PhoneInput } from "@/components/ui/phone-input";
import customAxios from "@/api/customAxios";
import { useContext } from "react";
import { appContext } from "@/context/ContextProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";





//schema of form validation
const formSchema = yup.object({
  nom: yup.string().required().min(3),
  contact: yup.string().required(),
  domain: yup.string().required(),
  entreprise: yup.string().required(),
})

const FourmateurCreate = () => {

  const {token} = useContext(appContext);
  const nav = useNavigate();


  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      nom: "",
      contact: "",
      domain: "",
      entreprise: "",
    },
  });



  const onSubmit = async (values) => {

    try{
      const response = await customAxios.post('fourmateurs',values,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });

      if(response.status == 201){
        toast.success('Ajouté avec succès');
        nav('/dashboard/fourmateur');
      }


    }catch(err){
      console.error(err);
    }
      
  }

  return (
    <div >
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full mx-auto p-4 shadow-lg rounded-sm dark:bg-[#171717] ">
          <div className="space-y-3">
            {/* nom input */}
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* contact input */}
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* domain input */}
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              {/* entreprise input */}
            <FormField
              control={form.control}
              name="entreprise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entreprise</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className='w-full' >Connexion</Button>
        </form>
      </Form>
    </div>
  )
}

export default FourmateurCreate
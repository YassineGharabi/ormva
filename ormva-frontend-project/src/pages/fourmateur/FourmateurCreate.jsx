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
  nom: yup.string().required('Champ obligatoire').min(3,'Doit comporter au moins 3 caractères'),
  contact: yup.string().required('Champ obligatoire'),
  domain: yup.string().required('Champ obligatoire'),
  entreprise: yup.string().required('Champ obligatoire'),
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
      const createLoading = toast.loading('Veuillez patienter');
      const response = await customAxios.post('fourmateurs',values,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });



      if(response.status == 201){
        toast.dismiss(createLoading);

        setTimeout(()=>{
          toast.success('Ajouté avec succès',{
            duration:2000
          });
        },100)

        nav('/dashboard/fourmateur');
      }


    }catch(err){
      console.error(err);
      toast.dismiss(createLoading);
    }
      
  }

  return (
    <div  >
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full mx-auto p-4 rounded-sm  ">
          <div className="space-y-3">
            {/* nom input */}
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input  {...field} placeholder="Nom complet" />
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
                    <PhoneInput {...field} placeholder="0000-000000" />
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
                    <Input  {...field} placeholder="Domain" />
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
                    <Input  {...field} placeholder="Entreprise" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" >Créer</Button>
        </form>
      </Form>
    </div>
  )
}

export default FourmateurCreate
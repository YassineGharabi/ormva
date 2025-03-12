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
import customAxios from "@/api/customAxios";
import { useContext } from "react";
import { appContext } from "@/context/ContextProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


//schema of form validation
const formSchema = yup.object({
  nom_complet: yup.string().required().min(3),
  matricule: yup.string().required(),
  cin: yup.string().required(),
  email: yup.string().required().email(),
  service: yup.string().required(),
  bureau: yup.string().required(),
})


const EmployeUpdate = ({employe,setRunEffect,setOpenUpdateDialog}) => {

  const { token } = useContext(appContext);



  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      nom_complet: employe.nom_complet,
      matricule: employe.matricule,
      cin: employe.cin,
      email: employe.email,
      service: employe.service,
      bureau: employe.bureau
    },
  });

      // function that handle update
      const onSubmit = async (values) => {
        const updateloading = toast.loading('Veuillez patienter');
        try{
            const response = await customAxios.put(`employes/${employe.id}`,values,{
                headers:{
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
            console.log(err);
            toast.dismiss(updateloading);
        }
      }

  return (
    <div>
            <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full mx-auto p-4 rounded-sm  ">
                <div className="space-y-3">
                  {/* nom input */}
                  <FormField
                    control={form.control}
                    name="nom_complet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input  {...field} placeholder='Nom complet' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
      
                  <div className="grid grid-cols-2 gap-2" >
                    {/* matricule input */}
                    <FormField
                      control={form.control}
                      name="matricule"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Matricule</FormLabel>
                          <FormControl>
                            <Input  {...field} placeholder='Matricule' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* cin input */}
                    <FormField
                      control={form.control}
                      name="cin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CIN</FormLabel>
                          <FormControl>
                            <Input  {...field} placeholder='cin' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* email input */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input  {...field} placeholder="m@Exemple.ma" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-2" >
                    {/* service input */}
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service</FormLabel>
                          <FormControl>
                            <Input  {...field} placeholder='Service' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* bereau input */}
                    <FormField
                      control={form.control}
                      name="bureau"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bereau</FormLabel>
                          <FormControl>
                            <Input  {...field} placeholder='Bereau' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={!form.formState.isDirty}  >Modifier</Button>
              </form>
            </Form>
    </div>
  )
}

export default EmployeUpdate
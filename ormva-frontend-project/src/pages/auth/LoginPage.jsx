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
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import customAxios from "@/api/customAxios"
import { appContext } from "@/context/ContextProvider"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


//schema of form validation
const formSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(50)
})


const LoginPage = () => {

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const [error,setError] = useState(null);
  const {setToken} = useContext(appContext);
  const nav = useNavigate();


  //function that handle submit of form 

  const onSubmit = async (values) => {
    const createLoading = toast.loading('Veuillez patienter');
        try{
            const response = await customAxios.post('login',values);

            // catch the error of The provided credentials are incorrect.
            if(response.data.errors){
                setError(response.data.errors.email[0]);
            }else{
              toast.dismiss(createLoading);
              setTimeout(() => {
                toast.success('Vous êtes connecté', {
                  duration: 3000
                });
              }, 100)
              setToken(response.data.token);
              localStorage.setItem('token',response.data.token);
              nav('/dashboard');
            }

        }catch(err){
            console.error(err);
        }
  }



  return (
    <div className="flex h-screen justify-center items-center">
            <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-[380px] p-4 shadow-lg rounded-sm dark:bg-[#171717] ">
        <div className="space-y-1">
        <h1 className="text-2xl font-extrabold tracking-wide" >Connectez-vous</h1>
        <p className="text-sm font-semibold text-gray-700/80 dark:text-white/60" >Entrez vos informations ci-dessous pour vous connecter</p>
        </div>
        <div  className="space-y-3">
            {/* email input */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@Exemple.ma" {...field} />
              </FormControl>
              {/* display the error if exists and if input has not change */}
              { error && !form.formState.isDirty  && <FormMessage >{error}</FormMessage>}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* password input */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
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

export default LoginPage

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
import {useContext, useEffect, useState} from "react";
import { appContext } from "@/context/ContextProvider";
import { toast } from "sonner";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {cn} from "@/lib/utils.js";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";



//schema of form validation
const formSchema = yup.object({
  intitule: yup.string().required('Champ obligatoire').min(3,'Doit comporter au moins 3 caractères'),
  description: yup.string().required('Champ obligatoire').min(10,'Doit comporter au moins 10 caractères'),
  date_debut: yup.string().required('Champ obligatoire'),
  date_fin: yup.string().required('Champ obligatoire'),
  duree: yup.string().required('Champ obligatoire'),
  lieu: yup.string().required('Champ obligatoire'),
  nombre_max: yup.string().required('Champ obligatoire'),
  formateur_id: yup.string().required('Champ obligatoire'),
})


const FormationUpdate = ({formation,setRunEffect,setOpenUpdateDialog}) => {

  const { token } = useContext(appContext);
  


  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      intitule: formation.intitule,
      description: formation.description,
      date_debut: formation.date_debut,
      date_fin: formation.date_fin,
      duree: formation.duree,
      lieu: formation.lieu,
      nombre_max: formation.nombre_max,
      formateur_id: formation.formateur_id,
      status: formation.status
    },
  });

  const [selectFourmateurs,setSelectFourmateurs] = useState([]);


  const getFourmation = async () => {
    const response = await customAxios.get('fourmateurs',{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
    setSelectFourmateurs(response.data.data);

  }


  useEffect(()=>{
    getFourmation()
  },[]);






  // function that handle update
  const onSubmit = async (values) => {
    const updateloading = toast.loading('Veuillez patienter');
    try{
      const response = await customAxios.put(`formations/${formation.id}`,values,{
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
      <div  >
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full mx-auto p-4 rounded-sm  ">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2" >

                              {/* matricule input */}
              <FormField
                  control={form.control}
                  name="intitule"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Intitule</FormLabel>
                        <FormControl>
                          <Input  {...field} placeholder='Intitule' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />
                             {/* lieu input */}
                             <FormField
                    control={form.control}
                    name="lieu"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lieu</FormLabel>
                          <FormControl>
                            <Input  {...field} placeholder='Lieu de formation' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}
                />

              </div>
              {/* description input */}
              <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Description..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />

                  {/* date_debut input */}
                  <FormField
                      control={form.control}
                      name="date_debut"
                      render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date de debut</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                      variant={"outline"}
                                      className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                      )}
                                  >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Choisissez une date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    // get the date from onselect then format it to match the date in db
                                    onSelect={(date) => {
                                      const formattedDate = format(date, 'yyyy-MM-dd');
                                      field.onChange(formattedDate);
                                    }}
                                    initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                  {/* date_fin input */}
                  <FormField
                      control={form.control}
                      name="date_fin"
                      render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date de fin</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                      variant={"outline"}
                                      className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                      )}
                                  >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Choisissez une date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    // get the date from onselect then format it to match the date in db
                                    onSelect={(date) => {
                                      const formattedDate = format(date, 'yyyy-MM-dd');
                                      field.onChange(formattedDate);
                                    }}
                                    initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
              <div className='grid grid-cols-2 gap-2' >
                {/* duree input */}
                <FormField
                    control={form.control}
                    name="duree"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duree</FormLabel>
                          <FormControl>
                            <Input placeholder="Duree" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}
                />
                                {/* nombre_max input */}
                                <FormField
                    control={form.control}
                    name="nombre_max"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre maximum</FormLabel>
                          <FormControl>
                            <Input  {...field} placeholder='Nombre maximum de participants' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}
                />
 
              </div>
              <div className="grid grid-cols-2 gap-2" >

                  {/* formateur select input */}
                  <FormField
                      control={form.control}
                      name="formateur_id"
                      render={({ field }) => (
                          <FormItem >
                            <FormLabel>Fourmateur</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}  >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Sélectionnez un formateur" />
                                </SelectTrigger>
                              </FormControl >
                              <SelectContent  >
                                {
                                  selectFourmateurs.map(fourmateur => <SelectItem value={fourmateur.id} key={fourmateur.id} >{fourmateur.nom}</SelectItem>)
                                }  
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                  {/* status select input */}
                  <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                          <FormItem >
                            <FormLabel>Statut</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}  >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Sélectionnez le statut" />
                                </SelectTrigger>
                              </FormControl >
                              <SelectContent  >
                              <SelectItem value='Planifiee' >Planifiee</SelectItem>
                              <SelectItem value='En cours' >En cours</SelectItem>
                              <SelectItem value='Terminé' >Terminé</SelectItem>
                              </SelectContent>
                            </Select>
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

export default FormationUpdate



import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import customAxios from "@/api/customAxios";
import { useContext, useEffect } from "react";
import { appContext } from "@/context/ContextProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

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

const FormationCreate = () => {

  const { token , fourmateurs , setFourmateurs } = useContext(appContext);

  const nav = useNavigate();

  // for select data
  const getFourmateurs = async () => {
    try {
      const response = await customAxios.get('fourmateurs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status == 200) {
        setFourmateurs(response.data.data);
      }

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getFourmateurs();
  }, []);


  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      intitule: "",
      description: "",
      duree: "",
      lieu: "",
      nombre_max: ""
    },
  });


  const onSubmit = async (values) => {
    try {
      const createLoading = toast.loading('Veuillez patienter');
      const response = await customAxios.post('formations', values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status == 201) {
        toast.dismiss(createLoading);

        setTimeout(() => {
          toast.success('Ajouté avec succès', {
            duration: 2000
          });
        }, 100)

        nav('/dashboard/formations');
      }


    } catch (err) {
      console.error(err);
      toast.dismiss(createLoading);
    }


  }

  return (
    <div  >
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full mx-auto p-4 rounded-sm  ">
          <div className="space-y-3">
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
            <div className="grid xl:grid-cols-3 grid-cols-1  " >

              <div className="grid grid-cols-2 col-span-2" >
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
              </div>
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
            </div>
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
            <div className="grid grid-cols-2 gap-2" >
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
                          fourmateurs.map(fourmateur => <SelectItem value={fourmateur.id} key={fourmateur.id} >{fourmateur.nom}</SelectItem>)
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" >Créer</Button>
        </form>
      </Form>
    </div>
  )
}

export default FormationCreate

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
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
import { useContext } from "react";
import { appContext } from "@/context/ContextProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"







//schema of form validation
const formSchema = yup.object({
  intitule: yup.string().required().min(3),
  description: yup.string().required().min(10).max(50),
  date_debut: yup.string().required(),
  date_debut: yup.string().required(),
  duree: yup.string().required(),
  lieu: yup.string().min(3).required(),
  nombre_max: yup.string().required(),

})

const FormationCreate = () => {

  const { token } = useContext(appContext);
  const nav = useNavigate();


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
    console.log(values);
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
          <Button type="submit" >Créer</Button>
        </form>
      </Form>
    </div>
  )
}

export default FormationCreate
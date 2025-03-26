import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { appContext } from "@/context/ContextProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";




//schema of form validation
const formSchema = yup.object({
  type: yup.string().required('Champ obligatoire'),
  fileName: yup.string().required('Champ obligatoire'),
})

const DocumentUpdate = ({document,setOpenUpdateDialog,setRunEffect}) => {

      const formData = new FormData();

      const {id} = useParams();

      const {token} = useContext(appContext);

      const form = useForm({
        resolver : yupResolver(formSchema),
        defaultValues : {
          type : document.type ,
          fileName : document.fileName ,
        }
      });



      const onSubmit =  async (values) => {
        formData.append( "formation_id" , id );
        formData.append( "type" , values.type );
        formData.append( "fileName" , values.fileName );
        formData.append( "file" , values.file );
        // change your request type to POST and add a _method field with the value put,
        formData.append('_method', 'put');

        try{
          const updateloading = toast.loading('Veuillez patienter');
          const response = await axios.post(`http://127.0.0.1:8000/api/doc_pedagogiques/${document.id}`,formData,{
            headers: {
              Authorization : `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });

          if( response.status == 200 ){
            
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
            <div>
                    <Form {...form} >
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full mx-auto p-4 rounded-sm  ">
                        {/* type select input */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem >
                                  <FormLabel>Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}  >
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionnez le statut" />
                                      </SelectTrigger>
                                    </FormControl >
                                    <SelectContent  >
                                    <SelectItem value='Word' >Word</SelectItem>
                                    <SelectItem value='Excel' >Excel</SelectItem>
                                    <SelectItem value='Pdf' >Pdf</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                            )}
                        />
                            {/* fileName input */}
                            <FormField
                              control={form.control}
                              name="fileName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nom du fichier</FormLabel>
                                  <FormControl>
                                    <Input  {...field} placeholder='Nom du fichier' />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          {/* file input */}
                          <FormField
                            control={form.control}
                            name="file"
                            render={({ field: { onChange, onBlur, ref, value, ...field } }) => (
                              <FormItem>
                                <FormLabel>Fichier</FormLabel>
                                <FormControl>
                                  <Input
                                    type="file"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0] || null;
                                      onChange(file); // Mettre à jour l'état avec le fichier
                                    }}
                                    onBlur={onBlur}
                                    ref={ref}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        <Button type="submit" >Modifier</Button>
                      </form>
                    </Form>
            </div>
  )
}

export default DocumentUpdate
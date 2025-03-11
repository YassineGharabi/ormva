import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from 'react-router-dom'

const Tab = ({item}) => {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <Link to='' ><TabsTrigger value="account">liste</TabsTrigger></Link>
               <Link to='create'><TabsTrigger value="password">Créer</TabsTrigger></Link>
            </TabsList>
            <TabsContent value="account">La liste de {item}</TabsContent>
            <TabsContent value="password">Cree {item}</TabsContent>
        </Tabs>
    )
}

export default Tab
import React from 'react'

import { Brain, BriefcaseBusiness, ChartColumn,  Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from './nav-user'
import { Link } from 'react-router-dom'

// Menu items.
const items = [
  {
    title: "Tableau de bord",
    url: "",
    icon: ChartColumn,
  },
  {
    title: "Formateur",
    url: "fourmateur",
    icon: BriefcaseBusiness,
  },
  {
    title: "Employes",
    url: "employes",
    icon: Users,
  },
  {
    title: "Formations",
    url: "formations",
    icon: Brain,
  },
]

const SideBar = () => {
  return (
    <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Gestion des Formation Continues</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
        <NavUser/>
    </SidebarFooter>
  </Sidebar>
  )
}

export default SideBar




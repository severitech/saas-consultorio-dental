"use client"

import * as React from "react"
import {

  IconInnerShadowTop,
} from "@tabler/icons-react"

import { NavUser } from "@/components/Panel/Datos-Usuario"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { data } from "@/components/Panel/Lista"
import { NavSecondary } from "./Navegacion-Secundaria"
import { NavegacionPrincipal } from "./Navegacion-Principal"
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavegacionPrincipal items={data.NavegacionPrincipal} />
        <NavSecondary items={data.NavegacionSecundaria} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.usuario} />
      </SidebarFooter>
    </Sidebar>
  )
}

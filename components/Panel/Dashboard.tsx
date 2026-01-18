"use client"

import { IconInnerShadowTop } from "@tabler/icons-react"
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
import { getNavegacionAgrupada, getCategorias } from "@/components/Panel/Lista"
import { NavegacionPorCategoria } from "./NavegacionCategorias"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navegacionAgrupada = getNavegacionAgrupada()
  const categorias = getCategorias()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Dental SaaS</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Mostrar por categorías funcionales */}
        {categorias.map((categoria, index) => {
          const items = navegacionAgrupada[categoria]
          // Solo mostrar categorías que tengan items
          if (!items || items.length === 0) return null
          
          return (
            <NavegacionPorCategoria
              key={categoria}
              titulo={categoria}
              items={items}
              isFirst={index === 0}
            />
          )
        })}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { NavItem } from "./Lista"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavegacionPorCategoriaProps {
  titulo: string
  items: NavItem[]
  isFirst?: boolean
}

export function NavegacionPorCategoria({ titulo, items, isFirst }: NavegacionPorCategoriaProps) {
  const pathname = usePathname()
  
  // Verificar si algún item de esta categoría está activo
  const hasActiveItem = items.some(item => pathname === item.url)
  
  // Usar clave estable para evitar problemas de hidratación
  const categoriaId = titulo.toLowerCase().replace(/\s+/g, '-')
  
  return (
    <Accordion 
      type="single" 
      collapsible 
      className="px-2" 
      defaultValue={isFirst || hasActiveItem ? categoriaId : undefined}
    >
      <AccordionItem value={categoriaId} className="border-none">
        <AccordionTrigger className="py-2.5 px-2 hover:no-underline hover:bg-accent/50 rounded-md transition-colors">
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {titulo}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-2 pt-1">
          <div className="space-y-0.5">
            {items.map((item) => {
              const isActive = pathname === item.url
              return (
                <Button
                  key={item.url}
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start h-10 px-3 font-normal"
                  asChild
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="flex-1 text-sm text-left">{item.title}</span>
                    {item.badge && (
                      <Badge 
                        variant={isActive ? "default" : "secondary"} 
                        className="ml-auto h-5 px-1.5 text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </Button>
              )
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
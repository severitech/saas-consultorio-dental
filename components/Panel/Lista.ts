import {  IconChartBar, IconDashboard, IconDatabase, IconFileDescription, IconFolder, IconHelp, IconListDetails, IconReport, IconSearch, IconSettings, IconUsers } from "@tabler/icons-react";



export const data = {
  NavegacionSuperAdmin: [
    {
      title: "Usuarios",
      url: "/panel/super-admin/usuarios",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  NavegacionAdmin: [
    
    {
      title: "Doctores y Pacientes",
      url: "/panel/admin/usuarios",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  NavegacionDoctor: [
    {
      title: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      title: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      title: "Word Assistant",
      url: "#",
      icon: IconFileDescription,
    },
  ],
  NavegacionRecepcion: [
    {
      title: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      title: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      title: "Word Assistant",
      url: "#",
      icon: IconFileDescription,
    },
  ],
  configuracion: [
    {
      title: "Ajustes de cuenta",
      url: "/panel/mi-perfil",
      icon: IconSettings,
    },
    
  ],
}

export default data;
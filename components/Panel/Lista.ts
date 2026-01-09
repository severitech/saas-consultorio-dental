import {  IconChartBar, IconDashboard, IconDatabase, IconFileDescription, IconFolder, IconHelp, IconListDetails, IconReport, IconSearch, IconSettings, IconUsers } from "@tabler/icons-react";

interface TypeNavegacion {
  usuario: {
    name: string;
    email: string;
    avatar: string;
  };
  NavegacionPrincipal: Array<{
    title: string;
    url: string;
    icon: React.ComponentType<any>;
  }>;
  NavegacionSecundaria: Array<{
    title: string;
    url: string;
    icon: React.ComponentType<any>;
  }>;
  documents: Array<{
    name: string;
    url: string;
    icon: React.ComponentType<any>;
  }>;
}

export const data = {
  usuario: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  NavegacionPrincipal: [
    {
      title: "Dashboard",
      url: "#",
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
  NavegacionSecundaria: [
    
    {
      title: "Settings",
      url: "#",
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
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileDescription,
    },
  ],
}
// data/sidebar-nav.ts
import {
    BookOpen,
    Bot,
    Home,
    Settings2,
    SquareTerminal,
    Inbox,
    Users,
    Activity 
  } from "lucide-react"
  import { LucideIcon } from "lucide-react"
  
  interface NavItem {
    title: string
    url: string
    icon?: LucideIcon
    items?: Omit<NavItem, 'icon'>[]
  }
  
  interface SidebarData {
    navMain: NavItem[]
  }
  
  export const sidebarData: SidebarData = {
    navMain: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: Home,
      },
      {
        title: 'Inbox',
        url: '/dashboard/inbox',
        icon: Inbox,
      },
      {
        title: 'Users',
        url: '/dashboard/users',
        icon: Users,
      },
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        items: [
          {
            title: "Dashboard",
            url: "/dashboard",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
      {
        title: "System Health",
        url: "#",
        icon: Activity,
        items: [
          {
            title: "Overview",
            url: "/dashboard/system",
          },
          {
            title: "Dependencies Status",
            url: "/dashboard/system/dependencies",
          },
        ],
      },
    ],
  }
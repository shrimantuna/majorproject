import { Calendar, LayoutDashboard, List, Settings, WalletCards } from "lucide-react";

export const SidebarOptions=[
    {
        name: 'Dashboard',
        icon:LayoutDashboard,
        path:'/dashbaord'
    },

     {
        name: 'Scheduled Interview',
        icon: Calendar,
        path:'/scheduledinterview'
    },

     {
        name: 'All Interview',
        icon: List,
        path:'/all-interview'
    },

     {
        name: 'Billing',
        icon: WalletCards,
        path:'/billing'
    },

     {
        name: 'Settings',
        icon: Settings,
        path:'/settings'
    }
]
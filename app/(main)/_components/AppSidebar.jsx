"use client"
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarOptions } from "@/services/Constants";
import { Link, Option, OptionIcon, Plus } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function AppSidebar() {

  const path = usePathname();
  console.log(path);


  return (
    <Sidebar>
      <SidebarHeader className='flex items-center mt-5' />
      <Image src={'/logo.png'} alt="logo" width={120} height={80}
        className="w-[120px]"
      />
      <Button classname='w-full mt-5'>
        <Plus /> Create new Interview
      </Button>
      <SidebarContent>
        <SidebarGroup />
        <SidebarContent>
          <SidebarMenu>
            {SidebarOptions.map((option, index) => (
              <SidebarMenuItem key={index} className='p-1'>
                <SidebarMenuButton asChild className={'p-5'}>
                  <Link href={option.path}>
                    <option.icon className={`${path == option.path && 'text-primary'}`} />
                    <span className={`text-[12px] font-medium ${path == option.path && 'text-primary'}`}>{option.name}</span>

                  </Link>

                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

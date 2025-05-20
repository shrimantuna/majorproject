import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='flex items-center mt-5' />
      <Image src={'/logo.png'} alt ="logo" width={120} height ={80}
      className="w-[120px]"
      />
      <Button classname='w-full mt-5'>
        <Plus/> Create new Interview
      </Button>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

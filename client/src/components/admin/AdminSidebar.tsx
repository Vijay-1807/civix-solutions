import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Building, LayoutDashboard, Briefcase, Users, Mail, Bell, LogOut, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/clients', label: 'Clients', icon: Users },
  { href: '/admin/contacts', label: 'Contacts', icon: Mail },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Bell },
];

const addMenuItems = [
  { href: '/admin/projects/add', label: 'Add Project', icon: PlusCircle },
  { href: '/admin/clients/add', label: 'Add Client', icon: PlusCircle },
]

export function AdminSidebar() {
  const { pathname } = useLocation();

  const handleLogout = () => {
    // Logic to logout
    window.location.href = '/';
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" asChild>
            <SidebarTrigger>
              <Building className="size-5 text-primary" />
            </SidebarTrigger>
          </Button>
          <Link to="/admin" className="flex items-center gap-2">
            <Building className="size-5 text-primary" />
            <span className={cn("font-semibold font-headline text-lg group-data-[collapsible=icon]:hidden")}>
              Civix Admin
            </span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))}
                tooltip={item.label}
              >
                <Link to={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarMenu>
          <p className="px-4 py-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">Quick Add</p>
          {addMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
                variant="outline"
              >
                <Link to={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <button onClick={handleLogout} className="w-full">
                <LogOut />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

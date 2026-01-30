import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Briefcase, Users, Mail, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { getProjects, getClients, getContacts, getSubscribers } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscribers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projects, clients, contacts, subscribers] = await Promise.all([
          getProjects(),
          getClients(),
          getContacts(),
          getSubscribers(),
        ]);
        setStats({
          projects: projects.length,
          clients: clients.length,
          contacts: contacts.length,
          subscribers: subscribers.length
        });
      } catch (error) {
        console.error("Failed to load stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statItems = [
    { title: "Projects", count: stats.projects, icon: Briefcase, href: "/admin/projects" },
    { title: "Clients", count: stats.clients, icon: Users, href: "/admin/clients" },
    { title: "Contacts", count: stats.contacts, icon: Mail, href: "/admin/contacts" },
    { title: "Subscribers", count: stats.subscribers, icon: Bell, href: "/admin/subscribers" },
  ];

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <h1 className={cn("text-3xl font-bold font-headline")}>Admin Dashboard</h1>
      <p className="text-muted-foreground">Welcome to the Civix Solutions admin panel. Manage your site content from here.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statItems.map(stat => (
          <Link to={stat.href} key={stat.title}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

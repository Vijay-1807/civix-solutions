import { useEffect, useState } from 'react';
import { getSubscribers } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscribers() {
      try {
        const data = await getSubscribers();
        setSubscribers(data);
      } catch (error) {
        console.error("Failed to load subscribers", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubscribers();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("font-headline")}>Newsletter Subscribers</CardTitle>
        <CardDescription>A list of all users subscribed to your newsletter.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email Address</TableHead>
              <TableHead>Subscribed On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : subscribers.length > 0 ? (
              subscribers.map((subscriber) => (
                <TableRow key={subscriber._id}>
                  <TableCell className="font-medium">{subscriber.email}</TableCell>
                  <TableCell>{format(new Date(subscriber.createdAt), "PPP")}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No subscribers yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

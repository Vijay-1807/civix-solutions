import { useEffect, useState } from 'react';
import { getContacts } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Contact {
  _id: string;
  fullname: string;
  email: string;
  mobile: string;
  city: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        console.error("Failed to load contacts", error);
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("font-headline")}>Contact Submissions</CardTitle>
        <CardDescription>Here are all the inquiries submitted through your website.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Submitted On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : contacts.length > 0 ? (
              contacts.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell className="font-medium">{contact.fullname}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.mobile ? formatPhoneNumberIntl(contact.mobile) : 'N/A'}</TableCell>
                  <TableCell>{contact.city}</TableCell>
                  <TableCell>{format(new Date(contact.createdAt), "PPP")}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No contacts yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

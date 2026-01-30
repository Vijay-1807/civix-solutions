import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useToast } from '@/hooks/use-toast';
import { createContact } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
    fullname: z.string()
        .min(2, "Name must be at least 2 characters")
        .regex(/^[a-zA-Z\s]*$/, "Name should only contain letters and spaces"),
    email: z.string().email("Invalid email address"),
    mobile: z.string()
        .refine((val) => isValidPhoneNumber(val), "Please enter a valid phone number"),
    city: z.string()
        .min(2, "City is required")
        .regex(/^[a-zA-Z\s]*$/, "City should only contain letters and spaces"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            fullname: '',
            email: '',
            mobile: '',
            city: '',
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        setLoading(true);
        try {
            await createContact(data);
            toast({
                title: 'Success!',
                description: 'Your message has been sent successfully!',
            });
            form.reset();
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to send message.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-xl shadow-2xl bg-card/95 backdrop-blur-sm border-0">
            <CardHeader className="space-y-1">
                <CardTitle className="font-headline text-3xl font-bold tracking-tight text-center sm:text-left">Get in Touch</CardTitle>
                <CardDescription className="text-center sm:text-left text-base">
                    Fill out the form below and we'll contact you shortly.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="fullname" className="text-sm font-medium">Full Name</Label>
                        <Input
                            id="fullname"
                            placeholder="John Doe"
                            {...form.register("fullname")}
                            className={cn("h-11", form.formState.errors.fullname && "border-destructive focus-visible:ring-destructive")}
                        />
                        {form.formState.errors.fullname && (
                            <p className="text-sm text-destructive font-medium">{form.formState.errors.fullname.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            {...form.register("email")}
                            className={cn("h-11", form.formState.errors.email && "border-destructive focus-visible:ring-destructive")}
                        />
                        {form.formState.errors.email && (
                            <p className="text-sm text-destructive font-medium">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mobile" className="text-sm font-medium">Mobile Number</Label>
                        <Controller
                            name="mobile"
                            control={form.control}
                            render={({ field }) => (
                                <div className={cn(
                                    "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                                    form.formState.errors.mobile && "border-destructive focus-within:ring-destructive"
                                )}>
                                    <PhoneInput
                                        {...field}
                                        international
                                        defaultCountry="US"
                                        className="flex w-full h-full [&>.PhoneInputCountry]:mr-3 [&>input]:w-full [&>input]:bg-transparent [&>input]:outline-none [&>input]:placeholder:text-muted-foreground"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            )}
                        />
                        {form.formState.errors.mobile && (
                            <p className="text-sm text-destructive font-medium">{form.formState.errors.mobile.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium">City</Label>
                        <Input
                            id="city"
                            placeholder="New York"
                            {...form.register("city")}
                            className={cn("h-11", form.formState.errors.city && "border-destructive focus-visible:ring-destructive")}
                        />
                        {form.formState.errors.city && (
                            <p className="text-sm text-destructive font-medium">{form.formState.errors.city.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full h-11 text-base bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-md transition-all hover:scale-[1.01]" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Inquiry'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

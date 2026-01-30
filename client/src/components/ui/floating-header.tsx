import React from 'react';
import { BuildingIcon, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function FloatingHeader() {
    const [open, setOpen] = React.useState(false);

    const links = [
        {
            label: 'Projects',
            href: '#projects',
        },
        {
            label: 'Clients',
            href: '#clients',
        },
        {
            label: 'Contact',
            href: '#contact',
        },
    ];

    return (
        <header
            className={cn(
                'sticky top-0 z-50',
                'w-full border-b shadow-sm',
                'bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-lg',
                'transition-all duration-300'
            )}
        >
            <nav className="relative w-full max-w-[1920px] mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
                {/* Left: Logo */}
                <a href="/" className="z-20 hover:bg-primary/5 flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-1.5 duration-200 transition-all group">
                    <div className="bg-primary/10 p-1.5 rounded-md group-hover:bg-primary/20 transition-colors">
                        <BuildingIcon className="size-5 text-primary" />
                    </div>
                    <p className="font-headline text-xl font-bold tracking-tight text-foreground">Civix Solutions</p>
                </a>

                {/* Center: Desktop Navigation - Absolutely Positioned */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 z-10">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            className={cn(
                                "text-sm font-semibold transition-all duration-200 hover:text-primary relative group py-2",
                                "text-muted-foreground"
                            )}
                            href={link.href}
                        >
                            {link.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>

                {/* Right: Admin Button & Mobile Menu */}
                <div className="flex items-center gap-3 z-20">
                    <Link to="/login" className="hidden sm:block">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all font-medium px-5">
                            Admin Panel
                        </Button>
                    </Link>

                    {/* Mobile Menu Trigger */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setOpen(!open)}
                            className="lg:hidden hover:bg-muted"
                        >
                            <MenuIcon className="size-5" />
                        </Button>
                        <SheetContent
                            className="bg-background/95 backdrop-blur-3xl border-l w-[300px]"
                            showClose={true}
                            side="right"
                        >
                            <SheetHeader className="text-left mb-8 mt-4">
                                <SheetTitle className="flex items-center gap-2 text-xl font-bold">
                                    <div className="bg-primary/10 p-2 rounded-md">
                                        <BuildingIcon className="size-5 text-primary" />
                                    </div>
                                    Civix Solutions
                                </SheetTitle>
                                <SheetDescription className="text-sm text-muted-foreground ml-1">
                                    Menu
                                </SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col gap-2">
                                {links.map((link) => (
                                    <a
                                        key={link.label}
                                        className={cn(
                                            "flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors",
                                            "hover:bg-primary/5 hover:text-primary",
                                            "text-foreground/80 focus:bg-primary/10"
                                        )}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <div className="mt-8 px-2">
                                    <Link to="/login" onClick={() => setOpen(false)}>
                                        <Button className="w-full font-bold shadow-md" size="lg">Access Admin Panel</Button>
                                    </Link>
                                </div>
                            </div>
                            <SheetFooter className="mt-auto">
                                <p className="text-xs text-center text-muted-foreground/60 pb-6 uppercase tracking-wider font-semibold">
                                    © 2025 Civix Solutions
                                </p>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}

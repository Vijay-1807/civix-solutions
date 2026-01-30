import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, Building } from "lucide-react";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#clients", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <Building className="h-6 w-6 text-primary" />
          <span className="font-bold inline-block font-headline">Civix Solutions</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild>
            <Link to="/login">Admin Login</Link>
          </Button>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="sr-only">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navigation links</SheetDescription>
                </div>
                <Link to="/" className="mr-6 flex items-center space-x-2 mb-6">
                  <Building className="h-6 w-6 text-primary" />
                  <span className="font-bold inline-block font-headline">Civix Solutions</span>
                </Link>
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                      onClick={() => document.querySelector<HTMLElement>('[data-state="open"]')?.click()} // Close menu on click
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

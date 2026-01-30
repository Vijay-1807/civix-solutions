import { Link } from "react-router-dom";
import { Building, Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl font-headline">Civix Solutions</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Transforming spaces with innovative civil engineering solutions. We build the future with precision, quality, and sustainable practices.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-background p-2 rounded-full hover:text-primary transition-colors border shadow-sm"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="bg-background p-2 rounded-full hover:text-primary transition-colors border shadow-sm"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="bg-background p-2 rounded-full hover:text-primary transition-colors border shadow-sm"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="bg-background p-2 rounded-full hover:text-primary transition-colors border shadow-sm"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg font-headline mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#hero" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Our Projects</a></li>
              <li><a href="#clients" className="text-muted-foreground hover:text-primary transition-colors">Clients</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg font-headline mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Building className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground font-medium">Vijay (Bontha Vijay)</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">ArundelPet, Guntur</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">+91 7286973788</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">bonthavijay1807@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Civix Solutions. All rights reserved. Made by Vijay.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

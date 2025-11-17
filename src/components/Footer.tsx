import { Link } from "react-router-dom";
import { Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About NASSCOM", path: "/about" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact Us", path: "/contact" },
    { name: "Sitemap", path: "/sitemap" },
  ];

  const policyLinks = [
    { name: "Privacy & Data Policy", path: "/privacy" },
    { name: "Refund Policy & T&C", path: "/terms" },
    { name: "Code of Conduct", path: "/code-of-conduct" },
  ];

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">NASSCOM NTC 2025</h3>
            <p className="text-sm text-muted-foreground">
              The Era of Intelligent Progress
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy & Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Policy & Legal</h4>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>NASSCOM Headquarters</p>
              <p>International Youth Centre</p>
              <p>Teen Murti Marg, Chanakyapuri</p>
              <p>New Delhi - 110021, India</p>
              <p className="pt-2">
                <a href="tel:+911140511000" className="hover:text-primary transition-colors">
                  +91 11 4051 1000
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NASSCOM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

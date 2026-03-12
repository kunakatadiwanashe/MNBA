import Link from 'next/link'
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, className, children, ...props }, ref) => (
    <Link href={href} ref={ref} className={cn("transition-colors", className)} {...props}>
      {children}
    </Link>
  )
);

NavLink.displayName = "NavLink";

export default NavLink;


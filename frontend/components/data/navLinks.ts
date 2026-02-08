import {LayoutDashboard,AlertCircle,CreditCard,DoorOpen,Users,} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type NavLink = {
    label: string;
    href: string;
    icon: LucideIcon;
}

export type NavConfig = {
    landing: NavLink[];
    tenant: NavLink[];
    admin: NavLink[];
}

export const navLinks = {
  landing: [],

  tenant: [
    { label: "Dashboard", href: "/tenant/dashboard", icon: LayoutDashboard },
    { label: "Complaints", href: "/tenant/complaints", icon: AlertCircle },
    { label: "Payments", href: "/tenant/payments", icon: CreditCard },
    { label: "Profile", href: "/tenant/profile", icon: Users },
  ],

  admin: [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Rooms", href: "/admin/rooms", icon: DoorOpen },
    { label: "Issues", href: "/admin/complaints", icon: AlertCircle },
    { label: "Payments", href: "/admin/payments", icon: CreditCard },
    { label: "Profile", href: "/admin/profile", icon: Users },
  ],
};

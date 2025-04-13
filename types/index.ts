import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export interface Customer {
  id: number
  name: string
  address: string
  phone: string
  email: string
  created_at: string
  updated_at: string
}

export interface Employee {
  id: number
  base_salary: string
  fullname: string
  roles_id: number
  pivot?: {
    employee_id: number
    order_id: number
  }
  updated_at: string
  created_at: string
}

export interface OrderDetails  {
  id: number,
  order_id: number,
  packet_id: number,
  packet_name?: string,
  price: string,
  subtotal: string,
  quantity: number,
  is_custom: boolean,
  packet?: {
    id: number,
    name: string
  },
  created_at?: string,
  updated_at?: string,
}

export interface Order  {
  id: number,
  customer_id?: number,
  status?: string,
  token_tracking?: string,
  invoice_number?: string
  plat_number?: string,
  total_price?: string,
  note?: string,
  car_merk?: string | null,
  created_at: string,
  updated_at: string,
  customer?: Customer[]
  order_details?: OrderDetails[]
  employees?: Employee[]
}




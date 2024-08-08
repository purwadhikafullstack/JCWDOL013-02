import { UserLinkItem } from '@/interfaces/navbar.interface';
import { IoNewspaperOutline } from 'react-icons/io5';
import { MdOutlineDashboard, MdOutlineDesignServices } from 'react-icons/md';
import { TbStatusChange } from 'react-icons/tb';
import { SiHomebridge } from 'react-icons/si';

export const LinkItems: Array<UserLinkItem> = [
  {
    name: 'Home',
    icon: SiHomebridge,
    href: '/dashboard',
    key: 'Dashboard',
  },
  {
    name: 'Products & Services',
    icon: MdOutlineDesignServices,
    href: '/dashboard/products',
    key: 'Products',
  },
  {
    name: 'Invoices',
    icon: IoNewspaperOutline,
    href: '/dashboard/invoices',
    key: 'Invoices',
  },
  {
    name: 'Status',
    icon: TbStatusChange,
    href: '/dashboard/status',
    key: 'Status',
  },
];

'use client';
import { ColumnDef } from '@tanstack/react-table';
// import Image from 'next/image';
import { CellAction } from './cell-action';
import { Order } from 'types';

export const columns: ColumnDef<Order>[] = [
  // {
  //   accessorKey: 'photo_url',
  //   header: 'IMAGE',
  //   cell: ({ row }) => {
  //     return (
  //       <div className='relative aspect-square'>
  //         <Image
  //           src={row.getValue('photo_url')}
  //           alt={row.getValue('name')}
  //           fill
  //           className='rounded-lg'
  //         />
  //       </div>
  //     );
  //   }
  // },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'customer.name',
    header: 'CUSTOMER NAME'
  },
  {
    accessorKey: 'car_merk',
    header: 'CAR MERK'
  },
  {
    accessorKey: 'plat_number',
    header: 'PLAT NUMBER'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    accessorKey: 'total_price',
    header: 'TOTAL PRICE'
  },
  {
    accessorKey: 'note',
    header: 'NOTE'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

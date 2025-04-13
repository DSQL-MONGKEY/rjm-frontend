import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as OrderTable } from '@/components/ui/table/data-table';
import { columns } from './order-tables/columns';
import { getOrders } from '../api/get-orders';
import { Order } from 'types';

type ProductListingPage = {};

export default async function OrderListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const { data } = await getOrders(filters);
  const totalOrders = data.orders.length;
  const orders: Order[] = data.orders;


  console.log(data.orders);
  console.log("INI CEK PANJANG WEO: ", totalOrders);
  return (
    <OrderTable
      columns={columns}
      data={orders}
      totalItems={totalOrders}
    />
  );
}

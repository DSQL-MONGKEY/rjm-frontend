'use server'

import { fetchApi } from "@/lib/api";

export async function getOrders(filters: {
   page?: number,
   limit?: number,
   q?: string
}) {
   const params = new URLSearchParams();

   if(filters.page) params.set('page', filters.page.toString());
   if(filters.limit) params.set('limit', filters.limit.toString());
   if(filters.q) params.set('q', filters.q);

   const queryString = params.toString() ? `${params}` : '';

   const response = await fetchApi(`orders`);
   return response;
}
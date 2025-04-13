import { auth } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api"


export async function fetchApi(
   endpoint: string,
   options?: RequestInit
): Promise<any> {
   const session = await auth();

   if(!session?.user?.accessToken) {
      throw new Error('Unauthorized: No access token found');
   }

   const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${session.user.accessToken}`,
         ...(options?.headers || {})
      },
      cache: 'no-store'
   })

   if(!res.ok) {
      throw new Error(`API Error: ${res.status}`);
   }

   return res.json();
}

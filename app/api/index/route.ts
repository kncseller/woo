import { NextRequest } from 'next/server';
import { cookies, headers } from 'next/headers';
import { withAuth } from '@/lib/with-auth';


// async function secretGET(request: NextRequest) {
//   return new Response(JSON.stringify({ secret: 'Here be dragons' }), {
//     headers: { 'Content-Type': 'application/json' },
//   });
// }
 
// export const GET = withAuth(secretGET);

export async function GET(request: NextRequest) {
  let url  = request.nextUrl.pathname;

  // const headersList = await headers();
  // const referer = headersList.get('referer');
 
  // 2. Using the standard Web APIs
  const auth = request.headers.get('auth-token');
  const pathname = request.headers.get('x-next-pathname');

  url = 'https://f7.donggiatri.com/users/demo/f7vay'+pathname;
  let data = await fetch(url, {
    // Optional: forward some headers, add auth tokens, etc.
    headers: { "auth-token": auth },
  }).then((r)=>r.text()).catch((e)=>{

  });

  const transformed = { ...data, source: 'proxied-through-nextjs',url };
 
  return new Response(JSON.stringify(transformed), {
    headers: { 'Content-Type': 'application/json' },
  });
}

/*
/api/users/
 */
// export async function GET(request: Request) {

//   // For example, fetch data from your DB here
//   const users = [
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' }
//   ];
//   return new Response(JSON.stringify(users), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' }
//   });
// }
 
export async function POST(request: Request) {
  // 1. Using 'next/headers' helpers
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
 
  const headersList = await headers();
  const referer = headersList.get('referer');
 
  // 2. Using the standard Web APIs
  const userAgent = request.headers.get('user-agent');

  // Parse the request body
  const body = await request.json();
  const { name } = body;
 
  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), name };
 
  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}



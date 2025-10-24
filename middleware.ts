import { type NextRequest, NextResponse } from 'next/server';
// import { rootDomain } from '@/lib/utils';

// const appconfig={
//    domainapi :'https://f7.donggiatri.com/users/demo/pluto/'
// };

const domains = {
  "ato":"/", 
  "mb":"/", 
  "woo":"/",
  "aship":"/", 
};

function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];


  
  // Local development environment
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  return hostname.includes('.')?hostname.split('.').slice(0, -2).join('.'):null;

  // // Production environment
  // const rootDomainFormatted = rootDomain.split(':')[0];

  // // Handle preview deployment URLs (tenant---branch-name.vercel.app)
  // if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
  //   const parts = hostname.split('---');
  //   return parts.length > 0 ? parts[0] : null;
  // }



  // // Regular subdomain detection
  // const isSubdomain =
  //   hostname !== rootDomainFormatted &&
  //   hostname !== `www.${rootDomainFormatted}` &&
  //   hostname.endsWith(`.${rootDomainFormatted}`);

  // return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let subdomain = extractSubdomain(request);

  if (subdomain) {


    if(subdomain.includes("admin")){
       subdomain = "admin";
    }else{
       subdomain = domains[subdomain]||subdomain;
    }


    if(subdomain!="/"){

      // Block access to admin page from subdomains
      if (pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      // For the root path on a subdomain, rewrite to the subdomain page
      if (pathname === '/') {
        return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
      }
      //detail api
       if (pathname.startsWith('/api/')) { 
          return NextResponse.json(new URL(`/s/${subdomain}/api/index/`, request.url));
        }
    }
   

  }

  if (pathname != '/') {

      //detail api
      if (pathname.startsWith('/api/')) { 
        return NextResponse.json(new URL('/api/index/', request.url));
      }

      return NextResponse.rewrite(new URL('/', request.url));
  }

  // On the root domain, allow normal access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|build|s|[\\w-]+\\.\\w+).*)'
  ]
};

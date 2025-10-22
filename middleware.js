import { NextResponse ,NextRequest} from 'next/server'; 

export default function middleware(request,res) {
    //  const session = request.cookies.get('next-auth.session-token');
    //  if(session)
    //     return NextResponse.next();
    // else
    //     return NextResponse.redirect(new URL('/signin', req.url)); // this should send the user back to http://localhost/sign-in in case the user is not authenticated
    const {pathname} = request.nextUrl;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-next-pathname', pathname);



     if (pathname.startsWith('/api/')) {
            console.log(requestHeaders);
        
        return NextResponse.json(new URL('/api/index/', request.url));
      }
     
      // if (request.nextUrl.pathname.startsWith('/dashboard')) {
      //   return NextResponse.rewrite(new URL('/dashboard/user', request.url));
      // }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [ 
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
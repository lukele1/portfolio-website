// Send anyone on the *.pages.dev address to the real domain,
// so Cloudflare Access (the email login) can't be skipped.
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname.endsWith('.pages.dev')) {
    url.hostname = 'lehongphuc.net';
    url.protocol = 'https:';
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }
  return next();
}

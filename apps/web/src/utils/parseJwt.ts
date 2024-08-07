export default function parseJWT(payload: any) {
  try {
    const { token } = payload;
    if (!token) throw new Error('token missing');
    const base64url = token.split('.')[0];
    const base64 = base64url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
  } catch (err) {
    throw err;
  }
}

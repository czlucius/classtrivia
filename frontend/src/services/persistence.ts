export function getCookie(name: string): string {
    // https://stackoverflow.com/questions/10730362/get-cookie-by-name
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

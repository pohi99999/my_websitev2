// The cookie banner is rendered with the HTML, so a first visit paints it at once (it was the /kapcsolat LCP
// element at ~4 s when it waited for client JS; Marveen 5574). A visitor who already chose is told apart before
// the first paint by this tiny inline <head> script: it marks <html data-consent="set">, and globals.css hides
// the banner for that, so it never flashes. Kept out of the 'use client' module: a server component importing
// a constant from there gets a client reference, not the string.
export const CONSENT_STORAGE_KEY = 'pt-cookie-consent';

export const CONSENT_FLAG_SCRIPT = `try{var c=localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)});if(c==='all'||c==='necessary')document.documentElement.setAttribute('data-consent','set')}catch(e){}`;

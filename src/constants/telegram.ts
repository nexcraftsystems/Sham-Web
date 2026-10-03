export const TELEGRAM_USERNAME = 'daneil_777';
export const TELEGRAM_PREMESSAGE = 'Halo Admin, saya mau join Trade & Claim!';
export const TELEGRAM_URL = `https://t.me/daneil_777?text=${encodeURIComponent('Halo Admin, saya mau join Trade & Claim!')}`;

export const openTelegramDirect = () => {
  if (typeof window !== 'undefined') {
    window.open(TELEGRAM_URL, '_blank', 'noopener,noreferrer');
  }
};

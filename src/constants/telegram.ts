export const TELEGRAM_USERNAME = 'oracle_liquidityX';
export const TELEGRAM_PHONE = '+60174560950';
export const TELEGRAM_PREMESSAGE = 'Halo Admin, saya mau join Trade & Claim!';
export const TELEGRAM_URL = `https://t.me/oracle_liquidityX?text=${encodeURIComponent('Halo Admin, saya mau join Trade & Claim!')}`;
export const TELEGRAM_PHONE_URL = 'https://t.me/+60174560950';

export const openTelegramDirect = () => {
  if (typeof window !== 'undefined') {
    window.open(TELEGRAM_URL, '_blank', 'noopener,noreferrer');
  }
};


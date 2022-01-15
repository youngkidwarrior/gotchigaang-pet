const UTF8_FORMAT = 'utf8';
const BASE64_FORMAT = 'base64';

export const formatAddress = (address) => {
  return address.slice(0, 5) + '...' + address.slice(-4);
};


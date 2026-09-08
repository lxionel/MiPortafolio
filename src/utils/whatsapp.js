export const WSP_NUMBER = '51952102805';

export function wspUrl(message = 'Hola Lionel, quiero ponerme en contacto contigo') {
  return `https://wa.me/${WSP_NUMBER}?text=${encodeURIComponent(message)}`;
}

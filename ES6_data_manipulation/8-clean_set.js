export default function cleanSet(set, startString) {
  if (!startString || typeof startString !== 'string') return '';
  return [...set]
    .filter((val) => typeof val === 'string' && val.startsWith(startString))
    .map((val) => val.slice(startString.length))
    .join('-');
}

export function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

export function isTodo(url) {
  return !url || url.startsWith('TODO');
}

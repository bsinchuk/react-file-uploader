let counter = 0;

export default function (prefix='id') {
  return `${prefix}${++counter}`;
}
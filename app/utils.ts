export const pipe = (...fns) => (x): any => fns.reduce((v, f) => f(v), x);

const key = process.env.REACT_APP_API_KEY;
const header = `Basic ${key}`;

export { header };
export default key;
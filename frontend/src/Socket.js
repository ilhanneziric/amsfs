import io from "socket.io-client";
const ENDPOINT = 'https://amsfs.vercel.app';
export default io(ENDPOINT);
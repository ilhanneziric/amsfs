import io from "socket.io-client";
const ENDPOINT = 'https://amsfs.herokuapp.com';
export default io(ENDPOINT);
import chats from "./chats";

type Store = {
    id: number,
    name: string,
    surname: string,
    login: string,
    roomID: number,
    message: chats,
}
export default Store;
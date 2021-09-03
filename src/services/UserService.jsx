import api from "../http";

export default class UserService {
   static getUsers() {
      return api.get('/users')
   }
}
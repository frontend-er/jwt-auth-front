import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import AuthService from "../services/AuthService";

export default class Store {
   isAuth = false;
   user = {}
   isLoading = false;

   constructor() {
      makeAutoObservable(this)
   }

   setAuth(bool) {
      this.isAuth = bool
   }

   setUser(user) {
      this.user = user
   }


   async login(email, password) {
      try {
         const responce = await AuthService.login(email, password);
         console.log(responce)
         localStorage.setItem('token', responce.data.accessToken);
         this.setAuth(true);
         this.setUser(responce.data.user);
      } catch (e) {
         console.log(e.responce?.data?.message);
      }
   }

   setLoading(bool) {
      this.isLoading = bool;
   }


   async registration(email, password) {
      try {
         const responce = await AuthService.regestration(email, password);
         console.log(responce)
         localStorage.setItem('token', responce.data.accessToken);
         this.setAuth(true)
         this.setUser(responce.data.user)

      } catch (error) {
         console.log(error.responce?.data?.message)
      }
   }



   async logout() {
      try {
         const responce = await AuthService.logout();
         console.log(responce)
         localStorage.removeItem('token');
         this.setAuth(false);
         this.setUser({});
      } catch (e) {
         console.log(e.responce?.data?.message);
      }
   }

   async checkAuth() {
      this.setLoading(true);
      try {
         const responce = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
         console.log(responce)
         localStorage.setItem('token', responce.data.accessToken);
         this.setAuth(true)
         this.setUser(responce.data.user)
      } catch (error) {
         console.log(error.responce?.data?.message)
      }
      finally {
         this.setLoading(false)
      }
   }

}
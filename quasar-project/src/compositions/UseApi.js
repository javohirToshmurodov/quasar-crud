import { api } from "src/boot/axios";

export default function useApi(url) {

   // product get

   const list = async () => {
      try {
         const { data } = await api.get(url)
         return data
         console.log(url);
      } catch (error) {
         console.log(error);
      }
   }
   // product post (create)

   const post = async (form) => {
      try {
         const { data } = await api.post(url, form)
         return data
      } catch (error) {
         console.log(error);
      }
   }

   // product update
   const update = async (form) => {
      try {
         const { data } = await api.put(url, form)
         return data
      } catch (error) {
         console.log(error);
      }
   }

   // product remove (delete)
   const remove = async (id) => {
      try {
         const { data } = await api.delete(`${url}/${id}`)
         return data
      } catch (error) {
         console.log(error);
      }
   }

   return {
      list, post, update, remove
   }
}
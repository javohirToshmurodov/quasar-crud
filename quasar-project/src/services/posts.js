import useApi from "src/compositions/UseApi";

export default function postsServices() {
   const { list, post, update, remove } = useApi('product')

   return {
      list, post, update, remove
   }
}
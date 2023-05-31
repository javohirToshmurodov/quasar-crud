<template>
   <q-page class="flex-center flex" padding>

      <!-- edit form -->

      <q-form @submit="onSubmit" @reset="onReset" class="addproductform">
         <span class="text-h6">Edit product</span>
         <q-input filled v-model="form.product_type_id" label="Product type id" class="" />

         <q-input filled v-model="form.name_uz" label="Product Name" class="" />

         <q-input filled v-model="form.cost" label="Product cost" class="" />

         <q-input filled v-model="form.address" label="Product address" class="" />
         <q-input :rules="[val => val && val.length > 0 || 'Please, fill the date']" type="date" filled
            v-model="form.created_date" label="Product created-date" class="" />

         <div class="col-lg-12 col-12 q-gutter-sm">
            <q-btn type="submit" class="float-right" label="Save" icon="save" color="positive" />
            <q-btn class="float-right" label="Cancel" text-color="primary" :to="{ name: 'home' }" />
         </div>
      </q-form>
   </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import postsService from "src/services/posts"
import { useQuasar } from "quasar"

export default defineComponent({
   name: "EditDialog",

   setup() {
      const $q = useQuasar()
      const route = useRoute()
      const router = useRouter()
      const { list, update } = postsService()
      const form = ref({
      })

      // get filteredProduct with params id

      const getProducts = async () => {
         try {
            const data = await list()
            data.filter(d => {
               if (d.id == route.params.id) {
                  form.value = d
                  // console.log(products.value.id)
               } else {
                  console.log("else");
               }
            })
         } catch (error) {
            console.log(error);
         }
      }


      // on Mount

      onMounted(() => {
         getProducts()
      })


      // editFunction here 

      const onSubmit = async () => {
         try {
            await update(form.value)
            $q.notify({ message: 'Product has been edited successfully!', icon: "edit", color: 'positive' })
            router.push({ name: 'home' })
         } catch (error) {
            console.log(error);
         }
      }
      return {
         form,
         onSubmit
      }
   }
})
</script>
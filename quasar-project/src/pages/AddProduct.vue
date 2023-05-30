<template>
   <q-page class="flex-center flex" padding>
      <q-form @submit="onSubmit" @reset="onReset" class="addproductform">
         <span class="text-h6">Create product</span>
         <q-input :rules="[val => val && val.length > 0 || 'Please, fill the id']" filled v-model="form.product_type_id"
            label="Product type id" class="" />

         <q-input :rules="[val => val && val.length > 0 || 'Please, fill the name']" filled v-model="form.name_uz"
            label="Product Name" class="" />

         <q-input :rules="[val => val && val.length > 0 || 'Please, fill the cots']" filled v-model="form.cost"
            label="Product cost" class="" />

         <q-input :rules="[val => val && val.length > 0 || 'Please, fill the address']" filled v-model="form.address"
            label="Product address" class="" />
         <q-input type="date" filled v-model="form.created_date" label="Product created-date" class="" />

         <div class="col-lg-12 col-12 q-gutter-sm">
            <q-btn type="submit" class="float-right" label="Save" icon="save" color="positive" />
            <q-btn class="float-right" label="Cancel" text-color="primary" :to="{ name: 'home' }" />
         </div>
      </q-form>
   </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
import postsServices from "src/services/posts"
import { useQuasar } from "quasar"
import { useRouter, useRoute } from "vue-router"
export default defineComponent({
   name: "AddProductForm",
   setup() {
      const { post } = postsServices()
      const $q = useQuasar()
      const router = useRouter()
      const route = useRouter()
      const form = ref({
         product_type_id: "",
         name_uz: "",
         cost: "",
         address: "",
         created_date: ""
      })

      // onMounted(() => {
      //    console.log(route.params.id);
      // })
      const onSubmit = async () => {
         try {
            await post(form.value)
            $q.notify({ message: 'Product has been added successfully!', icon: "check", color: 'positive' })
            router.push({ name: 'home' })
         } catch (error) {
            console.error(error)
         }
      }

      return {
         form,
         onSubmit
      }
   }
})

</script>
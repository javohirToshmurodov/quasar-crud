<template>
  <q-page padding>
    <q-table title="Products" :rows="products" :columns="columns" row-key="name">
      <!-- template top -->
      <template v-slot:top>
        <span class="text-h5">Products</span>
        <q-space />
        <q-btn color="primary" :disable="loading" label="Add product" :to="{ name: 'addProductForm' }" />
      </template>
      <!-- template body -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense size="md" @click="handleEditProduct(props.row)" />
          <q-btn icon="delete" color="negative" dense size="md" @click="handleDeleteProduct(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>


<!-- script here -->
<script>
import { defineComponent, onMounted, ref } from 'vue'
import postsService from "src/services/posts"
import { useQuasar } from "quasar"
import { useRouter } from 'vue-router'
export default defineComponent({
  name: "IndexPage",
  // setup part
  setup() {
    const { list, remove } = postsService();
    const products = ref([]);

    // table columns
    const columns = [
      {
        name: "id",
        field: "id",
        label: "Id",
        sortable: true,
        align: "left"
      },
      {
        name: "name_uz",
        field: "name_uz",
        label: "Name",
        sortable: true,
        align: "left"
      },
      {
        name: "cost",
        field: "cost",
        label: "Cost",
        sortable: true,
        align: "left"
      },
      {
        name: "address",
        field: "address",
        label: "Address",
        sortable: true,
        align: "left"
      },
      {
        name: "created_date",
        field: "created_date",
        label: "CreatedDate",
        sortable: true,
        align: "left"
      },
      {
        name: "actions",
        field: "actions",
        label: "Actions",
        align: "right"
      }
    ];
    const $q = useQuasar();
    const router = useRouter();
    onMounted(() => {
      getProducts();
    });
    // get products all
    const getProducts = async () => {
      try {
        const data = await list();
        products.value = data;
      }
      catch (err) {
        console.log(err);
      }
    };
    // delete product
    const handleDeleteProduct = async (id) => {
      try {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure you want to delete?",
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id);
          $q.notify({ message: "Product deleted successfully!", icon: "check", color: "positive" });
          await getProducts();
        });
      }
      catch (error) {
        $q.notify({ message: "Something went wrong!", icon: "times", color: "negative" });
      }
    };
    // edit product
    const handleEditProduct = async (row) => {
      const { id } = row
      router.push({
        name: "EditDialog", params: { id }
      })
    };
    // return functions
    return {
      card: ref(false),
      products,
      columns,
      handleDeleteProduct,
      handleEditProduct
    };
  },
})
</script>

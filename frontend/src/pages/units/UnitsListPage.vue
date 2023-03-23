<template>
  <q-page>
    <DataTable
      title="Units"
      :columns="columns"
      :paginationInitial="paginationInitial"
      :fetch="fetch"
      @row-click="onRowClick"
      @create-new="onCreateNew"
      :onDelete="onDelete"
    />
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { useRouter } from 'vue-router'
import DataTable from 'components/DataTable.vue';

export default {
  components: { DataTable },
  name: 'UserGroupsListPage',
  setup() {
    const router = useRouter();

    return {
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true,
        },
        { name: 'title', label: 'Title', field: 'title', sortable: true },
      ],
      paginationInitial: {
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
      fetch: ({ query }) => api.units.getAllUnits(query).then(r => r.data),

      onRowClick: ({ evt, row, index }) => {
        router.push(`units/${row.id}`);
      },

      onDelete: async (row) => {
        const response = await api.units.delete(row.id);
      },

      onCreateNew: ({ evt, go }) => {
        router.push('/admin/units/create');
      },
    }
  }
}
</script>

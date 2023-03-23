<template>
  <q-page>
		<DataTable
			title="Users"
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
  name: 'UsersListPage',
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
				{ name: 'name', label: 'Name', field: 'name', sortable: true },
				{ name: 'email', label: 'Email', field: 'email', sortable: true },
        { name: 'actions', label: 'Action' }
			],
			paginationInitial: {
				sortBy: 'id',
				descending: true,
				page: 1,
				rowsPerPage: 10,
				rowsNumber: 0,
			},
			fetch: ({ query }) => api.users.getAllUsers(query).then(r => r.data),

			onRowClick: ({ evt, row, index }) => {
				router.push(`/users/${row.id}`);
			},

      onDelete: async (row) => {
        const response = await api.users.deleteUserById(row.id);
      },

			onCreateNew: ({ evt, go }) => {
				router.push('/admin/users/create');
			},
		}
	}
}
</script>

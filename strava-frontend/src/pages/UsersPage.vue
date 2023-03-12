<template>
  <q-page>
		<DataTable
			title="Users"
			:columns="columns"
			:paginationInitial="paginationInitial"
			:fetch="fetch"
			@row-click="onRowClick"
			@create-new="onCreateNew"
		/>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { useRouter } from 'vue-router'
import DataTable from 'src/components/DataTable.vue';

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
			],
			paginationInitial: {
				sortBy: 'id',
				descending: true,
				page: 1,
				rowsPerPage: 10,
				rowsNumber: 0,
			},
			fetch: (params) => api.users.getAllUsers(params).then(r => r.data),

			onRowClick: ({ evt, row, index }) => {
				router.push(`/users/${row.id}`);
			},

			onCreateNew: ({ evt, go }) => {
				router.push('/users/create');
			},
		}
	}
}
</script>

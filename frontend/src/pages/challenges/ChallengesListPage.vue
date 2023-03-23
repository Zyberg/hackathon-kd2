<template>
  <q-page>
		<DataTable
			title="Challenges"
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
import DataTable from 'components/DataTable.vue';

export default {
	components: { DataTable },
  name: 'ChallengesListPage',
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
				{ name: 'startDate', label: 'StartDate', field: 'startDate', sortable: true },
			],
			paginationInitial: {
				sortBy: 'id',
				descending: true,
				page: 1,
				rowsPerPage: 10,
				rowsNumber: 0,
			},
			// fetch: ({ query }) => api.users.getAllUsers(query).then(r => r.data),

			onRowClick: ({ evt, row, index }) => {
				router.push(`/challenges/${row.id}`);
			},

			onCreateNew: ({ evt, go }) => {
				router.push('/challenges/create');
			},
		}
	}
}
</script>

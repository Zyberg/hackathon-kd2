<template>
  <q-page>
		<DataTable
			title="Challenges"
			:columns="columns"
			:paginationInitial="paginationInitial"
			:fetch="fetch"
			@row-click="onRowClick"
			@create-new="onCreateNew"
			:onEdit="onEdit"
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
				{ name: 'title', label: 'Title', field: 'title', sortable: true },
				{ name: 'description', label: 'Description', field: 'description', sortable: true },
				{ name: 'isActive', label: 'isActive', field: 'isActive', sortable: true },
				{ name: 'actions', label: 'Action' }
			],
			paginationInitial: {
				sortBy: 'id',
				descending: true,
				page: 1,
				rowsPerPage: 10,
				rowsNumber: 0,
			},
			fetch: ({ query }) => api.challenges.getAllChallenges(query).then(r => r.data),

			onRowClick: ({ evt, row, index }) => {
				router.push(`/challenges/${row.id}`);
			},

			onCreateNew: ({ evt, go }) => {
				router.push({ name: 'adminChallengeCreate'});
			},

			onEdit: async (row) => {
				router.push({
					name: 'adminChallengeUpdate',
					params: {id: row.id}
				})
			},

			onDelete: async (row) => {
				const response = await api.challenges.delete(row.id);
			},
		}
	}
}
</script>

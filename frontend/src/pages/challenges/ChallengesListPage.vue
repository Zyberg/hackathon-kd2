<template>
  <div>
    <q-input v-model="search" label="Search" dense outlined/>
    <div class="flex justify-start">
      <div class="q-mt-md" v-for="challenge in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="challenge">
        <ChallengeCard/>
      </div>
    </div>
  </div>
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
// import {api} from 'src/boot/axios';
import {ref, computed} from 'vue'
import ChallengeCard from "components/challenges/ChallengeCard.vue";
import DataTable from 'components/DataTable.vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router'


export default {
  name: 'ChallengesList',
  components: {
    ChallengeCard,
	DataTable,
  },
  setup() {
    const search = ref('')
    const page = ref(1)
    const pageSize = 20 // number of challenges per page
	const router = useRouter();

    // const challenges = api.challenges.getAllChallenges({isActive: true})

    const challenge = {
      title: 'RUN PUMA Fueled By NITRO 42km',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      isActive: true,
      unitId: 0,
      type: 'Running'
    };

    // const numPages = computed(() =>
    //   Math.ceil(challenges.length / pageSize)
    // )

    return {
      search,
      page,
      challenge,
      // numPages,
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
				router.push({
					name: 'adminChallengeUpdate',
					params: {id: row.id}
				})
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
  },
}

</script>

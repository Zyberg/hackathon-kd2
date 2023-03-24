<template>
  <q-page>
    <DataTable title="Challenges" :columns="columns" :paginationInitial="paginationInitial" :fetch="fetch"
      @row-click="onRowClick" @create-new="onCreateNew" :onEdit="onEdit" :onDelete="onDelete">

      <template v-slot:actionbuttons="{ row }">
        <q-btn @click.stop="onInviteModalOpen(row)">Invite</q-btn>
      </template>
    </DataTable>
  </q-page>

  <q-dialog v-model="isInviteModalOpen">
    <q-card class="my-card">
      <q-img src="https://dgalywyr863hv.cloudfront.net/challenges/3667/3667-cover.png" />

      <q-card-section>
        <q-btn fab color="primary" icon="place" class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);" />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ activeRow.title }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-caption text-grey" style="max-width:400px" v-html="activeRow.description">
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="Invite" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
// import {api} from 'src/boot/axios';
import DataTable from 'components/DataTable.vue';
import { ref } from 'vue'
import { api } from 'boot/axios';
import { useRouter } from 'vue-router'


export default {
  name: 'ChallengesList',
  components: {
    DataTable,
  },
  setup() {
    const router = useRouter();
    const isInviteModalOpen = ref(false)
    const activeRow = ref(null)

    return {
      isInviteModalOpen,
      activeRow,
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
          params: { id: row.id }
        })
      },

      onCreateNew: ({ evt, go }) => {
        router.push({ name: 'adminChallengeCreate' });
      },

      onEdit: async (row) => {
        router.push({
          name: 'adminChallengeUpdate',
          params: { id: row.id }
        })
      },

      onDelete: async (row) => {
        const response = await api.challenges.delete(row.id);
      },

      onInviteModalOpen: async (row) => {
        activeRow.value = row;
        isInviteModalOpen.value = true;
      }
    }
  },
}

</script>

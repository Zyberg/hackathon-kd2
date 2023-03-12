<template>
  <div class="q-pa-md">
    <q-table
      ref="tableRef"
      :title="title"
      :rows="rows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
      @row-click="onRowClick"
    >
      <template v-slot:top-right>
        <div class="flex flex-row">
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn
            v-if="!readonly"
            label="Create New"
            color="primary"
            class="q-ml-md"
            outline
            @click="onCreateNew"
          ></q-btn>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  props: ['title', 'columns', 'paginationInitial', 'fetch', 'readonly'],
  emits: ['row-click', 'create-new'],
  setup(rootProps, { emit }) {
    const tableRef = ref();
    const rows = ref([]);
    const filter = ref('');
    const loading = ref(false);
    const pagination = ref(rootProps.paginationInitial);

    async function onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      loading.value = true;

      // get all rows if "All" (0) is selected
      const perPage =
        rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

      //TODO: adapt to everything
      const { data, meta } = await rootProps.fetch({
        query: {
          q: filter,
          field: sortBy,
          order: descending ? 'DESC' : 'ASC',
          page,
          perPage
        },
      });


      // update rowsCount with appropriate value
      pagination.value.rowsNumber = meta.items;

      // clear out existing data and add new
      rows.value.splice(0, rows.value.length, ...data);

      // don't forget to update local pagination object
      pagination.value.page = meta.page;
      pagination.value.rowsPerPage = meta.limit;
      pagination.value.sortBy = sortBy;
      pagination.value.descending = descending;

      // ...and turn of loading indicator
      loading.value = false;
    }

    function onRowClick(evt, row, index) {
      emit('row-click', { evt, row, index });
    }

    function onCreateNew(evt, go) {
      emit('create-new', { evt, go });
    }

    onMounted(() => {
      // get initial data from server (1st page)
      tableRef.value.requestServerInteraction();
    });

    return {
      tableRef,
      filter,
      loading,
      rows,
      pagination,

      onRequest,
      onRowClick,
      onCreateNew,
    };
  },
};
</script>

<template>
  <div>
    <q-table :rows="challengers" :columns="columns" v-model:pagination="pagination" />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'LeaderboardTable',
  props: {
    challengers: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const pagination = ref({
      sortBy: 'points',
      descending: true,
      page: 1,
      rowsPerPage: 10,
    });


    const columns = [
      { name: 'name', required: true, label: 'Name', align: 'left', field: 'name' },
      { name: 'points', required: true, label: 'Points', align: 'center', field: 'points' },
    ];

    return {
      pagination,
      columns,
    };
  },
};
</script>

<style scoped>
h2 {
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  padding: 10px;
  margin-bottom: 10px;
}
</style>

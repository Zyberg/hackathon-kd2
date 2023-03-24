<template>
  <q-page style="background: #F5F5F2" padding class="flex flex-center text-center">
    <h3 class="text-weight-thin">

      <ApexChart width="500" type="bar" :options="chartOptions" :series="series"></ApexChart>

    </h3>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import ApexChart from "vue3-apexcharts";

const chartOptions = ref({
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
})

const series = ref({
  name: "series-1",
  data: [30, 40, 35, 50, 49, 60, 70, 91],
})

</script>

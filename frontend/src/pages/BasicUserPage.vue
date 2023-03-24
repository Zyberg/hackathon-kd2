<template>
  <q-page style="background: #F5F5F2" padding class="flex flex-center text-center">
    <h3 class="text-weight-thin">

      <ApexChart v-if="!!series && !!chartOptions" width="500" :options="chartOptions" :series="series"></ApexChart>

    </h3>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ApexChart from "vue3-apexcharts";
import { api } from '../boot/axios'
import { useAuthState } from '@vueauth/core'


onMounted(async () => {
  const { user } = useAuthState()

  const data = await api.users.getUserActivityGraph(user.value.id).then(d => d.data)

  console.log('x', data.map(d => new Date(d.x)).sort((a, b) => +a - +b))
  console.log('y', data.map(d => d.y))
  series.value = [{
    name: 'run',
    data: data.map(d => d.y)
  }]

  chartOptions.value = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },

    title: {
      text: 'Runtime analysis',
      align: 'left'
    },
    subtitle: {
      text: 'Comparison of runs',
      align: 'left'
    },
    labels: data.map(d => new Date(d.x)).sort((a, b) => +a - +b).map((d, i) => i),
    xaxis: {
    },
    yaxis: {
      opposite: true
    },
    legend: {
      horizontalAlign: 'left'
    }
  }
})

const series = ref(null)

const chartOptions = ref(null)

</script >



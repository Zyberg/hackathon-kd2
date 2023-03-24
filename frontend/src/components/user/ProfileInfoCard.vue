<template>
  <q-card class="q-pa-md flex wrap center justify-start" style="height: 100%; width: 100%; align-items: center; gap: 15px">
    <div>
      <q-avatar size="100px">
        <img src="https://cdn.quasar.dev/img/avatar.png">
      </q-avatar>
    </div>
    <div>
      <div class="name">{{ name }}</div>
      <div class="surname value-font">{{ surname }}</div>
    </div>
    <div class="flex" style="flex-direction: column; gap: 20px">
      <div>
        <div>Age</div>
        <div class="age value-font">{{ age }}</div>
      </div>
      <div>
        <div>Years of experience</div>
        <div class="yearsOfExperience value-font">{{ yearsOfExperience }}</div>
      </div>
    </div>
    <div class="flex" style="flex-direction: column; gap: 20px">
      <div>
        <div>Current Position</div>
        <div class="workplace value-font">{{ workplace }}</div>
      </div>
      <div>
        <div>Country/City</div>
        <div class="location value-font">{{ location }}</div>
      </div>
    </div>
    <div style="word-break: break-all">
      <div>Email</div>
      <div class="email value-font">{{ email }}</div>
    </div>
  </q-card>
</template>

<script>

export default {
  name: 'ProfileInfoCard',
  props: {
    name: {
      type: String,
      default: 'Tomas',
    },
    surname: {
      type: String,
      default: 'Baronas',
    },
    yearsOfExperience: {
      type: String,
      default: '100 years',
    },
    location: {
      type: String,
      default: 'Vilnius, Lithuania',
    },
    age: {
      type: String,
      default: '25 years',
    },
    workplace: {
      type: String,
      default: 'Vu faculty',
    },
    email: {
      type: String,
      default: 'Tom.baron@gmaill.com',
    },
  },
}
</script>

<style scoped>

.name {
  font-size: 24px;
}

.value-font {
  font-weight: 400;
}

</style>

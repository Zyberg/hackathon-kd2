<template>
  <div class="q-pa-sm row items-start" style="width: 100%">
    <q-card class="my-card" bordered>
      <q-img src="https://dgalywyr863hv.cloudfront.net/challenges/3667/3667-cover.png"
      />
      <q-card-section>
        <div class="text-overline text-orange-9">{{ challenge.type }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ challenge.name }}</div>
        <div class="text-caption text-grey">
          {{ challenge.description }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn class="primary-button" style="width: 100%" label="Join Challenge"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'ChallengeCard',
  props: {
    challenge: {
      type: Object,
      default: () => ({
        title: 'RUN PUMA Fueled By NITRO 42km',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        isActive: true,
        unitId: 0,
        type: 'Running'
      })
    },
  },
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>

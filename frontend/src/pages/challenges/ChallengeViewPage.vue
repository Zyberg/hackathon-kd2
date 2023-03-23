<template>
  <q-page>
    <q-card>
      <q-card-section>
        <h1>{{ challenge.name }}</h1>
        <p><strong>Start Date:</strong> {{ challenge.startDate }}</p>
        <p><strong>End Date:</strong> {{ challenge.endDate }}</p>
        <p><strong>Activity Type:</strong> {{ challenge.activityType }}</p>
        <p>
          <strong>Goal Distance:</strong> {{ challenge.goalDistance }} miles
        </p>
        <q-btn class="primary-button" @click="joinChallenge"
          >Join Challenge</q-btn
        >
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { reactive } from 'vue';
import { QBtn, QCard, QCardSection, QPage } from 'quasar';

export default {
  components: {
    QBtn,
    QCard,
    QCardSection,
    QPage,
  },
  setup() {
    const challenge = reactive({
      name: 'My Awesome Challenge',
      startDate: '2023-04-01',
      endDate: '2023-04-30',
      activityType: 'Running',
      goalDistance: 50,
    });

    const joinChallenge = () => {
      // Handle joining the challenge
      console.log('Joining challenge...');
    };

    return {
      challenge,
      joinChallenge,
    };
  },
};
</script>

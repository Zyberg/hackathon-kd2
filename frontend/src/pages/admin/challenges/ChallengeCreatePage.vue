<template>
  <div class="q-pa-md">
    <h2>{{ editMode ? 'Edit challenge' : 'Create challenge' }}</h2>
    <q-form @submit.prevent="submitChallenge">
      <h6 class="q-ma-none">Chalenge title</h6>
      <q-input
        v-model="challenge.title"
        label="Challenge title"
        dense
        rounded
        outlined
        required
      />
      <!--        <q-input v-model="challenge.description" label="Challenge description" dense rounded outlined required />-->
      <div class="q-mt-md">
        <h6 class="q-ma-none">Description</h6>
        <WysiwygComponent v-on:update:formattedInput="onUpdateFormattedInput" />
      </div>
      <q-toggle
        class="q-mt-md"
        label="isActive"
        v-model="challenge.isActive"
      ></q-toggle>
      <!-- change to select when there will be unit enums -->
      <q-select
        v-model="challenge.unitId"
        label="unit"
        class="q-mt-md q-mb-md"
        :options="units"
        :option-value="'id'"
        :option-label="'title'"
        emit-value
        dense
        rounded
        outlined
        required
      />
      <div class="flex flex-center justify-between q-mt-lg q-mb-lg">
        <div>
          <h6 class="q-ma-none">Challenge starting date</h6>
          <q-date
            v-model="challenge.startAt"
            label="Start Date"
            dense
            rounded
            outlined
            required
          />
        </div>
        <div>
          <h6 class="q-ma-none">Challenge ending date</h6>
          <q-date
            v-model="challenge.endAt"
            label="End Date"
            dense
            rounded
            outlined
            required
          />
        </div>
      </div>
      <!-- <q-select
        v-model="activityType"
        label="Activity Type"
        dense
        rounded
        outlined
        options-dense
        required
        :options="activityTypes"
      /> -->
      <h6 class="q-ma-none q-mt-md">Challenge type</h6>
      <q-select
        v-model="challenge.type"
        label="Challenge Type"
        class="q-mb-md"
        dense
        rounded
        outlined
        options-dense
        required
        :options="challengeTypes"
      />
      <h6 class="q-ma-none q-mt-md">Goal</h6>
      <q-input
        v-model.number="challenge.goalCount"
        label="Goal"
        type="number"
        dense
        rounded
        outlined
        required
      />

      <h6 class="q-ma-none q-mt-md">Cover Image</h6>
      <div class="q-pa-md" style="max-width: 300px">
        <q-uploader
          accept=".jpg, image/*"
          auto-upload
          v-model="challenge.image_path"
          url="http://localhost:3000/api/images/upload"
          dark
        />
      </div>

      <div class="q-mt-md">
        <q-btn type="submit" class="primary-button">{{
          editMode ? 'Save challenge Group' : 'Create challenge'
        }}</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import { api } from 'src/boot/axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import WysiwygComponent from 'components/WysiwygComponent.vue';

export default {
  components: { WysiwygComponent },
  setup() {
    const route = useRoute();
    const formattedInput = ref('');

    const challenge = ref({
      isActive: true,
      isComplete: false,
      title: '',
      description: '',
      unitId: 1,
      startAt: '2023-03-25T10:38:23.277Z',
      endAt: '2023-04-25T10:38:23.277Z',
      goalCount: 0,
      type: 'GoalMax',
      parentId: null,
      id: null,
      image_path: ''
    });

    const editMode = ref(false);

    const router = useRouter();

    const onUpdateFormattedInput = (formattedInputValue) => {
      challenge.value.description = formattedInputValue;
    };

    const challengeTypes = ['GoalMax', 'GoalCount'];
    const units = ref([]);

    const submitChallenge = async () => {
      console.log(challenge.value.image_path)
      challenge.value.startAt = new Date(challenge.value.startAt).toISOString();
      challenge.value.endAt = new Date(challenge.value.endAt).toISOString();
      challenge.value.unitId = +challenge.value.unitId;
      if (route.params.id) {
        await api.challenges.update(route.params.id, challenge.value);
      } else {
        await api.challenges.create(challenge.value);
      }

      router.push({ name: 'adminChallenges' })
    };

    onMounted(async () => {
      units.value = await api.units.getAllUnits().then(r => r.data.data)

      const id = route.params.id;
      if (id) {
        editMode.value = true;
        challenge.value = await api.challenges
          .getChallengeById(id)
          .then((r) => r.data);
        const a = new Date(challenge.value.startAt);
      }
    });

    return {
      formattedInput,
      challenge,
      units,
      challengeTypes,
      submitChallenge,
      editMode,
      onUpdateFormattedInput,
    };
  },
};
</script>

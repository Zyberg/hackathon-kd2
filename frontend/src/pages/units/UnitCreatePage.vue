<template>
  <div class="q-pa-md">
    <h2>{{ editMode ? 'Edit Unit' : 'Create Unit' }}</h2>
    <q-form @submit.prevent="submitForm">
      <q-input
        v-model="title"
        label="Unit title"
        dense
        rounded
        outlined
        required
      />
      <div class="q-mt-md">
        <q-btn type="submit" class="primary-button">{{ editMode ? 'Save Unit' : 'Create Unit' }}</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {api} from 'src/boot/axios';

export default {
  setup() {
    const router = useRouter();
    const title = ref('');
    const editMode = ref(false);
    const unitId = ref(null);

    onMounted(() => {
      // Check for an "id" parameter in the URL
      const {params} = router.currentRoute.value;
      if (params.id) {
        // We're in edit mode
        editMode.value = true;
        unitId.value = params.id;

        try {
          // Fetch the existing unit data
          api.units.getUnitById(unitId.value).then(response => {
            title.value = response.data.title;
          });
        } catch (e) {
          editMode.value = false
        }

      }
    });

    async function submitForm() {
      if (editMode.value) {
        // Update an existing unit
        const updatedUnit = {
          title: title.value,
        };
        await api.units.update(unitId.value, updatedUnit, {});
      } else {
        // Create a new unit
        const newUnit = {
          title: title.value,
        };
        await api.units.create(newUnit, {});
      }

      // Navigate back to the list view
      router.push('/admin/units');
    }

    return {
      submitForm,
      title,
      editMode,
    };
  },
};
</script>

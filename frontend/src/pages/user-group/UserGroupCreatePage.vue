<template>
  <div class="q-pa-md">
    <h2>{{ editMode ? 'Edit User Group' : 'Create User Group' }}</h2>
    <q-form @submit.prevent="submitForm">
      <q-input
        v-model="title"
        label="User group title"
        dense
        rounded
        outlined
        required
      />
      <div class="q-mt-md">
        <q-btn type="submit" class="primary-button">{{ editMode ? 'Save User Group' : 'Create User Group' }}</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';

export default {
  setup() {
    const router = useRouter();
    const title = ref('');
    const editMode = ref(false);
    const userGroupId = ref(null);

    onMounted(() => {
      // Check for an "id" parameter in the URL
      const { params } = router.currentRoute.value;
      if (params.id) {
        // We're in edit mode
        editMode.value = true;
        userGroupId.value = params.id;

        // Fetch the existing user group data
        try {
          // Fetch the existing unit data
          api.userGroups.getUserGroupById(userGroupId.value).then(response => {
            title.value = response.data.title;
          });
        } catch (e) {
          editMode.value = false
        }
      }
    });

    async function submitForm() {
      if (editMode.value) {
        // Update an existing user group
        const updatedUserGroup = {
          title: title.value,
        };
        await api.userGroups.update(userGroupId.value, updatedUserGroup, {});
      } else {
        // Create a new user group
        const newUserGroup = {
          title: title.value,
        };
        await api.userGroups.create(newUserGroup, {});
      }

      // Navigate back to the list view
      router.push('/admin/userGroups');
    }

    return {
      submitForm,
      title,
      editMode,
    };
  },
};
</script>

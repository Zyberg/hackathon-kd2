<template>
  <button @click="fetch">Fetch Users</button>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { User } from 'src/api/ApiClient';
import { api } from 'src/boot/axios';
import { computed, ref } from 'vue';
import { Todo, Meta } from './models';

interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  todos: () => [],
});

const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}


const users = ref([] as User[]);

const todoCount = computed(() => props.todos.length);


async function fetch() {
  try {
    const response = await api.users.getAllUsers();
    users.value = response.data.data ?? [];
  } catch (e: any) {
    console.log('Error:' + e.toString());
  }
}

</script>

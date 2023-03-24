<template>
  <div>
    <q-editor
      v-model="formattedInput"
      :content-css="[ 'https://cdn.quilljs.com/1.3.6/quill.snow.css', 'https://cdn.quilljs.com/1.3.6/quill.bubble.css' ]"
      :options="{ modules: { toolbar: '#toolbar' } }"
      :definitions="{ 'align': { 'config': { 'values': [ 'left', 'center', 'right', 'justify' ] } } }"
    >
      <div id="toolbar">
          <select class="ql-font"></select>
          <select class="ql-size"></select>
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
          <button class="ql-strike"></button>
          <select class="ql-color"></select>
          <select class="ql-background"></select>
          <button class="ql-script" value="sub"></button>
          <button class="ql-script" value="super"></button>
          <button class="ql-header" value="1"></button>
          <button class="ql-header" value="2"></button>
          <button class="ql-blockquote"></button>
          <button class="ql-code-block"></button>
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
          <button class="ql-indent" value="-1"></button>
          <button class="ql-indent" value="+1"></button>
          <button class="ql-direction" value="rtl"></button>
          <select class="ql-align"></select>
          <button class="ql-link"></button>
          <button class="ql-image"></button>
          <button class="ql-video"></button>
          <button class="ql-clean"></button>
      </div>
    </q-editor>
  </div>
</template>

<script>
import { ref, defineEmits } from 'vue';

export default {
  emits: ['update:formattedInput'],
  setup(_, { emit }) {
    const formattedInput = ref('Create your awesome challenge description!!');

    // emit the formattedInput value whenever it changes
    const updateFormattedInput = () => {
      emit('update:formattedInput', formattedInput.value);
    }

    return {
      formattedInput,
      updateFormattedInput,
    };
  },
  watch: {
    // watch for changes to the formattedInput value and emit an event
    formattedInput() {
      this.updateFormattedInput();
    }
  }
};
</script>

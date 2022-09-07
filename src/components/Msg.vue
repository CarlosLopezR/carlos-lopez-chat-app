<template>
  <div class="message">
    <span v-if="!sender">{{ name }}</span>
    <div class="flex" :class="sender ? 'flex-row-reverse' : ''">
      <div class="text w-3/4" :class="sender ? 'bg-cyan-400' : 'bg-gray-700'">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: "" },
    sender: { type: Boolean, default: false },
  },
};
</script>

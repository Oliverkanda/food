<template>
  <div
    class="z-40 fixed left-0 right-0 -top-20 -bottom-20 bg-neutral-700/50 opacity-0 data-[active=true]:opacity-100 data-[active=true]:backdrop-blur-sm translate-x-full data-[active=true]:-translate-x-0 transition-opacity"
    :data-active="isOpened"
    @click="$emit('close')"
  />
  <div
    class="z-40 fixed left-0 top-0 w-full max-w-lg max-h-[100dvh] overflow-y-auto p-2 m-0 pb-20 shadow-none rounded-2xl -translate-x-full data-[active=true]:translate-x-0 data-[active=true]:right-0 data-[active=true]:mx-auto transition-transform"
    :data-active="isOpened"
  >
    <div class="mt-16 p-4 md:p-6 lg:p-8 bg-white dark:bg-neutral-600 rounded-2xl shadow-lg">
      <div class="mb-4 flex flex-row justify-between items-center">
        <h3 class="text-xl md:text-2xl font-medium">
          {{ title }}
        </h3>

        <button
          aria-label="Close"
          class="flex items-center rounded-xl hover:scale-90 hover:bg-neutral-100 dark:hover:bg-neutral-500 duration-200"
          @click="$emit('close')"
        >
          <Icon :name="icons.close" class="w-8 h-8" />
        </button>
      </div>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpened: boolean
  title: string
}>()

defineEmits(['close'])

const { icons } = useAppConfig()
</script>

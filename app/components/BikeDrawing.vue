<script setup lang="ts">
defineProps<{ color: string }>()
</script>

<template>
  <svg viewBox="0 0 640 360" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="140" cy="250" r="92" stroke="#2c3330" stroke-width="14" />
    <circle cx="500" cy="250" r="92" stroke="#2c3330" stroke-width="14" />
    <circle cx="140" cy="250" r="8" fill="#8b9590" />
    <circle cx="500" cy="250" r="8" fill="#8b9590" />
    <path d="M140 250 L270 120 L440 120 L500 250 M270 120 L320 250 L440 120 M320 250 L140 250" :stroke="color" stroke-width="12" style="transition: stroke .4s" />
    <rect x="300" y="132" width="110" height="26" rx="10" fill="#1f2523" />
    <path d="M250 96 L292 96 M440 120 L452 70 L490 64" stroke="#f2f5f3" stroke-width="9" />
    <circle cx="320" cy="250" r="20" stroke="#f2f5f3" stroke-width="7" />
  </svg>
</template>

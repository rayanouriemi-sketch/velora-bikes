<script setup lang="ts">
const { data: bikes } = await useFetch('/api/bikes')
const bike = computed(() => bikes.value?.[0])
const color = ref('#d4ff4f')
</script>

<template>
  <main v-if="bike" class="hero">
    <div class="huge">CITY·ONE</div>
    <BikeDrawing :color="color" class="bike" />
    <div class="info">
      <div>
        <h1>Le vélo électrique qui pèse <b>{{ bike.weight }} kg</b> et se fait oublier en ville.</h1>
        <div class="colors">
          <button v-for="c in bike.colors" :key="c" :class="{ on: color === c }" :style="{ background: c }" :aria-label="`Couleur ${c}`" @click="color = c" />
        </div>
      </div>
      <div class="specs">
        <div><b>{{ bike.range }} km</b><small>d'autonomie</small></div>
        <div><b>25 km/h</b><small>assistance</small></div>
        <div><b>{{ bike.price.toLocaleString('fr-FR') }} €</b><small>ou {{ Math.round(bike.price / 36) }} €/mois</small></div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.hero { padding: 30px 56px 60px; }
.huge { font-weight: 800; font-size: clamp(90px, 19vw, 300px); line-height: .8; letter-spacing: -8px; color: transparent; -webkit-text-stroke: 1.5px #2c3330; user-select: none; }
.bike { display: block; margin: -150px auto 0; width: min(560px, 80vw); position: relative; }
.info { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 10px; gap: 24px; }
h1 { font-weight: 300; font-size: clamp(28px, 3vw, 44px); max-width: 460px; line-height: 1.15; }
h1 b { font-weight: 700; color: var(--acc); }
.specs { display: flex; gap: 36px; }
.specs b { display: block; font-size: 34px; font-weight: 700; }
.specs small { color: var(--mut); font-size: 13px; }
.colors { display: flex; gap: 10px; margin-top: 18px; }
.colors button { width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--line); cursor: pointer; }
.colors button.on { outline: 2px solid var(--acc); outline-offset: 3px; }
@media (max-width: 860px) {
  .hero { padding: 20px 16px; }
  .huge { letter-spacing: -3px; }
  .bike { margin-top: -60px; }
  .info { flex-direction: column; align-items: flex-start; }
  .specs { gap: 20px; flex-wrap: wrap; }
}
</style>

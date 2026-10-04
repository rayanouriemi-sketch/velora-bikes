<script setup lang="ts">
useHead({ title: 'Modèles — Velora' })
const { data: bikes } = await useFetch('/api/bikes')
const compare = ref<string[]>([])
function toggle(id: string) {
  compare.value = compare.value.includes(id) ? compare.value.filter(x => x !== id) : [...compare.value, id].slice(-2)
}
const compared = computed(() => (bikes.value ?? []).filter(b => compare.value.includes(b.id)))
</script>

<template>
  <main class="page">
    <h1>La gamme</h1>
    <p class="lead">Trois vélos, un même moteur silencieux. Sélectionnez-en deux pour les comparer.</p>
    <div class="grid">
      <article v-for="b in bikes" :key="b.id" class="card" :class="{ on: compare.includes(b.id) }">
        <BikeDrawing :color="b.colors[0]!" />
        <div class="row"><h2>{{ b.name }}</h2><span class="tag">{{ b.use }}</span></div>
        <p>{{ b.weight }} kg · {{ b.range }} km · {{ b.price.toLocaleString('fr-FR') }} €</p>
        <button class="btn ghost" @click="toggle(b.id)">{{ compare.includes(b.id) ? 'Retirer' : 'Comparer' }}</button>
      </article>
    </div>
    <section v-if="compared.length === 2" class="cmp">
      <div class="line"><span /><b v-for="b in compared" :key="b.id">{{ b.name }}</b></div>
      <div class="line"><span>Poids</span><b v-for="b in compared" :key="b.id">{{ b.weight }} kg</b></div>
      <div class="line"><span>Autonomie</span><b v-for="b in compared" :key="b.id">{{ b.range }} km</b></div>
      <div class="line"><span>Prix</span><b v-for="b in compared" :key="b.id">{{ b.price.toLocaleString('fr-FR') }} €</b></div>
    </section>
  </main>
</template>

<style scoped>
h1 { font-size: clamp(40px, 5vw, 72px); font-weight: 800; letter-spacing: -2px; }
.lead { color: var(--mut); margin: 10px 0 28px; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.card { border: 1px solid var(--line); border-radius: 24px; padding: 22px; transition: border-color .3s; }
.card.on { border-color: var(--acc); }
.row { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
h2 { font-size: 24px; }
.tag { font-size: 12px; color: var(--bg); background: var(--acc); border-radius: 99px; padding: 4px 10px; font-weight: 700; }
.card p { color: var(--mut); margin: 8px 0 16px; font-size: 14px; }
.cmp { margin-top: 28px; border: 1px solid var(--line); border-radius: 24px; padding: 8px 22px; }
.line { display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 14px 0; border-bottom: 1px solid var(--line); }
.line:last-child { border: 0; }
.line span { color: var(--mut); }
@media (max-width: 860px) { .grid { grid-template-columns: 1fr; } }
</style>

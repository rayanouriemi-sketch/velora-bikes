<script setup lang="ts">
useHead({ title: 'Réserver un essai — Velora' })

const { data: bikes } = await useFetch('/api/bikes')
const { data: shops } = await useFetch('/api/shops')
const form = reactive({ name: '', email: '', bike: 'city-one', shop: '', date: '' })
const errors = ref<Record<string, string>>({})
const done = ref<{ reference: string } | null>(null)
const sending = ref(false)

async function submit() {
  sending.value = true
  errors.value = {}
  try {
    done.value = await $fetch('/api/test-ride', { method: 'POST', body: form })
  }
  catch (e: any) {
    errors.value = e?.data?.data ?? { name: 'Une erreur est survenue.' }
  }
  finally {
    sending.value = false
  }
}
</script>

<template>
  <main class="page wrap">
    <div>
      <h1>Essayez avant d'acheter.</h1>
      <p class="lead">30 minutes en ville avec un conseiller, gratuitement et sans engagement, dans l'un de nos ateliers.</p>
    </div>
    <div v-if="done" class="ok">
      <h2>C'est noté ✓</h2>
      <p>Référence <b>{{ done.reference }}</b>. Projet concept : aucune réservation réelle n'a été créée.</p>
      <button class="btn" @click="done = null">Nouvelle réservation</button>
    </div>
    <form v-else novalidate @submit.prevent="submit">
      <label>Nom<input v-model="form.name"><small v-if="errors.name">{{ errors.name }}</small></label>
      <label>E-mail<input v-model="form.email" type="email"><small v-if="errors.email">{{ errors.email }}</small></label>
      <label>Modèle<select v-model="form.bike"><option v-for="b in bikes" :key="b.id" :value="b.id">{{ b.name }}</option></select><small v-if="errors.bike">{{ errors.bike }}</small></label>
      <label>Atelier<select v-model="form.shop"><option value="" disabled>Choisir…</option><option v-for="s in shops" :key="s">{{ s }}</option></select><small v-if="errors.shop">{{ errors.shop }}</small></label>
      <label>Date<input v-model="form.date" type="date"><small v-if="errors.date">{{ errors.date }}</small></label>
      <button class="btn" :disabled="sending">{{ sending ? 'Envoi…' : 'Réserver mon essai' }}</button>
    </form>
  </main>
</template>

<style scoped>
.wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
h1 { font-size: clamp(40px, 5vw, 72px); font-weight: 800; letter-spacing: -2px; line-height: 1; }
.lead { color: var(--mut); margin-top: 18px; line-height: 1.6; max-width: 420px; }
form, .ok { border: 1px solid var(--line); border-radius: 24px; padding: 28px; display: grid; gap: 16px; }
label { display: grid; gap: 6px; font-size: 13px; color: var(--mut); }
input, select { font: inherit; color: var(--txt); background: #141817; border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; outline: none; }
input:focus, select:focus { border-color: var(--acc); }
small { color: #ff6b4a; }
.ok h2 { font-size: 30px; color: var(--acc); }
.ok p { color: var(--mut); }
@media (max-width: 860px) { .wrap { grid-template-columns: 1fr; } }
</style>

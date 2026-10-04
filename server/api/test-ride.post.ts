export default defineEventHandler(async (event) => {
  const body = await readBody<{ name?: string, email?: string, bike?: string, shop?: string, date?: string }>(event)
  const errors: Record<string, string> = {}
  if (!body?.name?.trim()) errors.name = 'Indiquez votre nom.'
  if (!/^\S+@\S+\.\S+$/.test(body?.email ?? '')) errors.email = 'Adresse e-mail invalide.'
  if (!bikes.some(b => b.id === body?.bike)) errors.bike = 'Choisissez un modèle.'
  if (!shops.includes(body?.shop ?? '')) errors.shop = 'Choisissez un atelier.'
  if (!body?.date || new Date(body.date) < new Date(new Date().toDateString())) errors.date = 'Choisissez une date à venir.'
  if (Object.keys(errors).length) throw createError({ statusCode: 422, data: errors })

  // Projet concept : aucune réservation n'est réellement enregistrée
  return { reference: `VEL-${Math.random().toString(36).slice(2, 7).toUpperCase()}`, ...body }
})

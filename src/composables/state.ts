import type { Timezone } from '@/types'

export interface State {
  name?: string
  description?: string
  zones: string[]
  home: string
  date: Date
  selections: Selection[]
}

export interface Selection {
  from: Date
  to: Date
}

const userTimezone = new Intl.DateTimeFormat().resolvedOptions().timeZone

export const storage = useStorage<State>('what-time-state', {
  zones: [userTimezone],
  home: userTimezone,
  date: new Date(),
  selections: [],
})

export const now = useNow({ interval: 30_000 })
export const zoneNames = toRef(storage.value, 'zones')
export const homeZone = toRef(storage.value, 'home')
export const homeOffset = computed(() => timezones.find(i => i.name === homeZone.value)?.offset || 0)
export const zones = $computed<Timezone[]>(() => {
  return zoneNames.value.map(name => timezones.find(zone => zone.name === name))
})

export function addToTimezones(timezone: Timezone) {
  zoneNames.value.push(timezone.name)
}

export function remove(zone: Timezone) {
  zoneNames.value = zoneNames.value.filter(name => zone.name !== name)
}

export function move(zone: Timezone, delta: -1 | 1) {
  const idx = zoneNames.value.indexOf(zone.name)

  if (idx === -1)
    return

  const targetIdx = idx + delta

  const targetIdxItem = zoneNames.value[targetIdx]
  zoneNames.value[targetIdx] = zone.name
  zoneNames.value[idx] = targetIdxItem
}

if (!zones.length)
  zoneNames.value = [userTimezone]

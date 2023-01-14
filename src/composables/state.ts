import type { Timezone } from '@/types'

const userTimezone = new Intl.DateTimeFormat().resolvedOptions().timeZone
export const now = useNow({ interval: 30_000 })
export const zoneNames = useStorage<string[]>('world-time-zones', [])
export const currentZone = ref(userTimezone)
export const currentOffset = ref(timezones.find(i => i.name === currentZone.value).offset)
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
  zoneNames.value.push(userTimezone)

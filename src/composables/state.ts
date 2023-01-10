import type { Timezone } from '@/types'

export const zoneNames = useStorage<string[]>('world-time-zones', [])
export const zones = $computed<Timezone[]>(() => {
  return zoneNames.value.map(name => timezones.find(zone => zone.name === name))
})

export function addToTimezones(timezone: Timezone) {
  zoneNames.value.push(timezone.name)
}

const userTimezone = new Intl.DateTimeFormat().resolvedOptions().timeZone
if (!zones.length)
  zoneNames.value.push(userTimezone)

import type { Timezone } from '@/types'

export const zones = ref<Timezone[]>([])

export function addToTimezones(timezone: Timezone) {
  zones.value.push(timezone)
}

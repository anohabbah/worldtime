<template>
  <div of-x-auto relative>
    <div
      v-for="(zone, idx) in zones"
      :key="idx"
      px4 py2
      border="b base" relative
    >
      <TimezoneItem :timezone="zone" w-max>
        <TimeDial :timezone="zone" />
      </TimezoneItem>

      <div class="absolute" left="-30px" top-0 bottom-0 text-xl flex="~ col" justify-center>
        <template v-if="homeZone !== zone.name">
          <button
            icon-btn m--1px i-ri-close-fill
            title="Remove"
            @click="remove(zone)"
          />
          <button
            icon-btn m--1px i-ri-home-2-fill
            title="Set as home" scale-75
            @click="setHome(zone)"
          />
        </template>
        <button
          v-if="idx !== 0"
          icon-btn m--1px i-ri-arrow-up-s-fill
          title="Move up"
          @click="move(zone, -1)"
        />
        <button
          v-if="idx !== zones.length - 1"
          icon-btn m--1px i-ri-arrow-down-s-fill
          title="Move down"
          @click="move(zone, +1)"
        />
      </div>
    </div>

    <SelectionOverlay absolute inset-0 />
  </div>
</template>

<template>
  <svg class="logo-svg" viewBox="0 0 56 61" xmlns="http://www.w3.org/2000/svg" height="48" width="44">
    <!-- Top Face of Stem -->
    <polygon points="12,12 20,5 34,5 26,12" class="logo-face logo-face-top" />
    <!-- Top Face of Foot -->
    <polygon points="26,38 34,31 52,31 44,38" class="logo-face logo-face-top" />
    <!-- Right Face of Stem -->
    <polygon points="26,12 34,5 34,31 26,38" class="logo-face logo-face-side" />
    <!-- Right Face of Foot -->
    <polygon points="44,38 52,31 52,45 44,52" class="logo-face logo-face-side" />
    <!-- Front Face of L -->
    <polygon points="12,12 26,12 26,38 44,38 44,52 12,52" class="logo-face logo-face-front" />
    <!-- Definition Lines -->
    <polyline points="26,12 26,38 44,38" class="logo-line" />
  </svg>
</template>

<style scoped lang="scss">
.logo-svg {
  display: block;
  overflow: visible;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.18));
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px) scale(1.05);
  }
}

.logo-face {
  stroke: var(--color-text-400);
  stroke-width: 2.5;
  stroke-linejoin: round;

  &-top {
    fill: #ffb95f;
  }

  &-side {
    fill: #d76919;
  }

  &-front {
    fill: #ff8e2a;
  }
}

.logo-line {
  fill: none;
  stroke: var(--color-text-400);
  stroke-width: 2.5;
  stroke-linejoin: round;
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../../animations";
import { t } from "../../../i18n/utils/translate";
import Social from "../../../components/Social.vue";

const contactElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (contactElement.value) {
    transitions.contact.setup(contactElement.value);
  }
});

onUnmounted(() => {
  transitions.contact.destroy();
});
</script>

<template>
  <div class="contact grid" ref="contactElement">
    <div class="contact-content">
      <div class="contact-status">
        <span class="contact-status-dot"></span>
        <span class="contact-status-text">Disponible para nuevos proyectos</span>
      </div>
      <h2 class="contact-title" v-html="t('lets-work-together')"></h2>
      <a href="mailto:lioneldavora1@gmail.com" class="contact-email" data-cursor="circle-white" data-hoversound="hover">
        lioneldavora1@gmail.com
      </a>
      <Social variant="background" />
      <p class="contact-location">Chimbote, Perú &bull; Remoto / Híbrido</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: calc(var(--svw) * 100);
  overflow: hidden;
  min-height: calc(var(--lvh) * 100);
  padding: var(--space-outer);
  padding-top: var(--space-lg);

  @include mixins.mq("md") {
    padding-top: var(--space-xxl);
  }

  &-content {
    position: relative;
    padding-top: var(--space-md);
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);

    @include mixins.mq("sm") {
      grid-column: 1 / 8;
    }

    @include mixins.mq("md") {
      gap: var(--space-xl);
      grid-column: 1 / 6;
      padding-top: var(--space-lg);
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 6;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: var(--font-size-title-md);

    @include mixins.mq("sm") {
      font-size: var(--font-size-title-lg);
    }

    @include mixins.mq("xl") {
      font-size: var(--font-size-title-xl);
    }
  }

  &-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    padding: 4px 12px;
    border-radius: 100px;
    background: rgba(223, 165, 92, 0.12);
    border: 1px solid rgba(223, 165, 92, 0.35);

    &-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: var(--color-orange-400);
      box-shadow: 0 0 8px var(--color-orange-400);
      animation: pulseContactDot 2.2s infinite ease-in-out;
    }

    &-text {
      font-size: var(--font-size-xs);
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--color-orange-400);
    }
  }

  &-email {
    font-size: var(--font-size-md);
    font-weight: 700;
    letter-spacing: 0.01em;
    color: var(--color-white-400);
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: rgba(223, 165, 92, 0.5);
    transition: color 0.15s ease, text-decoration-color 0.15s ease;
    width: fit-content;

    &:hover {
      color: var(--color-orange-400);
      text-decoration-color: var(--color-orange-400);
    }

    @include mixins.mq("md") {
      font-size: var(--font-size-lg);
    }
  }

  &-location {
    font-size: var(--font-size-sm);
    color: var(--color-grayscale-600);
    font-weight: 500;
  }
}

@keyframes pulseContactDot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(0.75);
  }
}
</style>

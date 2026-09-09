<script setup lang="ts">
import { t } from "../../../i18n/utils/translate";
import { ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import AppearingText from "../../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../../utils/sizes";
import { Vector3 } from "three";
import PinIcon from "../../../components/icons/Pin.vue";
import ProjectedElement from "../../../components/ProjectedElement.vue";

const point = new Vector3(-0.76, 3.6, 6.75);

const wrapperRef = ref<HTMLDivElement | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
let matchMedia: gsap.MatchMedia | null = null;

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  const wrapperEl = wrapperRef.value;
  if (!wrapperEl) return;

  // Clean up previous matchMedia
  if (matchMedia) {
    matchMedia.revert();
    matchMedia = null;
  }

  // Initialize GSAP matchMedia
  matchMedia = gsap.matchMedia();

  matchMedia.add(
    {
      isMobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
      isDesktop: `(min-width: ${BREAKPOINTS.md}px)`,
      isLandscape: `(min-aspect-ratio: 1)`,
    },
    (context) => {
      const { conditions } = context;
      const { isLandscape } = conditions as { isMobile: boolean; isDesktop: boolean; isLandscape: boolean };

      const tl = gsap.timeline({
        paused: true,
      });

      // Only animate clipPath on landscape (animations disabled on portrait)
      if (isLandscape) {
        tl.fromTo(
          wrapperEl,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "none" },
          0,
        );
      } else {
        // On portrait, set clipPath immediately without animation
        gsap.set(wrapperEl, { clipPath: "inset(0% 0% 0% 0%)" });
      }

      // Only add timeline animations on landscape
      if (isLandscape) {
        for (let i = 0; i < timelines.value.length; i++) {
          const item = timelines.value[i];
          if (!item) continue;
          tl.add(() => {
            item.timeline.restart(true);
          }, item.delay + 0.25);
        }
      }

      emit("timeline:created", tl);

      // Return cleanup function
      return () => {
        tl.kill();
      };
    },
  );

  onInvalidate(() => {
    if (matchMedia) {
      matchMedia.revert();
      matchMedia = null;
    }
  });
});

onBeforeUnmount(() => {
  if (matchMedia) {
    matchMedia.revert();
  }
});

const handleTimelineCreated = (timeline: gsap.core.Timeline, delay: number) => {
  const updatedTimelines = [...timelines.value, { timeline, delay }];
  timelines.value = updatedTimelines;
};
</script>

<template>
  <ProjectedElement :point="point">
    <div ref="wrapperRef" class="box-details">
      <div class="box-details-content">
        <div class="box-details-header">
          <div class="box-details-title">
            <AppearingText
              text="Lionel Aguirre"
              :steps="1"
              :duration="0.35"
              @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
            />
          </div>
          <div class="box-details-status">
            <span class="box-details-status-dot"></span>
            <span class="box-details-status-text">Disponible</span>
          </div>
        </div>
        <div class="box-details-items">
          <div class="box-details-item">
            <p class="box-details-role">Desarrollador de Software</p>
          </div>
          <div class="box-details-item">
            <PinIcon class="box-details-icon" />
            <AppearingText
              v-if="t('germany')"
              class="box-details-content-copy"
              :text="t('germany')"
              :steps="3"
              :duration="0.35"
              @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.1)"
            />
          </div>
          <div class="box-details-badges">
            <span class="box-details-badge">Backend & BD</span>
            <span class="box-details-badge">Android Nativo</span>
          </div>
        </div>
      </div>
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
.box-details {
  --line-length: min(48px, calc(var(--svw) * 5));

  display: none;

  @include mixins.landscape {
    display: block;
    position: absolute;
    padding-bottom: 3px;
    padding-right: var(--line-length);
    width: 270px;
    max-width: calc(var(--svw) * 32);
    transform: translate(-100%, -50%);
  }

  @include mixins.landscape-large {
    width: 280px;
  }

  &::after,
  &::before {
    display: none;

    @include mixins.landscape {
      display: block;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 11px;
    height: 11px;
    background-color: var(--color-cyan-400);
    border-radius: 50%;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: var(--line-length);
    height: 0;
    border-bottom: var(--stroke-sm) solid var(--color-cyan-400);
  }

  &-content {
    border: var(--stroke-sm) solid var(--color-cyan-400);
    border-radius: var(--radius-md);
    background: linear-gradient(to bottom, var(--color-hologram-top) 0%, var(--color-hologram-bottom) 100%);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 16px rgba(223, 165, 92, 0.12);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    gap: var(--space-xxs);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: var(--space-sm) var(--space-md);

    @include mixins.landscape {
      flex-direction: column;
      justify-content: flex-start;
      padding: var(--space-xs) var(--space-sm);
    }

    @include mixins.mq("md") {
      padding: var(--space-sm) var(--space-md);
    }
  }

  &-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xs);
    width: 100%;
  }

  &-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-cyan-300);
    background: rgba(223, 165, 92, 0.12);
    padding: 2px 7px;
    border-radius: 10px;
    border: 1px solid rgba(223, 165, 92, 0.35);

    &-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #00e699;
      box-shadow: 0 0 6px #00e699;
      display: inline-block;
      animation: pulseDot 2s infinite ease-in-out;
    }

    &-text {
      line-height: 1;
      font-weight: 700;
    }
  }

  &-role {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: 0.02em;
  }

  &-item {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    flex-direction: row;
    white-space: nowrap;
    height: var(--icon-size-sm);
  }

  &-icon {
    width: var(--icon-size-xxs);
    transform: translateY(-1px);
    --icon-color: var(--color-white-400);

    @include mixins.mq("md") {
      width: var(--icon-size-xs);
    }
  }

  &-title {
    font-size: var(--font-size-title-xxs);
    font-weight: 700;

    @include mixins.mq("md") {
      font-size: var(--font-size-title-sm);
    }
  }

  &-items {
    display: flex;
    font-size: var(--font-size-sm);
    flex-direction: column;
    gap: 2px;

    @include mixins.mq("md") {
      font-size: var(--font-size-md);
    }

    &-copy {
      flex: 0.5;
    }
  }

  &-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 4px;
  }

  &-badge {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 2px 7px;
    border-radius: 4px;
    background: rgba(223, 165, 92, 0.15);
    border: 1px solid rgba(223, 165, 92, 0.35);
    color: var(--color-orange-400);
  }
}

@keyframes pulseDot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.75);
  }
}
</style>

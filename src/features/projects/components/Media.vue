<script setup lang="ts">
import { computed, ref, onMounted, watchEffect } from "vue";
import gsap from "gsap";
import Notch from "../../../components/Notch.vue";

const wrapperRef = ref<HTMLDivElement | null>(null);
const mediaRef = ref<HTMLVideoElement | HTMLImageElement | null>(null);
const mediaContentRef = ref<HTMLDivElement | null>(null);
const isMounted = ref(false);

export interface Props {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  index: number;
  device?: "phone" | "default";
}

const props = withDefaults(defineProps<Props>(), {
  device: "default",
});

const isPhone = computed(() => props.device === "phone");

const wrapperClasses = computed(() => {
  return {
    "project-media": true,
    "project-media--phone": isPhone.value,
  };
});

watchEffect(async (onInvalidate) => {
  if (!wrapperRef.value) {
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperRef.value,
      start: "top bottom",
      end: "bottom bottom",
      toggleActions: "play none none reset",
    },
  });

  if (isPhone.value) {
    if (mediaContentRef.value) {
      tl.fromTo(
        mediaContentRef.value,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0
      );
    }
  } else {
    if (mediaContentRef.value) {
      tl.fromTo(mediaContentRef.value, { scale: 0.8 }, { scale: 1, duration: 0.4, ease: "power1.out" }, 0);
    }
    if (mediaRef.value) {
      tl.fromTo(mediaRef.value, { scale: 1.2 }, { scale: 1, duration: 0.4, ease: "power1.out" }, 0);
    }
  }

  onInvalidate(() => {
    tl.kill();
    if (mediaContentRef.value) {
      gsap.set(mediaContentRef.value, { clearProps: "all" });
    }
    if (mediaRef.value) {
      gsap.set(mediaRef.value, { clearProps: "all" });
    }
  });
});

onMounted(async () => {
  isMounted.value = true;
});
</script>

<template>
  <div :class="wrapperClasses" ref="wrapperRef">
    <!-- Smartphone floating mockup for mobile projects -->
    <template v-if="isPhone">
      <div class="project-phone-wrapper" ref="mediaContentRef">
        <div class="project-phone-floater">
          <div class="project-phone-chassis">
            <!-- Hardware side buttons -->
            <div class="phone-btn phone-btn--vol-up"></div>
            <div class="phone-btn phone-btn--vol-down"></div>
            <div class="phone-btn phone-btn--power"></div>

            <!-- Phone Screen Area -->
            <div class="project-phone-screen">
              <!-- Punch hole camera -->
              <div class="phone-punchhole"></div>

              <!-- Uncropped Full App Screenshot -->
              <img
                v-if="props.type === 'image'"
                :src="props.src"
                :alt="props.alt"
                loading="lazy"
                fetchpriority="high"
                class="project-phone-image"
                ref="mediaRef"
              />
              <video
                v-else
                :src="props.src"
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
                class="project-phone-video"
                ref="mediaRef"
              >
                <source :src="props.src" type="video/mp4" />
              </video>

              <!-- Subtle Screen Glare -->
              <div class="phone-glare"></div>
            </div>
          </div>

          <!-- Pulsing Shadow beneath device -->
          <div class="project-phone-shadow"></div>
        </div>

        <!-- Clean Phone Caption -->
        <p v-if="props.caption" class="project-phone-caption">
          {{ props.caption }}
        </p>
      </div>
    </template>

    <!-- Standard 16:9 media display for desktop/web projects -->
    <template v-else>
      <div class="project-media-content" ref="mediaContentRef">
        <img
          v-if="props.type === 'image'"
          :src="props.src"
          :alt="props.alt"
          loading="lazy"
          fetchpriority="high"
          class="project-media-image"
          ref="mediaRef"
        />
        <video
          v-else
          :src="props.src"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          class="project-media-video"
          ref="mediaRef"
        >
          <source :src="props.src" type="video/mp4" />
        </video>
      </div>
      <div class="project-media-caption" v-if="props.caption">
        <Notch class="project-media-caption-notch project-media-caption-notch-left" />
        <Notch class="project-media-caption-notch project-media-caption-notch-top" />
        <p class="project-media-caption-copy">{{ props.caption }}</p>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.project-media {
  width: 100%;
  height: 100%;
  grid-column: 1 / 13;
  max-width: 900px;
  justify-self: center;
  position: relative;
  aspect-ratio: 16 / 9;

  @include mixins.mq("md") {
    grid-column: 2 / 12;
  }

  @include mixins.mq("lg") {
    grid-column: 3 / 11;
  }

  &--phone {
    aspect-ratio: unset;
    height: auto;
    max-width: 440px;
    display: flex;
    justify-content: center;
    align-items: center;

    @include mixins.mq("md") {
      grid-column: 3 / 11;
    }

    @include mixins.mq("lg") {
      grid-column: 4 / 10;
    }
  }

  &-caption {
    position: absolute;
    bottom: -1px;
    right: -1px;
    background-color: var(--color-background-400);
    padding: var(--space-xxs) var(--space-sm);
    border-radius: var(--radius-md) 0 0 0;

    @include mixins.mq("md") {
      padding: var(--space-xxs) var(--space-sm);
    }

    @include mixins.mq("lg") {
      padding: var(--space-xs) var(--space-md);
      border-radius: var(--radius-lg) 0 0 0;
    }

    &-notch {
      position: absolute;
      color: var(--color-background-400);
      --icon-color: var(--color-background-400);
      width: var(--radius-md);

      @include mixins.mq("md") {
        width: var(--radius-lg);
      }

      &-left {
        left: 0;
        bottom: 0;
        transform: translate(-100%, 0) scale(-1) rotate(90deg);
      }

      &-top {
        top: 0;
        right: 0;
        transform: translate(0, -100%) scale(-1) rotate(90deg);
      }
    }

    &-copy {
      font-size: var(--font-size-sm);
      font-weight: 700;

      @include mixins.mq("md") {
        font-size: var(--font-size-md);
      }
    }
  }

  &-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-content {
    overflow: hidden;
    border-radius: var(--radius-lg);
    background-color: var(--color-background-300);
    width: 100%;
    height: 100%;
  }
}

/* Phone Floating Mockup Styles */
.project-phone {
  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: var(--space-xs) 0 var(--space-md);
  }

  &-floater {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    animation: phoneFloat 5.5s ease-in-out infinite;
    transform-origin: center center;
  }

  &-chassis {
    position: relative;
    width: 100%;
    max-width: 320px;
    background: #181715;
    border: 5px solid #2e2b26;
    border-radius: 46px;
    padding: 8px;
    box-shadow:
      0 0 0 1px #11100f,
      0 26px 54px -12px rgba(0, 0, 0, 0.65),
      0 12px 24px -6px rgba(0, 0, 0, 0.4),
      inset 0 0 0 1px rgba(255, 255, 255, 0.08);

    @include mixins.mq("md") {
      max-width: 340px;
      padding: 9px;
    }
  }

  &-screen {
    position: relative;
    width: 100%;
    border-radius: 36px;
    overflow: hidden;
    background-color: #000000;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
  }

  &-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }

  &-video {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }

  &-shadow {
    width: 72%;
    height: 18px;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 72%);
    margin-top: 24px;
    border-radius: 50%;
    animation: shadowPulse 5.5s ease-in-out infinite;
  }

  &-caption {
    margin-top: var(--space-md);
    text-align: center;
    color: var(--color-text-300);
    font-size: var(--font-size-sm);
    font-weight: 600;
    max-width: 340px;
    line-height: 1.5;
  }
}

.phone-punchhole {
  position: absolute;
  top: 9px;
  left: 50%;
  transform: translateX(-50%);
  width: 11px;
  height: 11px;
  background-color: #000000;
  border: 1px solid #1c1c1e;
  border-radius: 50%;
  z-index: 5;
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #1e2c3a;
    opacity: 0.8;
  }
}

.phone-glare {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    130deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 28%,
    transparent 55%
  );
  pointer-events: none;
  z-index: 4;
  border-radius: 36px;
}

.phone-btn {
  position: absolute;
  width: 3px;
  background: #3a3630;
  border-radius: 2px;
  pointer-events: none;

  &--vol-up {
    left: -8px;
    top: 85px;
    height: 38px;
    border-radius: 3px 0 0 3px;
  }

  &--vol-down {
    left: -8px;
    top: 135px;
    height: 38px;
    border-radius: 3px 0 0 3px;
  }

  &--power {
    right: -8px;
    top: 105px;
    height: 52px;
    border-radius: 0 3px 3px 0;
  }
}

@keyframes phoneFloat {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(0.35deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

@keyframes shadowPulse {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }
  50% {
    transform: scale(0.82);
    opacity: 0.28;
  }
  100% {
    transform: scale(1);
    opacity: 0.55;
  }
}
</style>

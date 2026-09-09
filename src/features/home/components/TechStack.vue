<script setup lang="ts">
import Banner from "../../../components/Banner.vue";
import { t } from "../../../i18n/utils/translate";

interface StackPillar {
  id: string;
  category: string;
  focus: string;
  description: string;
  skills: string[];
}

const pillars: StackPillar[] = [
  {
    id: "backend",
    category: "Backend & Transaccional",
    focus: "Sistemas Críticos & Datos Relacionales",
    description:
      "Diseño e implementación de lógica de negocio robusta con estricta consistencia ACID, procedimientos almacenados y optimización de concurrencia en bases de datos.",
    skills: ["Java 17 LTS", "Spring Boot", "SQL Server", "PostgreSQL", "Procedimientos Almacenados", "Transacciones ACID", "JDBC / HikariCP"],
  },
  {
    id: "mobile",
    category: "Desarrollo Móvil Nativo",
    focus: "Android & Arquitectura Offline-First",
    description:
      "Creación de aplicaciones nativas de alto rendimiento preparadas para operar 100% offline, con persistencia local reactiva y arquitectura limpia.",
    skills: ["Android SDK", "Kotlin", "Room DB", "SQLite", "Patrón MVVM", "Coroutines & Flow", "Material Design 3"],
  },
  {
    id: "frontend",
    category: "Frontend & Interfaces Web",
    focus: "Soluciones Comerciales & Rendimiento",
    description:
      "Desarrollo de interfaces directas al consumidor sin fricciones, integradas con pasarelas de pedidos, cálculo dinámico en cliente y despliegue automatizado.",
    skills: ["React", "TypeScript", "Vue.js", "Tailwind CSS", "Vite", "REST APIs", "Mobile-First UX", "CI/CD Netlify"],
  },
  {
    id: "devops",
    category: "DevOps & Metodología",
    focus: "Calidad de Código & Flujo de Trabajo",
    description:
      "Flujos de ingeniería estructurados con control riguroso de versiones, pruebas de integración de endpoints, contenedorización y documentación técnica.",
    skills: ["Git & GitHub", "Docker", "Postman", "Linux", "Clean Code", "Separación de Capas", "Seguridad por Roles"],
  },
];
</script>

<template>
  <div class="techstack">
    <div class="grid">
      <div class="techstack-header">
        <Banner class="techstack-banner" :copy="t('engineering-principles')" size="sm" animated />
        <h2 class="techstack-title">{{ t("expertise") }}</h2>
      </div>
    </div>

    <div class="grid">
      <div class="techstack-cards">
        <div
          v-for="pillar in pillars"
          :key="pillar.id"
          class="stack-card"
          data-hoversound="hover"
        >
          <div class="stack-card-header">
            <span class="stack-card-badge">{{ pillar.focus }}</span>
            <h3 class="stack-card-title">{{ pillar.category }}</h3>
          </div>
          <p class="stack-card-description">{{ pillar.description }}</p>
          <div class="stack-card-skills">
            <span v-for="skill in pillar.skills" :key="skill" class="skill-pill">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.techstack {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  padding-top: var(--space-xl);

  @include mixins.mq("md") {
    padding-top: var(--space-xxl);
    gap: var(--space-xxl);
  }

  &-header {
    position: relative;
    padding-top: var(--space-md);
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      grid-column: 1 / 10;
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 8;
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

  &-banner {
    position: absolute;
    top: 0;
    left: -8px;
    transform: translate(0, -20%) rotate(-4deg);

    @include mixins.mq("lg") {
      left: -16px;
      transform: translate(0, -20%) rotate(-6deg);
    }
  }

  &-cards {
    grid-column: 1 / span 12;
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: 1fr;

    @include mixins.mq("md") {
      grid-column: 1 / span 12;
      grid-template-columns: repeat(2, 1fr);
    }

    @include mixins.mq("lg") {
      grid-column: 3 / span 8;
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.stack-card {
  position: relative;
  background-color: var(--color-beige-500);
  border-radius: var(--radius-xl);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }

  &-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  &-badge {
    font-size: var(--font-size-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-orange-500);
  }

  &-title {
    font-size: var(--font-size-title-xs);
    font-weight: 700;
    color: var(--color-text-400);
  }

  &-description {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-copy);
    color: var(--color-text-300);
  }

  &-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
    padding-top: var(--space-xs);
  }
}

.skill-pill {
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 4px 12px;
  background-color: var(--color-beige-400);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 100px;
  color: var(--color-text-400);
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background-color: var(--color-orange-400);
    border-color: var(--color-orange-400);
    color: var(--color-white-400);
  }
}
</style>

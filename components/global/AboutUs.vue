<script setup lang="ts">
import { navigateTo, useRoute } from '#app'

const user = useUser() // Hook para obtener la información del usuario
const route = useRoute() // Hook para obtener la información de la ruta actual

const items = computed(() => [
  [{
    label: user.value?.email ?? '',
    slot: 'account',
    disabled: true,
  }],
  [{
    label: 'Profile',
    icon: 'i-heroicons-cog-8-tooth',
    to: '/app/profile',
  }],
  [{
    label: 'Static Page', // Aquí es donde puedes poner la opción para redirigir a una página estática
    icon: 'i-heroicons-arrow-left-on-rectangle',
    external: false, // Indica que es una ruta interna
    action: () => navigateTo('/static-page'), // Redirige a la página estática
  }],
])

// Maneja la redirección al hacer clic en un elemento
function handleItemClick(item) {
  if (item.action) {
    item.action()
  }
}
</script>

<template>
  <div v-if="user" class="flex items-center gap-2">
    <NuxtLink v-if="!route.path.startsWith('/app')" to="/app">
      About
    </NuxtLink>
    <span v-else class="text-sm">{{ user?.name }}</span>
    <!--
      <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }">
        <UAvatar icon="i-solar-user-bold-duotone" />
        <template #account="{ item }">
          <div class="text-left">
            <p>Signed in with</p>
            <p class="truncate font-medium">{{ item.label }}</p>
          </div>
        </template>
        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>
          <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 ms-auto" />
        </template>
      </UDropdown> -->
  </div>
  <div v-else>
    <NuxtLink
      to="/login"
      class="py-3 px-4 text-center border border-gray-200 dark:border-gray-800 rounded-md block lg:inline lg:border-0"
    >
      Login
    </NuxtLink>
  </div>
</template>

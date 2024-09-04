<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'

const modalOpen = ref(false)
const route = useRoute()

// Datos mock en lugar de llamada a la API
const mockData = {
  orgs: [
    { org: { name: 'Org 1', slug: 'org-1' } },
    { org: { name: 'Org 2', slug: 'org-2' } },
  ],
}

const data = ref(mockData)
function refresh() {
  // Aquí podrías refrescar los datos mock si fuera necesario
}

const items = computed(() => [
  ...data.value.orgs.map(o => ({ label: o.org.name, to: `/app/${o.org.slug}` })) || [],
  [{ icon: 'i-solar-add-circle-line-duotone', label: 'Create new team', click: () => {
    modalOpen.value = true
  } }],
])

const org = computed(() => data.value.orgs.find(o => o.org.slug === route.params.slug)?.org)

const formState = reactive({
  name: undefined,
})

async function onSubmit(event: FormSubmitEvent<any>) {
  modalOpen.value = false

  // Simulación de creación de una nueva organización
  const newOrg = {
    org: {
      name: event.data.name,
      slug: event.data.name.toLowerCase().replace(/\s+/g, '-'),
    },
  }
  data.value.orgs.push(newOrg)
  refresh()
  navigateTo(`/app/${newOrg.org.slug}`)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <UDropdown :items="items" class="border border-gray-200 dark:border-gray-800 rounded-xl py-1 px-2 text-sm">
      <span class="flex items-center gap-2 justify-between">{{ org?.name }} <UIcon name="i-solar-alt-arrow-down-line-duotone" /> </span>
    </UDropdown>
  </div>

  <UModal v-model="modalOpen">
    <UCard>
      <template #header>
        <h2>Create new team</h2>
      </template>
      <UForm :state="formState" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Name" name="name">
          <UInput v-model="formState.name" placeholder="Name" required />
        </UFormGroup>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </UCard>
  </UModal>
</template>

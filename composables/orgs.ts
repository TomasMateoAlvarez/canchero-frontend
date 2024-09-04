// Datos mock
const mockOrgsData = {
  orgs: [
    { org: { name: 'Org 1', slug: 'org-1' } },
    { org: { name: 'Org 2', slug: 'org-2' } },
  ],
}

// Mock para una organización específica
function mockOrgDetails(slug: string) {
  const org = mockOrgsData.orgs.find(o => o.org.slug === slug)
  return org ? { org: org.org } : null
}

export async function useOrgs() {
  return {
    data: ref(mockOrgsData),
    refresh: () => {
      // Lógica de refresco si es necesario
    },
  }
}

export async function useOrgData() {
  const route = useRoute()
  const orgData = ref(mockOrgDetails(route.params.slug as string))

  return {
    data: orgData,
    refresh: () => {
      // Lógica de refresco si es necesario
      orgData.value = mockOrgDetails(route.params.slug as string)
    },
  }
}

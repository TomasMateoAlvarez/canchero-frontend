<script setup lang="ts">
// Datos mock

const mockData = {
  orgs: [
    { org: { name: 'Org 1', slug: 'register' }, default: false },
    { org: { name: 'Org 2', slug: 'login' }, default: true },
    { org: { name: 'Org 2', slug: 'dashboard' }, default: true },
  ],
}

// Simulación de fetch
const data = ref(mockData)

const defaultSlug = computed(() => data.value?.orgs.find(o => o.default)?.org.slug ?? '')

navigateTo(`/app/${defaultSlug.value}`)
</script>

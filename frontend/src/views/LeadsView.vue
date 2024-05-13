<template>
  <div class="leads-view">
    <div class="leads-header">
      <h1>Leads</h1>
    </div>
    <table-component :items="leads" :columns="leadColumns" :paginatorTemplate="paginatorTemplate" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TableComponent from '@/components/TableComponent.vue'
import type { Lead } from '@/client/api'
import { useLeadService } from '@/services/lead'
import { useLoadStore } from '@/stores/load'

const leadStore = useLeadService()
const loadStore = useLoadStore()
const leads = ref<Lead[]>([])
const paginatorTemplate =
  'CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown'

const leadColumns = [
  { field: 'firstName', header: 'First Name' },
  { field: 'lastName', header: 'Last Name' },
  { field: 'phoneNumber', header: 'Phone Number' },
  { field: 'email', header: 'Email' },
  { field: 'campaignId', header: 'Campaign ID' },
  { field: 'leadStatus', header: 'Lead Status' },
  { field: 'createdAt', header: 'Created At' },
  { field: 'updatedAt', header: 'Updated At' }
]

const formatDateTime = (date: Date) =>
  new Date(date).toISOString().replace('T', ' ').substring(0, 16)

onMounted(async () => {
  loadStore.setLoading(true)
  const loadedLeads = (await leadStore.findAll()) || []
  leads.value = loadedLeads.map((lead) => ({
    ...lead,
    createdAt: formatDateTime(new Date(lead.createdAt)),
    updatedAt: formatDateTime(new Date(lead.updatedAt))
  }))
  loadStore.setLoading(false)
})
</script>

<style scoped lang="scss">
.leads-view {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  align-self: center;
  width: 100%;
  min-width: 1200px;
}

.leads-view h1 {
  color: #333;
  margin: 1rem 0 1rem 1rem;
  font-size: 2.5rem;
  font-weight: 500;
}

.leads-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>

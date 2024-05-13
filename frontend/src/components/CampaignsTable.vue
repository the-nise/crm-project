<template>
  <p-confirm-popup />
  <p-data-table
    :value="campaigns"
    :paginator="true"
    :rows="10"
    :paginatorTemplate="paginatorTemplate"
  >
    <p-column field="name" header="Campaign Name"></p-column>
    <p-column field="createdAt" header="Created At"></p-column>
    <p-column field="actions" header="Actions">
      <template #body="slotProps">
        <span class="is-flex is-justify-content-flex-start">
          <p-button
            class="button is-info is-circle"
            icon="pi pi-pencil"
            title="Edit Campaign"
            @click="handleUpdate(slotProps.data)"
          />
          <p-button
            class="button is-danger is-circle"
            icon="pi pi-trash"
            title="Delete Campaign"
            @click="(e: Event) => handleDelete(e, slotProps.data)"
          />
        </span>
      </template>
    </p-column>
  </p-data-table>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCampaignService } from '@/services/campaign'
import { useRouter } from 'vue-router'
import { type Campaign } from '@/client/api'
import { useConfirm } from 'primevue/useconfirm'
import { useLoadStore } from '@/stores/load'
import { useToast } from 'primevue/usetoast'

const campaignStore = useCampaignService()
const loadStore = useLoadStore()
const toast = useToast()
const router = useRouter()
const confirm = useConfirm()
const campaigns = ref(
  [] as {
    id: string
    name: string
    createdAt: string
  }[]
)

const paginatorTemplate =
  'CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown'

const formatDateTime = (date: string) => {
  return new Date(date).toISOString().replace('T', ' ').substring(0, 16)
}

const handleUpdate = (campaign: Campaign) => {
  router.push({ name: 'update-campaign', params: { id: campaign.id } })
}

const handleDelete = async (event: Event, campaign: Campaign) => {
  if (!campaign || !event) return
  if (!(event.currentTarget instanceof HTMLElement)) return
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to remove the campaign? This action is irreversible.',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger p-button-sm',
    accept: async () => {
      await campaignStore.remove(campaign)
      campaigns.value = campaigns.value.filter((u) => u.id !== campaign.id)
      loadStore.setLoading(false)
      toast.add({
        severity: 'success',
        detail: 'User removed successfully',
        life: 3000
      })
    }
  })
}

onMounted(async () => {
  const loadedCampaigns = (await campaignStore.findAll()) || []
  campaigns.value = loadedCampaigns.map((campaign) => ({
    id: campaign.id,
    name: campaign.name,
    createdAt: formatDateTime(campaign.createdAt)
  }))
})
</script>

<style lang="scss">
.p-datatable {
  overflow-x: auto;
  border-collapse: collapse;
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 0.9em;
  min-width: 40vw;
}

.p-datatable .p-datatable-thead > tr > th {
  background-color: $info;
  color: white;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #ddd;
}

.p-datatable .p-datatable-tbody > tr > td {
  padding: 0.75rem;
  margin: 10px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
}

.p-datatable .p-datatable-tbody > tr:hover {
  background-color: #e9ecef;
}

.p-datatable .p-datatable-thead > tr > th:first-child {
  border-top-left-radius: 5px;
}

.p-datatable .p-datatable-thead > tr > th:last-child {
  border-top-right-radius: 5px;
}

.is-circle {
  border-radius: 50% !important;
  margin-right: 5px;
  max-width: 35px;
  max-height: 35px;
  padding: 0;
  aspect-ratio: 1/1;
}
</style>

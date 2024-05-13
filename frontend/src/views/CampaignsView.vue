<template>
  <div class="campaigns-view">
    <div class="campaigns-header">
      <h1>Campaigns</h1>
      <p-button
        class="button is-info create-campaign-button"
        label="Create campaign"
        title="Create campaign"
        icon="pi pi-plus"
        @click="() => router.push({ name: 'create-campaign' })"
      />
    </div>
    <table-component
      :items="campaigns"
      :columns="campaignColumns"
      :paginatorTemplate="paginatorTemplate"
    >
      <template v-slot:actions="slotProps">
        <span class="is-flex is-justify-content-flex-start">
          <p-button
            class="is-info is-circle"
            icon="pi pi-pencil"
            title="Edit Campaign"
            @click="handleUpdate(slotProps.data)"
          />
          <p-button
            class="is-danger is-circle"
            icon="pi pi-trash"
            title="Delete Campaign"
            @click="(e: Event) => handleDelete(e, slotProps.data)"
          />
        </span>
      </template>
    </table-component>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TableComponent from '@/components/TableComponent.vue'
import { useCampaignService } from '@/services/campaign'
import { type Campaign } from '@/client/api'
import { useConfirm } from 'primevue/useconfirm'
import { useLoadStore } from '@/stores/load'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const campaignStore = useCampaignService()
const loadStore = useLoadStore()
const toast = useToast()
const confirm = useConfirm()
const campaigns = ref<Campaign[]>([])
const paginatorTemplate =
  'CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown'

const campaignColumns = [
  { field: 'name', header: 'Campaign Name' },
  { field: 'createdAt', header: 'Created At' },
  { field: 'actions', header: 'Actions', slotName: 'actions' }
]

const formatDateTime = (date: string) =>
  new Date(date).toISOString().replace('T', ' ').substring(0, 16)

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
        detail: 'Campaign removed successfully',
        life: 3000
      })
    }
  })
}

onMounted(async () => {
  const loadedCampaigns = (await campaignStore.findAll()) || []
  campaigns.value = loadedCampaigns.map((campaign) => ({
    ...campaign,
    createdAt: formatDateTime(campaign.createdAt)
  }))
})
</script>

<style lang="scss">
.campaigns-view {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  align-self: center;
  width: 100%;
  min-width: 1000px;
}
.campaigns-view h1 {
  color: #333;
  margin: 1rem 0 1rem 1rem;
  font-size: 2.5rem;
  font-weight: 500;
}
.campaigns-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.create-campaign-button {
  width: 200px;
  align-self: flex-end;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
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

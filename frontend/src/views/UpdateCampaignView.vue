<template>
  <div class="update-campaign-view">
    <h1>Update Campaign</h1>
    <CampaignForm v-if="campaign" @submit="handleUpdate" mode="update" :campaign="campaign" />
  </div>
</template>

<script setup lang="ts">
import CampaignForm from '@/components/CampaignForm.vue'
import { isErrorResponse } from '@/helpers/errors.helper'
import { isCampaignResponse } from '@/helpers/type.helper'
import { useLoadStore } from '@/stores/load'
import { useCampaignService } from '@/services/campaign'
import type { UpdateCampaignDto, Campaign } from '@/client/api'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const campaignStore = useCampaignService()
const loadStore = useLoadStore()
const toast = useToast()
const router = useRouter()
const route = useRoute()

const campaign: Ref<Campaign | undefined> = ref()

const campaignId = route.params.id as string

onMounted(async () => {
  loadStore.setLoading(true)
  const campaignResponse = await campaignStore.findOne(campaignId)
  loadStore.setLoading(false)
  if (isCampaignResponse(campaignResponse)) {
    campaign.value = campaignResponse
  } else if ('message' in campaignResponse) {
    toast.add({
      severity: 'error',
      summary: 'Error fetching campaign',
      detail: campaignResponse.message,
      life: 3000
    })
    router.push({ name: 'campaigns' })
  }
})

const handleUpdate = async (campaign: UpdateCampaignDto) => {
  const response = await campaignStore.update(campaignId, {
    name: campaign.name
  })

  const showMessage = (message: string, severity: 'success' | 'error', summary?: string) => {
    toast.add({
      severity: severity,
      summary: summary,
      detail: message,
      life: 3000
    })
  }

  if (isErrorResponse(response)) {
    showMessage(response.message, 'error', 'Campaign update Failed')
  } else {
    showMessage('Campaign update successful', 'success')
    router.push({ name: 'campaigns' })
  }
}
</script>

<style scoped lang="scss">
.update-campaign-view {
  display: flex;
  flex-direction: column;
  min-width: 500px;
  width: 100%;
  padding: 1rem;
  justify-content: flex-start;
}

.update-campaign-view h1 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 500;
}
</style>

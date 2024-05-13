<template>
  <div class="campaign-view">
    <h1>Create campaign</h1>
    <CampaignForm @submit="handleRegister" />
  </div>
</template>

<script setup lang="ts">
import CampaignForm from '@/components/CampaignForm.vue'
import { isErrorResponse } from '@/helpers/errors.helper'
import { useCampaignService } from '@/services/campaign'
import type { CreateCampaignDto } from '@/client/api'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const campaignStore = useCampaignService()
const toast = useToast()
const router = useRouter()

const handleRegister = async (campaign: CreateCampaignDto) => {
  const response = await campaignStore.create({
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
    showMessage(response.message, 'error', 'Campaign creation Failed')
  } else {
    showMessage('Campaign creation successful', 'success')
    router.push({ name: 'campaigns' })
  }
}
</script>

<style scoped lang="scss">
.campaign-view {
  display: flex;
  flex-direction: column;
  min-width: 500px;
  width: 100%;
  padding: 1rem;
  justify-content: flex-start;
}

.campaign-view h1 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 500;
}
</style>

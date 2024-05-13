<template>
  <div class="update-user-view">
    <h1>Update User</h1>
    <UserForm v-if="user" @submit="handleUpdate" mode="update" :user="user" />
  </div>
</template>

<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import { isErrorResponse } from '@/helpers/errors.helper'
import { isUserResponse } from '@/helpers/type.helper'
import { useLoadStore } from '@/stores/load'
import { useUserService } from '@/services/user'
import type { UpdateUserDto, User } from '@/client/api'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserService()
const loadStore = useLoadStore()
const toast = useToast()
const router = useRouter()
const route = useRoute()

const user: Ref<User | undefined> = ref()

const userId = route.params.id as string

onMounted(async () => {
  loadStore.setLoading(true)
  const userResponse = await userStore.findOne(userId)
  loadStore.setLoading(false)
  if (isUserResponse(userResponse)) {
    user.value = userResponse
  } else if ('message' in userResponse) {
    toast.add({
      severity: 'error',
      summary: 'Error fetching user',
      detail: userResponse.message,
      life: 3000
    })
    router.push({ name: 'users' })
  }
})

const handleUpdate = async (user: UpdateUserDto) => {
  const response = await userStore.update(userId, {
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    role: user.role
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
    showMessage(response.message, 'error', 'Registration Failed')
  } else {
    showMessage('Registration successful', 'success')
    router.push({ name: 'users' })
  }
}
</script>

<style lang="scss">
.update-user-view {
  display: flex;
  flex-direction: column;
  min-width: 500px;
  width: 100%;
  padding: 1rem;
  justify-content: flex-start;
}

.update-user-view h1 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 500;
}
</style>

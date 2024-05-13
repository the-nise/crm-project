<template>
  <div class="register-view">
    <h1>Create user</h1>
    <UserForm @submit="handleRegister" />
  </div>
</template>

<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import { isErrorResponse } from '@/helpers/errors.helper'
import { useUserService } from '@/services/user'
import type { CreateUserDto } from '@/client/api'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const userStore = useUserService()
const toast = useToast()
const router = useRouter()

const handleRegister = async (user: CreateUserDto) => {
  const response = await userStore.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
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
.register-view {
  display: flex;
  flex-direction: column;
  min-width: 500px;
  width: 100%;
  padding: 1rem;
  justify-content: flex-start;
}

.register-view h1 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 500;
}
</style>

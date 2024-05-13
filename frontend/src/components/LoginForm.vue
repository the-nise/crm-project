<template>
  <div class="login-form">
    <form @submit.prevent="handleLogin">
      <label class="label" for="email-input">
        Email
        <p-input-text v-model="email" id="email-input" class="input" placeholder="Email" />
      </label>
      <label class="label" for="password-input">
        Password
        <p-input-text
          v-model="password"
          id="password-input"
          class="input"
          type="password"
          placeholder="Password"
        />
      </label>
      <p-button type="submit" class="button is-info" label="Login" :icon="spinnerComputed" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const auth = useAuthStore()
const email = ref('')
const isLoading = ref(false)
const password = ref('')
const toast = useToast()
const router = useRouter()

const showErrorMessage = (message: string) => {
  toast.add({
    severity: 'error',
    summary: 'Login Failed',
    detail: message,
    life: 3000
  })
}

const spinnerComputed = computed(() => {
  return isLoading.value ? 'pi pi-spin pi-spinner' : ''
})

const handleLogin = async () => {
  try {
    isLoading.value = true
    const isLogged = await auth.login(email.value, password.value)
    if (!isLogged) {
      showErrorMessage('Email or password is incorrect')
    } else {
      router.push({ name: 'dashboard' })
    }
  } catch (error) {
    showErrorMessage('Unable to login')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (auth.isAuthenticated) {
    router.push({ name: 'dashboard' })
  }
})
</script>

<style scoped>
.login-form form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>

<template>
  <p-toast position="bottom-center" />
  <div class="progress-spinner" v-if="isLoading">
    <p-progress-spinner aria-label="Loading" />
  </div>
  <div id="layout-container">
    <sidebar-component v-if="!isLoginView" />
    <div class="router-view-container" v-if="!isLoginView">
      <div class="router-view-card">
        <router-view />
      </div>
    </div>
    <router-view v-else />
  </div>
</template>

<script setup lang="ts">
import SidebarComponent from './components/SidebarComponent.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useLoadStore } from './stores/load'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const router = useRouter()
const route = useRoute()
const isLoginView = computed(() => route.name === 'login')

const auth = useAuthStore()
const load = useLoadStore()
const { isAuthenticated, isSessionVerified } = storeToRefs(auth)

const { isLoading } = storeToRefs(load)
onMounted(async () => {
  if (!isSessionVerified.value) {
    await auth.verifySession()
  }
  if (!isAuthenticated.value) {
    router.push({ name: 'login' })
  }
})
</script>

<style>
#layout-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.progress-spinner {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.progress-spinner:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.53);
}

.router-view-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 4em;
  background-color: aliceblue;
}

.router-view-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow: hidden;
}
</style>

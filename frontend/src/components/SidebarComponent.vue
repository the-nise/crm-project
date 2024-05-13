<template>
  <div :class="`sidebar ${sidebarClass}`">
    <p-confirm-popup />
    <div class="top-row">
      <p-button
        class="button sidebar-toggle-btn is-info"
        icon="pi pi-bars"
        title="Toggle Sidebar"
        @click="toggleSidebar"
      />
    </div>
    <div class="sidebar-logo">
      <img title="Inbounds.com" :src="`${logoSrc}`" alt="Inbounds logo" />
    </div>
    <div class="sidebar-column">
      <p-button
        :class="buttonClass('dashboard')"
        @click="setActiveButton('dashboard')"
        title="View Dashboard"
      >
        <span class="icon"> <i class="pi pi-home"></i> </span>
        <span v-if="!isCollapsed">Dashboard</span>
      </p-button>

      <p-button
        v-if="auth.permissions[PermissionsValueEnum.ManageUsers]"
        :class="buttonClass('users')"
        @click="setActiveButton('users')"
        title="View Users"
      >
        <span class="icon"> <i class="pi pi-user"></i> </span>
        <span v-if="!isCollapsed">Users</span>
      </p-button>

      <p-button :class="buttonClass('leads')" @click="setActiveButton('leads')" title="View Leads">
        <span class="icon"> <i class="pi pi-users"></i> </span>
        <span v-if="!isCollapsed">Leads</span>
      </p-button>

      <p-button
        :class="buttonClass('campaigns')"
        @click="setActiveButton('campaigns')"
        title="View Campaigns"
      >
        <span class="icon"> <i class="pi pi-sitemap"></i> </span>
        <span v-if="!isCollapsed">Campaigns</span>
      </p-button>

      <p-button
        :class="buttonClass('reports')"
        @click="setActiveButton('reports')"
        title="View Reports"
      >
        <span class="icon"> <i class="pi pi-chart-line"></i> </span>
        <span v-if="!isCollapsed">Reports</span>
      </p-button>

      <p-button
        :class="{ ...buttonClass('logout'), 'bottom-btn': true }"
        @click="handleLogout"
        title="Logout"
      >
        <span class="icon"> <i class="pi pi-sign-out"></i> </span>
        <span v-if="!isCollapsed">Logout</span>
      </p-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useConfirm } from 'primevue/useconfirm'
import { PermissionsValueEnum } from '@/client/api'

const isCollapsed = ref(false)
const sidebarClass = computed(() => (isCollapsed.value ? 'closed' : 'open'))
const activeButton = ref('Dashboard')
const router = useRouter()
const auth = useAuthStore()
const confirm = useConfirm()

// ----- LOGOUT -----
const handleLogout = async (event: Event) => {
  if (!(event?.currentTarget instanceof HTMLElement)) return
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to logout?',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      await auth.logout()
      router.push({ name: 'login' })
    }
  })
}

// ----- MENU -----
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const setActiveButton = (buttonName: string) => {
  activeButton.value = buttonName
  router.push({
    name: buttonName.toLowerCase()
  })
}

// Reactive classes for menu buttons
const buttonClass = (buttonName: string) => ({
  button: true,
  'is-white': true,
  'sidebar-btn': true,
  'is-info': activeButton.value === buttonName
})

const logoSrc = computed(() => {
  return !isCollapsed.value ? 'src/assets/Inbounds-all-blue.png' : 'src/assets/Inbounds-blue-o.png'
})
</script>

<style>
.sidebar {
  width: 102px;
  transition: width 0.4s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.sidebar-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
}

.sidebar-btn {
  margin-left: 28px;
  margin-top: 10px;
  width: 250px;
  justify-content: flex-start !important;
  transition: width 0.45s;
}

.sidebar-logo img {
  margin-left: 30px;
  flex-grow: 0;
  width: 80%;
  transition:
    height 0.25s ease-in-out,
    opacity 0.5s ease-in-out;
}

.top-row {
  display: flex;
  justify-content: flex-end;
  margin: 25px 28px;
  flex-grow: 0;
}

.sidebar-toggle-btn {
  width: 41px;
}

.open {
  width: 306px;
}

.closed {
  width: 102px;
}

.closed .sidebar-btn {
  width: 41px;
  transition: width 0.25s;
}

.closed .top-row {
  display: flex;
  justify-content: flex-end;
  margin: 25px 33px 25px 28px;
}

.closed .sidebar-logo img {
  margin-left: 24px;
  width: 50px;
  transition:
    height 0.25s ease-in-out,
    opacity 0.5s ease-in-out;
}

.bottom-btn {
  margin-top: auto;
  margin-bottom: 25px;
}
</style>

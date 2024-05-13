<template>
  <div class="users-view">
    <div class="users-header">
      <h1>Users</h1>
      <p-button
        class="button is-info create-user-button"
        label="Create user"
        title="Create user"
        icon="pi pi-plus"
        @click="() => router.push({ name: 'create-user' })"
      />
    </div>
    <table-component :items="users" :columns="userColumns" :paginatorTemplate="paginatorTemplate">
      <template #actions="slotProps">
        <span class="is-flex is-justify-content-flex-start">
          <p-button
            class="button is-info is-circle"
            icon="pi pi-pencil"
            title="Edit User"
            @click="handleUpdate(slotProps.data)"
          />
          <p-button
            class="button is-danger is-circle"
            icon="pi pi-trash"
            title="Delete User"
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
import { useUserService } from '@/services/user'
import { useConfirm } from 'primevue/useconfirm'
import { useLoadStore } from '@/stores/load'
import { useToast } from 'primevue/usetoast'
import type { User } from '@/client/api'

const router = useRouter()
const userStore = useUserService()
const loadStore = useLoadStore()
const toast = useToast()
const confirm = useConfirm()

const users = ref<User[]>([])
const paginatorTemplate =
  'CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown'

const userColumns = [
  { field: 'firstName', header: 'First Name' },
  { field: 'lastName', header: 'Last Name' },
  { field: 'email', header: 'Email' },
  { field: 'role', header: 'Role' },
  { field: 'createdAt', header: 'Created At' }
]

const formatDateTime = (date: string) =>
  new Date(date).toISOString().replace('T', ' ').substring(0, 16)

const handleUpdate = (user: User) => {
  router.push({ name: 'update-user', params: { id: user.id } })
}

const handleDelete = async (event: Event, user: User) => {
  if (!user || !event) return
  if (!(event.currentTarget instanceof HTMLElement)) return
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to remove the user? This action is irreversible.',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger p-button-sm',
    accept: async () => {
      loadStore.setLoading(true)
      await userStore.remove(user)
      users.value = users.value.filter((u) => u.id !== user.id)
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
  loadStore.setLoading(true)
  const loadedUsers = (await userStore.findAll()) || []
  users.value = loadedUsers.map((user) => ({
    ...user,
    role: user.role,
    createdAt: formatDateTime(user.createdAt)
  }))
  loadStore.setLoading(false)
})
</script>

<style lang="scss">
.users-view {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  align-self: center;
  width: 100%;
  min-width: 1200px;
}

.users-view h1 {
  color: #333;
  margin: 1rem 0 1rem 1rem;
  font-size: 2.5rem;
  font-weight: 500;
}

.users-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.create-user-button {
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

<template>
  <div class="register-form">
    <form @submit.prevent="handleSubmit">
      <label class="label" for="name-input">
        Name
        <p-input-text
          v-model="name"
          id="name-input"
          class="input"
          placeholder="First Name"
          :class="{ 'is-danger': v$.name.$error }"
        />
        <span v-if="v$.name.$error" class="help is-danger has-text-weight-light"
          >Name is required</span
        >
      </label>
      <p-button type="submit" class="button is-info" label="Create" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required as requiredValidator } from '@vuelidate/validators'
import { type Campaign } from '@/client/api'
import type { PropType } from 'vue'

const props = defineProps({
  campaign: Object as PropType<Campaign>,
  mode: { type: String, default: 'create' }
})

const emit = defineEmits(['submit'])

const name = ref(props.campaign?.name)

const required = props.mode === 'create' && requiredValidator
const rules = computed(() => ({
  name: { required }
}))

const v$ = useVuelidate(rules, { name })

const handleSubmit = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return
  emit('submit', {
    name: name.value
  })
}
</script>

<style scoped>
.register-form form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: auto;
}
</style>

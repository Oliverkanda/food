<template>
  <form class="space-y-3" @submit="onSubmit">
    <UiFormField v-slot="{ componentField }" name="name">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('center.data.name') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="description">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('common.description') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiTextarea v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="phone">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('center.data.phone') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="currencyCode">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('center.data.currency') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiSelect v-bind="componentField">
          <UiFormControl>
            <UiSelectTrigger>
              <UiSelectValue :placeholder="$t('common.select')" />
            </UiSelectTrigger>
          </UiFormControl>

          <UiSelectContent>
            <UiSelectGroup>
              <UiSelectItem v-for="code in getLocalizedCurrencyCodesForSelect()" :key="code.value" :value="code.value">
                {{ code.label }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="countryCode">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('center.data.country') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiSelect v-bind="componentField">
          <UiFormControl>
            <UiSelectTrigger>
              <UiSelectValue :placeholder="$t('common.select')" />
            </UiSelectTrigger>
          </UiFormControl>

          <UiSelectContent>
            <UiSelectGroup>
              <UiSelectItem v-for="code in getLocalizedCountryCodesForSelect()" :key="code.value" :value="code.value">
                {{ code.label }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="timeZone">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('center.data.timezone') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiSelect v-bind="componentField">
          <UiFormControl>
            <UiSelectTrigger>
              <UiSelectValue :placeholder="$t('common.select')" />
            </UiSelectTrigger>
          </UiFormControl>

          <UiSelectContent>
            <UiSelectGroup>
              <UiSelectItem v-for="zone in getLocalizedTimezonesForSelect()" :key="zone.value" :value="zone.value">
                {{ zone.label }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="minAmountForDelivery">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('app.cart.delivery') }} / {{ $t('app.minimum-order-value') }}, {{ getCurrencySign(channel?.currencyCode) }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" type="number" :placeholder="$t('common.optional')" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="conditions">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('center.data.delivery-conditions') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiTextarea v-bind="componentField" rows="10" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiButton type="submit" variant="secondary">
      {{ $t('center.update.title') }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { channelUpdateSchema } from '~~/server/core/services/channel'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isOpened } = defineProps<{
  isOpened: boolean
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const { toast } = useToast()
const { channel, refresh: refreshChannelData } = await useChannel()

const formSchema = toTypedSchema(channelUpdateSchema)

const { handleSubmit, handleReset, setValues } = useForm({
  validationSchema: formSchema,
})

watch(
  () => isOpened,
  () => {
    handleReset()
    setValues({
      name: channel.value?.name,
      description: channel.value?.description,
      phone: channel.value?.phone,
      currencyCode: channel.value?.currencyCode,
      countryCode: channel.value?.countryCode,
      timeZone: channel.value?.timeZone,
      minAmountForDelivery: channel.value?.minAmountForDelivery,
      conditions: channel.value?.conditions,
    })
  },
)

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  emit('submitted')

  const { data, error } = await useAsyncData(
    'update-channel',
    () => $fetch('/api/channel', {
      method: 'PATCH',
      body: values,
    }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: t('error.title'), description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    emit('success')
    toast({ title: t('toast.website-updated'), description: t('toast.updating-data') })
    resetForm()
  }
})
</script>

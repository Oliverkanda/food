<template>
  <div class="flex flex-row gap-1 leading-tight">
    <div class="text-sm">
      <div v-if="checkout?.deliveryMethod === 'WAREHOUSE'">
        {{ $t('app.cart.discount') }} <span class="text-xs">%</span>
      </div>

      <div v-if="checkout?.deliveryMethod === 'DELIVERY'">
        {{ $t('app.cart.delivery') }} {{ checkout?.shippingPrice }} <span class="text-xs">{{ getCurrencySign(channel?.currencyCode) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { channel } = await useChannel()
const { checkout } = useCheckout()
</script>

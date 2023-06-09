<script lang="ts">
export default {
  name: 'RedirectPage'
}
</script>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const params = route.params as { path: string }

  const redirectPath = decodeURIComponent(params.path)
  router.push(redirectPath)

</script>

<template>
  
</template>

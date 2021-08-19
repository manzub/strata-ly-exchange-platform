<template>
  <div class="alert text-warning alert-dismissible fade show mb-2" role="alert">
    {{msg}}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <ion-icon name="close-outline" role="img" class="md hydrated" aria-label="close outline"></ion-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Alerts',
  props: ['msg']
}
</script>
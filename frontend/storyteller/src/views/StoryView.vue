<script setup lang="ts" module="true">
import Story from '@/components/Story.vue'
</script>

<template>
    <Suspense>
        <template #default>
            <Story></Story>
        </template>

        <template #fallback>
            <v-skeleton-loader color="blueviolet" loading-text="Generating Story" type="article, sentences@2" class="loader" />
        </template>
    </Suspense>
</template>

<style scoped>


.loader {
    width: 100%;
}

</style>
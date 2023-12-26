<script setup lang="ts" module="true">
import Story from '@/components/Story.vue'
</script>

<template>
    <Suspense>
        <template #default>
            <Story></Story>
        </template>

        <template #fallback>
            <v-skeleton-loader color="#ECF8F8" loading-text="Generating Story" type="article, sentences@4" class="loader" />
        </template>
    </Suspense>
</template>

<style scoped>


.loader {
    width: 100%;
}

</style>
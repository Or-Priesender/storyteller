<script setup lang="ts" module="true">

import { store } from '@/store/store'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const PAGE_SIZE = 500
const currentPage: Ref<number> = ref(1)
const router = useRouter()

const paginatedStory = store.generatedStory.split("\n\n")
const pagesCount = Math.floor(paginatedStory.length)
const goBack = async () => {
    store.resetStory()
    router.back()
}
</script>

<template>
<v-skeleton-loader v-if="store.loading" color="#ECF8F8" loading-text="Generating Story" type="article, sentences@4" class="loader"></v-skeleton-loader> 
<div v-else class="story">
    <div class="story-container">
        {{ paginatedStory[currentPage - 1] }}
    </div>
    <v-pagination 
        class="pagination-buttons"
        v-model="currentPage"
        :length="pagesCount"
        :total-visible="4"
        density="compact"
    >
    </v-pagination>
    <v-btn size="x-small" class="button" text="Re-Generate" @click="router.back" :style="{'marginTop': '10px'}"></v-btn>
</div>
</template>

<style scoped>
    .pagination-buttons {
        color: var(--color-pages);
    }

    .loader {
        width: 100%;
    }

    .story {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--color-text);
    }

    .story-container {
        min-height: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        flex: 1;
        font-weight: 600;
    }
    
    .button {
        color: var(--color-button);
    }
</style>
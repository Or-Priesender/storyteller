<script setup lang="ts" module="true">

import { store } from '@/store/store'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const PAGE_SIZE = 500
const currentPage: Ref<number> = ref(1)
const router = useRouter()

// const paginateStory = (story: string, page_size_limit: number = PAGE_SIZE) => {
//     return story.split("\n\n")
// }

const paginatedStory = store.generatedStory.split("\n\n")
const pagesCount = Math.floor(paginatedStory.length)
</script>

<template>
<div class="story">
    <div class="story-container">
        {{ paginatedStory[currentPage - 1] }}
    </div>
    <v-pagination 
        v-model="currentPage"
        :length="pagesCount"
        :total-visible="3"
        density="compact"
    >
    </v-pagination>
    <v-btn size="x-small" class="button" text="Re-Generate" @click="router.back" :style="{'marginTop': '10px'}"></v-btn>
</div>
</template>

<style scoped>
    .story {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--var-brown);
    }

    .story-container {
        min-height: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        flex: 1;
        font-family: fantasy;
        font-weight: 600;
    }
    
    .button {
        color: var(--var-brown);
    }
</style>
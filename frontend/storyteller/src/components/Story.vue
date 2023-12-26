<script setup lang="ts" module="true">

import { store } from '@/store/store'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentPage: Ref<number> = ref(1)

const mergeTextAndImages = (textPages: string[], imagePages: string[]) => {
    const result: PageMapping[] = []
    for (let i = 0; i < Math.max(textPages.length, imagePages.length); i++) {
        const [currentText, currentImage] = [textPages[i], imagePages[i]]
        if (currentImage !== undefined) {
            result.push({ type: "image", value: currentImage })
        }

        if (currentText !== undefined) {
            result.push({ type: "text", value: currentText })
        }
    }
    return result
}

try {
    const topics = router.currentRoute.value.query.topics as string[]
    if (topics && topics.length > 0) {
        await store.generateStory(topics)
    }
} catch (e) {
    if (e instanceof Error) {
        e = `${e.name}: ${e.message}`
    }
    store.setStoryError(e as string)
    console.error("Error while generating story", e)
}

const pages = mergeTextAndImages(store.generatedStory, store.generatedImages)

console.log("pages count is", pages.length)
console.log("current page", store.generatedStory[currentPage.value - 1])

const goBack = async () => {
    console.log("goBack is called")
    router.back()
}

interface PageMapping {
    type: "text" | "image"
    value: string
}

</script>

<template>
    <div v-if="!!store.generatedStoryError">
        <div class="error"> Generating story failed! </div>
        <div class="error"> {{ store.generatedStoryError }} </div>
        <v-btn size="x-small" class="button" text="Re-Generate" @click="goBack" :style="{ 'marginTop': '10px' }"></v-btn>
    </div>
    <div v-else class="story">
        <div class="story-container">
            <div v-if="pages[currentPage - 1].type === 'text'">
                {{ pages[currentPage - 1].value }}
            </div>
            <img v-else-if="pages[currentPage - 1].type === 'image'" :src="pages[currentPage - 1].value"/>
        </div>
        <v-pagination class="pagination-buttons" v-model="currentPage" :length="pages.length" :total-visible="4" density="compact"/>
        <v-btn size="x-small" class="button" text="Re-Generate" @click="goBack" :style="{ 'marginTop': '10px' }"></v-btn>
    </div>
</template>

<style scoped>
.error {
    color: var(--color-error-text);
}

.pagination-buttons {
    color: var(--color-pages);
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
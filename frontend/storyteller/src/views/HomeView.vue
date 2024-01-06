<script setup lang="ts" module="true">
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const topics: Ref<string[]> = ref([])
const text: Ref<string> = ref("")
const input: Ref<HTMLInputElement | undefined> = ref()

const validateTopic = (topic: string) => {
  return topic && topic.length > 2
}

const addTopic = (topic: string) => {
  if (topics.value.length == 5) {
    // FIFO the topics list
    topics.value.shift()
  }

  topics.value.push(topic)
  text.value = ""
}

const generate = async (event: SubmitEvent) => {
  if (topics.value.length === 0) {
    return
  }

  await router.push({name: 'story', query: {topics: topics.value}})
}

const reset = () => {
  topics.value = []
  text.value = ""
}

const add = () => {
  if (!validateTopic(text.value)) {
    return
  }

  addTopic(text.value)
}

window.visualViewport?.addEventListener("resize", () => {
  input.value?.scrollIntoView()
})
</script>

<template>
      <div class="home">
        <div class="instructions">
          Generate a children's book, using GPT for text and DALL-E for images
        </div>
        <v-form class="topics-form">
          <div class="topics-container">
            <v-chip variant="outlined" class="topic ma-2"  v-for="topic in topics">{{ topic }}
            </v-chip>
          </div>
          <v-text-field
            id="input"
            class="input"
            ref="input"
            variant="outlined" 
            label="topic" 
            type="text" 
            density="compact"
            v-model="text"
          />

          <v-row class="ma-4 buttons-container" align-content="space-around">
            <v-btn @click.prevent="add" type="submit" size="x-small" class="button" text="Add"></v-btn>
            <v-btn size="x-small" class="button" text="Reset" @click="reset"></v-btn>
            <v-btn size="x-small" class="button" text="Generate" @click="generate"></v-btn>
          </v-row>
        </v-form>
      </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  color: var(--color-text);  
}

.instructions {
  display: flex;
  flex-wrap: wrap;
  font-size: 1.2rem;
  margin: 0 1.2rem;
  flex: 1;
  font-weight: 500;
  align-items: center;
}

.input {
  margin-top: 1rem;
  width: 80%;
  color: var(--color-text);
}

.button {
  margin-bottom: 1rem;
  color: var(--color-button);
}

.topics-form {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.topics-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  width: 50%;
}

.topic {
  margin: 2rem;
}
</style>
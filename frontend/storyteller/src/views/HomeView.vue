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

  text.value = ""
  if (topics.value.indexOf(topic) === -1) {
    topics.value.push(topic)
  }
}

const generate = async (event: SubmitEvent) => {
  if (topics.value.length === 0) {
    return
  }

  await router.push({name: 'story', query: {topics: topics.value}})
}

const add = () => {
  if (!validateTopic(text.value)) {
    return
  }

  addTopic(text.value)
}

const closeTopic = (closedTopic: string) => {
  console.log('splicing index', closedTopic, topics.value)
  topics.value = topics.value.filter(topic => topic !== closedTopic)
  console.log('left with', topics.value)
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
        <v-form class="topics-form" @submit.prevent="add">
          <div class="topics-container">
              <v-chip variant="outlined" class="topic" closable @click:close="(e: Event) => closeTopic(topic)" :key="index + '_' + topic" v-for="(topic, index) in topics">{{ topic }}</v-chip>
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
            append-inner-icon="mdi-arrow-right"
            @click:append-inner.prevent="add"
          />

          <v-row class="ma-4 buttons-container">
            <v-btn size="x-small" class="button" text="Generate!" @click="generate"></v-btn>
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
  margin: 1.2rem;
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
  width: 100%;
}

.topics-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.buttons-container {
  display: flex;
  align-items: center;
  width: 80%;
}

.topic {
  margin: 0.5rem;
}
</style>
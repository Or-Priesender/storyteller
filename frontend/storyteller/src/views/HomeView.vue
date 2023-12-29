<script setup lang="ts" module="true">
import { ref, type Ref } from 'vue';
import { store } from '@/store/store'
import { useRouter } from 'vue-router';

const router = useRouter()
const topics: Ref<string[]> = ref([])
const text: Ref<string> = ref("")
const topicsForm: Ref<HTMLFormElement | null> = ref(null)
const rules = [
  (v: string) => !!v || 'Topic must not be empty',
  (v: string) => (v && v.length > 2) || 'Topic must be longer than 2 characters'
]

const validateTopic = (topic: string) => {
  return topic && topic.length > 2
}

const addTopic = () => {
  if (topics.value.length == 5) {
    // FIFO the topics list
    topics.value.shift()
    topics.value.push(text.value)
  } else {
    topics.value.push(text.value)
  }
  text.value = ""
}

const generate = async (event: SubmitEvent) => {
  await router.push({name: 'story', query: {topics: topics.value}})
}

const reset = () => {
  topics.value = []
  text.value = ""
  topicsForm?.value?.reset()
}

const add = () => {
  if (!validateTopic(text.value)) {
    return
  }

  addTopic()
}

const input: Ref<HTMLInputElement | undefined> = ref()

window.addEventListener("resize", e => {
  input.value?.scrollIntoView()
})

</script>

<template>
      <div class="home">
        <div class="instructions">
          Add up to 5 topics, then hit "Generate" to generate a story
        </div>
        <v-form class="topics-form" ref="topicsForm">
          <div class="topics-container">
            <v-chip close @click:close="reset" variant="outlined" class="topic ma-2"  v-for="topic in topics">{{ topic }}
            </v-chip>
          </div>
          <v-text-field
            id="input"
            class="input"
            ref="input"
            validate-on="lazy submit"
            variant="outlined" 
            label="Insert topic" 
            type="text" 
            density="compact" 
            v-model="text"
            :rules="rules" 
          />

          <v-row class="ma-4 buttons-container" align-content="space-around">
            <v-btn type="submit" size="x-small" class="button" text="Add" @click="add"></v-btn>
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
  width: 30vw;
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
  width: 50vw;
}

.topic {
  margin: 2rem;
}
</style>
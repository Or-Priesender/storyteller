<script setup lang="ts" module="true">
import { StoryGeneratorClient } from '@/client/api.client';
import { ref, type Ref } from 'vue';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
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
  return topic && topic.length > 2 // add more validations
}

const addTopic = () => {
  if (topics.value.length == 5) {
    topics.value.shift()
    topics.value.push(text.value)
  } else {
    topics.value.push(text.value)
  }
  text.value = ""
}

const generate = async (event: SubmitEvent) => {
  const client = new StoryGeneratorClient(new GrpcWebFetchTransport({"baseUrl": "https://storyteller-proxy-2v74mbo73q-zf.a.run.app"}))
  const story = await client.generateStory({topics: topics.value, length: 200})
  store.setGeneratedStory(story.response.story)
  router.push('/story')
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

</script>

<template>
      <div class="home">
        <div class="instructions">
          Search and add up to 5 topics, then hit "Generate" to generate a story.
        </div>
        <v-form class="topics-form" ref="topicsForm">
          <div class="topics-container">
            <v-chip close @click:close="reset" variant="outlined" class="topic ma-2"  v-for="topic in topics">{{ topic }}
            </v-chip>
          </div>
          <v-text-field 
            class="search"
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
  color: var(--var-brown);  
}

.instructions {
  display: flex;
  flex-wrap: wrap;
  font-size: 1.2rem;
  margin: 0 1.2rem;
  flex: 1;
  font-family: fantasy;
  font-weight: 500;
}

.search {
  margin-top: 1rem;
  width: 30vw;
}

.button {
  margin-bottom: 1rem;
  color: var(--var-brown);
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
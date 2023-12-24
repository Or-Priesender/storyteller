import {reactive} from 'vue'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import { StoryGeneratorClient } from '@/client/api.client'

export const store = reactive({
    generatedStory: "",
    loading: false,
    client: new StoryGeneratorClient(new GrpcWebFetchTransport({"baseUrl": import.meta.env.PROD ? "https://storyteller-proxy-2v74mbo73q-zf.a.run.app" : "http://127.0.0.1:8080"})),
    setGeneratedStory(story: string) {
        this.generatedStory = story
    },
    resetStory() {
        this.generatedStory = ""
    },
    async generateStory(topics: string[], length: number = 200) {
        this.loading = true
        const story = await this.client.generateStory({topics: topics, length: length})
        // TODO: remove
        setTimeout(() => {
            this.setGeneratedStory(story.response.story)
            this.loading = false
        }, 2000)
    }
})
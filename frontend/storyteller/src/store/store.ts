import { reactive, ref } from 'vue'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import { StoryGeneratorClient } from '@/client/api.client'

const client = new StoryGeneratorClient(new GrpcWebFetchTransport({ "baseUrl": import.meta.env.PROD ? "https://storyteller-proxy-2v74mbo73q-zf.a.run.app" : "http://127.0.0.1:8080" }))

export const store = reactive({
    topics: [""],
    generatedStory: [],
    generatedImages: [],
    generatedStoryError: "",
    loading: false,
    client: client,
    resetStory() {
        console.log("Resetting story")
        this.generatedStory = []
        this.generatedImages = []
    },
    async generateStory(topics: string[], length: number = 200) {
        const story = await this.client.generateStory({ topics: topics, length: length })
        this.generatedStory = story.response.pages
        this.generatedImages = story.response.images
    },
    setStoryError(e: string) {
        this.generatedStoryError = e
        this.resetStory()
    }
})
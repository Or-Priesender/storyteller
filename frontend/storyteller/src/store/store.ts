import {reactive} from 'vue'

export const store = reactive({
    generatedStory: "adasdasdasd dasdasdas asdasdasd asdasd adsad qweqwda aqweq asda adasdasdasd dasdasdas asdasdasd asdasd adsad qweqwda aqweq asda adasdasdasd dasdasdas asdasdasd asdasd adsad qweqwda aqweq asda adasdasdasd dasdasdas asdasdasd asdasd adsad qweqwda aqweq asda",
    setGeneratedStory(story: string) {
        this.generatedStory = story
    }
})
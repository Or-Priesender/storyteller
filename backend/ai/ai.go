package ai

import (
	"context"
	"encoding/json"
	"fmt"
	"math"
	"os"
	"strings"

	openai "github.com/sashabaranov/go-openai"
)

type OpenAIResponse struct {
	Story   string   `json:"story"`
	Prompts []string `json:"prompts"`
}

type GenerateStoryResponse struct {
	Story  string
	Images []string
}

func GenerateStory(topics []string, length int32) (GenerateStoryResponse, error) {
	client := openai.NewClient(os.Getenv("OPEN_AI_API_TOKEN"))
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role: openai.ChatMessageRoleUser,
					Content: fmt.Sprintf(`Act as a children's book author, and tell me a short story of up to %d words.
					 The story must include the following topics: %s. 
					 Respond with one JSON object that has 2 keys:
					 the key 'story' contains the entire story, and the key 'prompts' contains an array of AI image generation prompts that fit the story.
					 The prompts array length should be the same as the number of paragraphs in the story.`, int(math.Min(float64(length), 500)), strings.Join(topics, ", ")),
				},
			},
		},
	)
	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return GenerateStoryResponse{}, err
	}

	aiResponse := OpenAIResponse{}
	fmt.Println(resp.Choices[0].Message.Content)
	err = json.Unmarshal([]byte(resp.Choices[0].Message.Content), &aiResponse)
	if err != nil {
		fmt.Printf("Json unmarshal error: %v\n", err)
	}

	channels := []chan string{}
	for _, prompt := range aiResponse.Prompts {
		channel := make(chan string)
		channels = append(channels, channel)
		go GenerateStoryImage(prompt, channel)
	}

	response := GenerateStoryResponse{Story: aiResponse.Story, Images: []string{}}
	for _, channel := range channels {
		imageUrl := <-channel
		response.Images = append(response.Images, imageUrl)
	}

	fmt.Printf("Complete Response: %+v\n", response)
	return response, nil
}

func GenerateStoryImage(prompt string, result_chan chan<- string) error {
	c := openai.NewClient(os.Getenv("OPEN_AI_API_TOKEN"))
	ctx := context.Background()
	reqUrl := openai.ImageRequest{
		Prompt:         prompt + ". illustration by Hayao Miyazakic",
		Size:           openai.CreateImageSize256x256,
		ResponseFormat: openai.CreateImageResponseFormatURL,
		N:              1,
	}

	respUrl, err := c.CreateImage(ctx, reqUrl)
	if err != nil {
		fmt.Printf("Image creation for prompt %s error: %v\n", prompt, err)
		return err
	}

	fmt.Printf("Prompt: %s Result: %s\n", prompt, respUrl.Data[0].URL)
	result_chan <- respUrl.Data[0].URL
	return nil
}

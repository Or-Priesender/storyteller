package ai

import (
	"context"
	"fmt"
	"math"
	"os"
	"strings"

	openai "github.com/sashabaranov/go-openai"
)

func GenerateStory(topics []string, length int32) (string, error) {
	client := openai.NewClient(os.Getenv("OPEN_AI_API_TOKEN"))
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: fmt.Sprintf("Act as a children's book author, and tell me a short story of up to %d words. The story must include the following topics: %s", int(math.Min(float64(length), 500)), strings.Join(topics, ", ")),
				},
			},
		},
	)
	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return "", err
	}

	return resp.Choices[0].Message.Content, nil
}

package constants

type TherapyVideo struct {
	Title string `json:"title"`
	Url   string `json:"url"`
	V     string `json:"v"`
}

var (
	THERAPY_VIDEOS = []TherapyVideo{
		{
			Title: "ASMR Reiki w/ Hypnosis for Complete Deep Relaxation (Yoga Nidra, Singing Bowl, Candle Crackling)",
			Url:   "https://www.youtube.com/watch?v=iiTgqOUsF5s",
			V:     "iiTgqOUsF5s",
		},
		{
			Title: "Breathing Exercises To Stop A Panic Attack Now | TAKE A DEEP BREATH",
			Url:   "https://www.youtube.com/watch?v=8vkYJf8DOsc",
			V:     "8vkYJf8DOsc",
		},
		{
			Title: "Yoga To Reduce Stress | 30 Min Slow Flow - Relaxing Stretches + Savasana",
			Url:   "https://www.youtube.com/watch?v=9MazN_6wdqI",
			V:     "9MazN_6wdqI",
		},
	}
)

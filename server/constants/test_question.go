package constants

type MentalHealthQuestion struct {
	Question string
	Point    uint8
}

var (
	MENTAL_HEALTH_QUESTIONS = []MentalHealthQuestion{
		{Question: "Saya sulit tidur atau tidur tidak berkualitas", Point: 1},
		{Question: "Saya merasa cepat lelah atau kelelahan", Point: 1},
		{Question: "Saya sulit untuk konsentrasi/fokus dalam mengerjakan sesuatu", Point: 1},
		{Question: "Emosi saya cenderung tidak stabil dan sensitif", Point: 1},
		{Question: "Saya mudah merasa diri kurang dan tidak cukup baik", Point: 1},
		{Question: "Saya mudah merasa cemas/ overthinking", Point: 2},
		{Question: "Saya tidak bergairah dalam melakukan banyak hal", Point: 1},
		{Question: "Saya sering mengeluhkan gejala fisik padahal tidak ada apa apa", Point: 1},
		{Question: "Pola tidur dan makan saya tidak seperti yang sewajarnya, makan terlalu berlebihan atau tidak napsu makan", Point: 2},
		{Question: "Saya tidak ada motivasi dan sulit memulai sesuatu", Point: 1},
		{Question: "Saya pernah terpikir untuk mengakhiri hidup dan menyakiti diri sendiri", Point: 2},
	}
)

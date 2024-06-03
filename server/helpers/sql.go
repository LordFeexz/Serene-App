package helpers

import "fmt"

func LogQuery(q string) string {
	fmt.Println("Executing: ", q)
	return q
}

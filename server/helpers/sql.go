package helpers

import (
	"log"
	"strings"
)

func LogQuery(q string) string {
	log.Println("Executing: ", strings.Join(strings.Fields(strings.ReplaceAll(q, "\n", " ")), " "))
	return q
}

func SortDirection(s string) string {
	lower := strings.ToLower(s)
	if lower == "asc" || lower == "ascending" {
		return "ASC"
	}
	return "DESC"
}

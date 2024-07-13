package helpers

import (
	"serene-app/exceptions"
	"time"
)

func EndOfDay(t time.Time) time.Time {
	t = t.Add(24 * time.Hour)

	return time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location()).Add(-time.Second)
}

func StartOfDay(t time.Time) time.Time {
	return time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())
}

func ParseStrToDate(inp string) (time.Time, error) {
	for _, layout := range []string{
		time.DateOnly,
		time.DateTime,
		time.RFC3339,
		time.RFC3339Nano,
	} {
		if parsed, err := time.Parse(layout, inp); err == nil {
			return parsed, nil
		}
	}
	return time.Time{}, exceptions.NewError("invalid time format", 400)
}

func IsAfter(source, dest time.Time) bool {
	return source.After(dest)
}

func StartOfMonth(t time.Time) time.Time {
	return time.Date(t.Year(), t.Month(), 1, 0, 0, 0, 0, t.Location())
}

func EndOfMonth(t time.Time) time.Time {
	return t.AddDate(0, 1, 0).Add(-time.Second)
}

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
		time.ANSIC,
		time.DateOnly,
		time.DateTime,
		time.Kitchen,
		time.Layout,
		time.RFC1123,
		time.RFC1123Z,
		time.RFC3339,
		time.RFC3339Nano,
		time.RFC822,
		time.RFC822Z,
		time.RFC850,
		time.Stamp,
		time.RubyDate,
		time.StampMicro,
		time.StampMilli,
		time.StampNano,
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

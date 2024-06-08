package history

func ValidSortKey(key string) string {
	for _, val := range []string{
		"id", "feature_used", "user_id", "created_at", "updated_at",
	} {
		if key == val {
			return key
		}
	}
	return "created_at"
}

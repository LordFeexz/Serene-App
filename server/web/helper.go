package web

func (d *DefaultPagination) SetDefault() {
	if d.Page == 0 {
		d.Page = 1
	}

	if d.Limit == 0 {
		d.Limit = 10
	}

	if d.SortBy == "" {
		d.SortBy = "created_at"
	}

	if d.SortDirection == "" {
		d.SortDirection = "desc"
	}
}

func (ans *MentalHealthAnswer) HasDuplicateQuestion() bool {
	questionMap := make(map[string]bool)
	for _, answer := range ans.Result {
		if _, exists := questionMap[answer.Question]; exists {
			return true
		}
		questionMap[answer.Question] = true
	}
	return false
}

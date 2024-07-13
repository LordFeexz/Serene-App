package libs

import (
	"context"
	"fmt"
	"os"
	"serene-app/exceptions"

	"googlemaps.github.io/maps"
)

func StartGmap() (data Gmaps, err error) {
	client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("GOOGLE_API_KEY")))
	if err != nil {
		return
	}

	data = &GmapsImpl{client}
	return
}

func (g *GmapsImpl) NearbyClinic(ctx context.Context, lat, lng float64, radius uint, pageToken string) (datas []LocationSearchResult, nextPage string, err error) {
	resp, err := g.NearbySearch(ctx, &maps.NearbySearchRequest{
		Location: &maps.LatLng{
			Lat: lat,
			Lng: lng,
		},
		Radius:    radius,
		Keyword:   "klinik terdekat",
		Type:      maps.PlaceTypePharmacy,
		PageToken: pageToken,
	})
	if err != nil {
		datas = []LocationSearchResult{}
		return
	}

	destinations := make([]string, 0)
	for _, result := range resp.Results {
		datas = append(datas, LocationSearchResult{
			Id:       result.ID,
			PlaceId:  result.PlaceID,
			Name:     result.Name,
			Icon:     result.Icon,
			Rating:   result.Rating,
			Vicinity: result.Vicinity,
			Geometry: result.Geometry,
		})
		destinations = append(destinations, fmt.Sprintf("%f,%f", result.Geometry.Location.Lat, result.Geometry.Location.Lng))
	}

	if len(datas) < 1 {
		datas = []LocationSearchResult{}
		return
	}

	distanceMatrixResponse, err := g.DistanceMatrix(ctx, &maps.DistanceMatrixRequest{
		Origins:      []string{fmt.Sprintf("%f,%f", lat, lng)},
		Destinations: destinations,
	})
	if err != nil {
		err = exceptions.NewError("gagal menghitung jarak klinik", 502)
		return
	}

	for i, element := range distanceMatrixResponse.Rows[0].Elements {
		datas[i].Distance = element.Distance.HumanReadable
	}

	nextPage = resp.NextPageToken

	return
}

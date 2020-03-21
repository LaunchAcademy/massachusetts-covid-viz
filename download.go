package main

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

func main() {
	t := time.Now()
	pdfURL := fmt.Sprintf("https://www.mass.gov/doc/covid-19-cases-in-Massachusetts-as-of-%s-%v-%v/download", t.Month(), zeroPad(strconv.Itoa(t.Day())), t.Year())

	fileName := getDateFileName(t)

	println("Attempting to download " + pdfURL)
	if err := downloadFile("./data/dailySourceData/"+fileName, pdfURL); err != nil {
		panic(err)
	}

	println("Downloaded.")
}

func zeroPad(value string) string {
	if len(value) == 1 {
		return "0" + value
	}
	return value
}

func getDateFileName(t time.Time) string {
	datePartInts := [3]int{t.Year(), int(t.Month()), t.Day()}
	datePartStrings := []string{}
	for _, datePart := range datePartInts {
		datePartString := zeroPad(strconv.Itoa(datePart))
		datePartStrings = append(datePartStrings, datePartString)
	}
	return strings.Join(datePartStrings, "") + ".pdf"
}

func downloadFile(filepath string, url string) error {

	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	if resp.StatusCode == 404 {
		return errors.New("Not Found")
	}

	defer resp.Body.Close()

	// Create the file
	out, err := os.Create(filepath)
	if err != nil {
		return err
	}
	defer out.Close()

	// Write the body to file
	_, err = io.Copy(out, resp.Body)
	return err
}

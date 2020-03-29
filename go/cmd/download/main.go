package main

import (
	"errors"
	"fmt"
	"io"
	"macovid/tracker"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	"time"
)

func main() {
	t := time.Now()
	pdfURL := fmt.Sprintf("https://www.mass.gov/doc/covid-19-cases-in-Massachusetts-as-of-%s-%v-%v/download", t.Month(), tracker.ZeroPad(strconv.Itoa(t.Day())), t.Year())

	fileName := tracker.GetDateFileName(t, "pdf")
	path := "../data/dailySourceData/" + fileName

	println("Attempting to download " + pdfURL)
	if err := downloadFile(path, pdfURL); err != nil {
		panic(err)
	}

	println("Downloaded.")
	cmd := exec.Command("open", path)
	cmd.Run()

	browserCmd := exec.Command("open", "https://ma-covid-19-tracker.launchacademy.com/generateDataForm")
	browserCmd.Run()
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

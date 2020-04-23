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
	"strings"
	"time"
)

func main() {
	t := time.Now()
	// https: //www.mass.gov/doc/covid-19-dashboard-april-20-2020/download
	pdfURL := fmt.Sprintf("https://www.mass.gov/doc/covid-19-dashboard-%s-%v-%v/download", strings.ToLower(t.Month().String()), strconv.Itoa(t.Day()-1), t.Year())

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

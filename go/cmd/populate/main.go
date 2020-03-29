package main

import (
	"macovid/tracker"
	"os"
	"os/exec"
	"time"

	"github.com/atotto/clipboard"
)

func main() {
	t := time.Now()
	contents, copyErr := clipboard.ReadAll()
	if copyErr != nil {
		panic("Couldn't copy")
	}

	path := "../data/dailies/" + tracker.GetDateFileName(t, "json")
	if st, _ := os.Stat(path); st != nil {
		os.Remove(path)
	}

	f, _ := os.Create(path)
	_, err := f.WriteString(contents)
	if err != nil {
		panic("Couldn't write file")
	}

	cmd := exec.Command("node", "scripts/compileDailyDatasets.js")
	cmd.Dir = "../"
	cmd.Run()
}

package tracker

import (
	"os"
	"strconv"
	"strings"
	"time"
)

// ZeroPad Add a zero fix if necessary
func ZeroPad(value string) string {
	if len(value) == 1 {
		return "0" + value
	}
	return value
}

// GetDateFileName get the relevant file name for the provided date
func GetDateFileName(t time.Time, ext string) string {
	datePartInts := [3]int{t.Year(), int(t.Month()), t.Day()}
	datePartStrings := []string{}
	for _, datePart := range datePartInts {
		datePartString := ZeroPad(strconv.Itoa(datePart))
		datePartStrings = append(datePartStrings, datePartString)
	}
	return strings.Join(datePartStrings, "") + "." + ext
}

// GetDate will determine what day we're working on
func GetDate() time.Time {
	t := time.Now()
	if os.Getenv("YESTERDAY") != "" {
		t = t.AddDate(0, 0, -1)
	}
	return t
}

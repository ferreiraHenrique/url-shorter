package main

import (
	"api/controllers/urlcontroller"

	"github.com/gorilla/mux"
	"github.com/urfave/negroni"
	mgo "gopkg.in/mgo.v2"
)

func main() {
	// session, err := mgo.Dial("localhost:27017")
	session, err := mgo.Dial("mongo:27017")
	if err != nil {
		panic(err)
	}
	defer session.Close()

	router := mux.NewRouter()

	router.HandleFunc("/v1/urls/home/", urlcontroller.Home(session)).Methods("GET", "OPTIONS")

	router.HandleFunc("/v1/url/", urlcontroller.CreatePublic(session)).Methods("POST", "OPTIONS")
	router.HandleFunc("/v1/url/{short}/", urlcontroller.Pageview(session)).Methods("PUT", "OPTIONS")

	n := negroni.Classic()
	n.UseHandler(router)
	n.Run(":8080")
}

package urlcontroller

import (
	"api/config"
	"api/models/urlmodel"
	"api/response"
	"encoding/json"
	"math/rand"
	"net/http"

	"github.com/gorilla/mux"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func Home(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()
		setupResponse(&w, r)
		if (*r).Method == "OPTIONS" {
			return
		}

		// var urls []urlmodel.Url
		var lastFive []urlmodel.Url
		var mostAccessed []urlmodel.Url

		c := session.DB(config.DB).C("url")
		quantity, _ := c.Find(nil).Count()

		// LAST FIVE INSERTED
		err := c.Find(nil).Sort("-_id").Limit(5).All(&lastFive)
		if err != nil {
			response.ErrorWithJSON(w, "", 203)
			return
		}

		//MOST ACCESSED
		err = c.Find(nil).Sort("-id", "-pageview").Limit(5).All(&mostAccessed)
		if err != nil {
			response.ErrorWithJSON(w, "", 203)
			return
		}

		respBody, _ := json.MarshalIndent(bson.M{
			"last_five":     lastFive,
			"quantity":      quantity,
			"most_accessed": mostAccessed,
		}, "", " ")
		response.ResponseWithJSON(w, respBody, 200)
	}
}

func CreatePublic(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()
		setupResponse(&w, r)
		if (*r).Method == "OPTIONS" {
			return
		}

		var url urlmodel.Url
		json.NewDecoder(r.Body).Decode(&url)

		acceptChars := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123465789"
		var hash string
		c := session.DB(config.DB).C("url")

		for true {
			hash = ""
			for i := 0; i < 6; i++ {
				hash += string(acceptChars[rand.Intn(len(acceptChars)-1)])
			}

			exist, _ := c.Find(bson.M{"short": hash}).Count()
			if exist == 0 {
				break
			}
		}

		url.ID = bson.NewObjectId()
		url.Short = hash
		url.Public = true

		err := c.Insert(url)
		if err != nil {
			response.ErrorWithJSON(w, "", 500)
			return
		}

		respBody, _ := json.MarshalIndent(url, "", " ")
		response.ResponseWithJSON(w, respBody, 201)
	}
}

func Pageview(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()
		setupResponse(&w, r)
		if (*r).Method == "OPTIONS" {
			return
		}

		vars := mux.Vars(r)
		short := vars["short"]

		var url urlmodel.Url

		c := session.DB(config.DB).C("url")
		err := c.Find(bson.M{"short": short}).One(&url)
		if err != nil {
			response.ErrorWithJSON(w, "Error, url not found", 500)
			return
		}

		err = c.Update(bson.M{"short": short}, bson.M{"$set": bson.M{"pageview": url.Pageview + 1}})
		if err != nil {
			response.ErrorWithJSON(w, "Error on update pageview", 500)
			return
		}

		respBody, _ := json.MarshalIndent(url, "", " ")
		response.ResponseWithJSON(w, respBody, 200)
	}
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

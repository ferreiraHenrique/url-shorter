package urlmodel

import (
	"gopkg.in/mgo.v2/bson"
)

type Url struct {
	ID       bson.ObjectId `json:"_id" bson:"_id"`
	Long     string        `json:"long" bson:"long"`
	Short    string        `json:"short" bson:"short"`
	Public   bool          `json:"public" bson:"public"`
	Pageview int           `json:"pageview" bson:"pageview"`
}

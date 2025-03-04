package models

//request (both endpoint and DB) structs

type LoginReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type User struct {
	Id       int
	Username string
	PHash    string
}

import axios from "axios";
const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";

export default {
  getArticles: function(term) {
    return axios({
      method:'get',
      url:queryURLBase + term,
    });
  },
  getDBArticles:function(){
    return axios.get("api/articles/");
  },
  // getArticles: function(term,addiontalTerms) {
  //   return axios({
  //     method:'get',
  //     url:queryURLBase + addiontalTerms,
  //   });
  // },
  // // Gets all Articless
  // getArticles: function() {
  //   return axios.get("/api/articles");
  // },
  // Gets the Articles with the given id
  // getArticles: function(id) {
  //   return axios.get("/api/articles/" + id);
  // },
  // Deletes the Articles with the given id
  deleteArticles: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a Articles to the database
  saveArticles: function(ArticlesData) {
    return axios.post("/api/articles", ArticlesData);
  }
};

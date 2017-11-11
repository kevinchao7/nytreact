import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn, DropDownList } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    term: "",
    amount: 10,
    startYear:"",
    endYear:""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getDBArticles()
    .then(res=>
      this.setState(
      {articles : res.data}))
    .catch(err=>console.log(err));
    // API.getArticless()
    //   .then(res =>
    //     this.setState({ Articless: res.data, title: "", author: "", synopsis: "" })
    //   )
    //   .catch(err => console.log(err));
  };

  deleteArticles = id => {
    API.deleteArticles(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  saveArticles = obj => {
    API.saveArticles(obj)
      .then(res=>console.log(res))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    // console.log(name + ' : ' +value);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.term && this.state.amount) {
      API.getArticles(this.state.term)
      .then(res=>{
        var tmpArray = [];
        for (var i = 0; i < this.state.amount; i++){
          tmpArray.push(res.data.response.docs[i])
        };
        this.setState({articles:tmpArray});
        console.log(tmpArray);
        // console.log(res.data.response.docs)
      }).catch(err=>console.log(err));
      // API.saveArticles({
      //   term: this.state.term,
      //   author: this.state.author,
      //   synopsis: this.state.synopsis
      // })
      //   .then(res => console.log(res))
      //   .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What NYTimes articles to search?</h1>
            </Jumbotron>
            <form>
              <label>Search Term</label>
              <Input
                value={this.state.term}
                onChange={this.handleInputChange}
                name="term"
                placeholder="Search term(required)"
              />
              <label>Number of Articles</label>
              <DropDownList value={this.state.amount}
                name="amount" onChange={this.handleInputChange} placeholder="Choose a Number of Articles">
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </DropDownList>
              {/* <label>Start Year(Optional)</label>
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Enter a start year"
              />
              <label>End Year(Optional)</label>
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Enter an end year"
              /> */}
              <FormBtn
                disabled={!(this.state.amount && this.state.term)}
                onClick={this.handleFormSubmit}
              >
                Submit Articles
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Articles On My List</h1>
            </Jumbotron>
            {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <ListItem key={article._id}>
                      <Link to={article.web_url || article.url}>
                        <strong>
                          {article.title || article.headline.print_headline || article.headline.main}
                        </strong>
                        <p>
                          {article.snippet}
                        </p>

                      </Link>
                      <SaveBtn onClick={() => this.saveArticles(
                        {
                          _id: article._id,
                          title: article.headline.print_headline || article.headline.main,
                          snippet: article.snippet,
                          url: article.web_url
                        }
                      )} />
                      <DeleteBtn onClick={() => this.deleteArticles(article._id)} />
                    </ListItem>
                  ))}
                </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;

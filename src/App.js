import React, { Component } from 'react'
import { CircularProgress } from 'material-ui/Progress'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import Header from './Header'
import SearchForm from './SearchForm'
import BookList from './BookList'
import BookDetails from './BookDetails'

import axios from 'axios'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      serverUrl: 'http://127.0.0.1:3030',
      bookList: undefined,
      q: 'python',
      totalBooks: 0,
      startIndex: 0,
      maxResults: 36,
      isLoading: false,
      showDetails: false
    }
  }

  getBookList () {
    this.setState({
      isLoading: true
    })

    axios.get(`${this.state.serverUrl}/search/${this.state.q}?start=${this.state.startIndex}&max=${this.state.maxResults}`)
      .then((result) => {
        this.setState({
          bookList: result.data,
          totalBooks: result.data.totalItems,
          isLoading: false
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleFormSubmit (searchTitle) {
    this.setState({
      startIndex: 0,
      q: searchTitle
    }, () => {
      this.getBookList()
    })
  }

  handleBookClick (bookId) {
    this.setState({
      showDetails: true,
      activeBookId: bookId
    })
  }

  handleHomeClick () {
    this.setState({
      showDetails: false
    })
  }

  handleNext () {
    this.setState({
      startIndex: this.state.startIndex + this.state.maxResults + 1
    }, () => {
      this.getBookList()
    })
  }

  handleBack () {
    this.setState({
      startIndex: this.state.startIndex - this.state.maxResults - 1
    }, () => {
      this.getBookList()
    })
  }

  renderBookList () {
    if (this.state.bookList) {
      return (
        <BookList
          totalBooks={this.state.totalBooks}
          maxResults={this.state.maxResults}
          startIndex={this.state.startIndex}
          onNext={this.handleNext.bind(this)}
          onBack={this.handleBack.bind(this)}
          bookList={this.state.bookList.items}
          onBookClick={this.handleBookClick.bind(this)} />
      )
    } else {
      return (
        <div className='row center-lg center-md center-sm center-xs' style={{marginTop: '25px'}}>
          <Paper elevation={4}>
            <Typography style={{padding: '25px'}} type='headline' component='h3'>
              No Books Found
            </Typography>
          </Paper>
        </div>
      )
    }
  }
  render () {
    return (
      <div>
        <Header />
        { this.state.showDetails
          ? <BookDetails
            bookId={this.state.activeBookId}
            serverUrl={this.state.serverUrl}
            onHomeClick={this.handleHomeClick.bind(this)}

          />
          : <div>
            <div style={{marginTop: '50px'}}>
              <SearchForm onSubmit={this.handleFormSubmit.bind(this)} />
            </div>
            {
              this.state.isLoading
              ? <div className='row center-lg center-md center-sm center-xs' style={{marginTop: '250px'}}>
                <CircularProgress size={100} />
              </div>
              : <span>{this.renderBookList()}</span>
            }
          </div>

        }

      </div>
    )
  }
}

export default App

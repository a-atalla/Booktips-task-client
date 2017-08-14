import React from 'react'
import axios from 'axios'
import HomeIcon from 'material-ui-icons/Home'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'

class BookDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      book: {}
    }
  }

  componentDidMount () {
    axios.get(`${this.props.serverUrl}/books/${this.props.bookId}`)
    .then((result) => {
      this.setState({
        book: result.data,
        isLoading: false
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render () {
    let book = this.state.book.volumeInfo
    return (
      <div >
        {
          this.state.isLoading ? <div className='row center-lg center-md center-sm center-xs' style={{marginTop: '250px'}}><CircularProgress size={100} /></div>
          : <div>
            <Button color='primary' style={{marginTop: '25px'}} onClick={this.props.onHomeClick}>
              <HomeIcon />
            </Button>
            <hr />
            <div className='row'>
              <div className='col-md-6 col-sm-12'>
                <img src={book.imageLinks.medium} alt='' />
              </div>
              <div className='col-md-6 col-sm-12'>
                <h3>{book.title}</h3>
                <h4>Authors: {book.authors.map((author) => <span className='details' key={author}>{author}, </span>)}</h4>
                <h4>Publisher: <span className='details'>{book.publisher}</span></h4>
                <h4>Published Date: <span className='details'>{book.publishedDate}</span></h4>
                <p dangerouslySetInnerHTML={{__html: book.description}} />
              </div>
            </div>

          </div>

        }
      </div>
    )
  }
}

export default BookDetails

import React from 'react'
import Book from './Book'
import MobileStepper from 'material-ui/MobileStepper'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

class BookList extends React.Component {
  handleBookClick (bookId) {
    this.props.onBookClick(bookId)
  }

  renderBookList () {
    if (this.props.bookList) {
      return this.props.bookList.map((book) => {
        return (
          <Book key={book.id} book={book} onBookClick={this.handleBookClick.bind(this)} />
        )
      })
    }
  }

  render () {
    return (
      <div>
        <div className='row center-lg center-md center-sm center-xs between-md between-sm between-xs' style={{marginTop: '35px'}}>
          {this.renderBookList()}
        </div>

        <div className='row center-lg center-md center-sm center-xs between-md between-sm between-xs'>
          <div className='col-md-8' style={{marginBottom: '25px'}}>
            <Paper>
              <Typography style={{padding: '25px'}} type='headline' component='h3'>
                {`From ${this.props.startIndex} To ${(this.props.startIndex + this.props.maxResults)}(${this.props.totalBooks} Books)`}
              </Typography>
            </Paper>
          </div>

          <div className='col-md-5'>
            <MobileStepper
              type='text'
              steps={6}
              position='static'
              onBack={this.props.onBack}
              onNext={this.props.onNext}
              disableBack={this.props.startIndex === 0}
              disableNext={this.props.startIndex === this.props.maxResults - 1}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default BookList

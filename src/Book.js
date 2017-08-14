import React from 'react'
import Card, {CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'

class Book extends React.Component {
  bookClick () {
    this.props.onBookClick(this.props.book.id)
  }

  render () {
    let book = this.props.book
    let hasThumbnail = !!book.volumeInfo.imageLinks

    return (
      <div onClick={this.bookClick.bind(this)} className='book col-lg-2 col-md-3 col-sm-4 col-xs-6' style={{marginBottom: '25px'}}>
        <Card key={book.id} style={{textAlign: 'center', height: '350px', paddingTop: '10px'}}>
          <CardMedia>
            {/*  Check if the book has a thumbnail */}
            { hasThumbnail
              ? <img src={book.volumeInfo.imageLinks.thumbnail} alt='Contemplative Reptile' />
              : 'No Thumbnail Avaliable'
            }
          </CardMedia>
          <hr />
          <Typography type='headline' component='h3' style={{color: '#607d8b'}}>
            {book.volumeInfo.title}
          </Typography>
        </Card>
      </div>
    )
  }
}

export default Book

import React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import SearchIcon from 'material-ui-icons/Search'

class SearchForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTitle: ''
    }
  }

  onFormSubmit (event) {
    event.preventDefault()
    if (this.state.searchTitle !== '') {
      this.props.onSubmit(this.state.searchTitle)
    }
  }

  render () {
    return (
      <form onSubmit={this.onFormSubmit.bind(this)}>
        <div className='row'>
          <TextField
            onChange={event => this.setState({ searchTitle: event.target.value })}
            value={this.state.searchTitle}
            className='col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1'
            placeholder='Type a book title to search'
            style={{width: '100%', marginBottom: '25px'}} />
          <Button
            type='submit'
            className='col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2'
            raised color='primary'
            style={{width: '50%'}}>
            <SearchIcon style={{marginRight: '15px'}} />
              Find
            </Button>
        </div>
      </form>
    )
  }
}

export default SearchForm

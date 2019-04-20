import ReactDOM from 'react-dom';
import React, { Component } from 'react'
import { format } from 'date-fns'
import './index.css';
import * as serviceWorker from './serviceWorker';


class App extends Component {
  state = {
    comments: [],
    form: {
      name: '',
      comment: ''
    }
  }
  componentDidMount() {
    if (localStorage.getItem('state')) {
      this.setState({ ...JSON.parse(localStorage.getItem('state')) })
    }
  }
  addComment = () => {
    this.setState({
      comments: [
        ...this.state.comments,
        {
          id: this.state.comments.length ? this.state.comments.reduce((p, c) => p.id > c.id ? p : c).id + 1 : 1, 
          name: this.state.form.name,
          comment: this.state.form.comment,
          date: new Date()
        }
      ],
      form: {
        name: '',
        comment: ''
      }
    }, () => localStorage.setItem('state', JSON.stringify(this.state)))
  }

  removeComment = (id) => {
    this.setState({
      comments: this.state.comments.filter(comment => comment.id !== id)
    }, () => localStorage.setItem('state', JSON.stringify(this.state)))
  }
 
  handleChange = (e) => {
    console.log(e.target.name)
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    })
  }
 
  render() {
    return (
      <div className="App">
        {this.state.comments.map(comment => <div key={comment.id}>
          <span style={{ fontStyle: 'italic' }}>{comment.id}  </span>
          <strong>{comment.name} : </strong>
          <br />
          <div>{comment.comment}</div>
          <br />
          <span style={{ fontStyle: 'italic' }}> дата : <b>{format(comment.date, 'DD/MM/YYYY HH:m:s')} </b> </span>
          <button onClick={this.removeComment.bind(null, comment.id)}>Удалить комментарий</button>
        </div>)}
        <div>
          <label>Имя: <input
            type="text"
            value={this.state.form.name}
            name="name"
            onChange={this.handleChange} /></label>
          <label>Комментарий: <textarea
            name="comment"
            value={this.state.form.comment}
            onChange={this.handleChange}></textarea>
          </label>
          <button onClick={this.addComment}>Добавить комментарий</button>
        </div>

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


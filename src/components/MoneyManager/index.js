import {Component} from 'react'

import {v4} from 'uuid'

import CommentItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class Comments extends Component {
  state = {
    nameInput: '',
    amountInput: '',
    typeInput: 'INCOME',
    balance: 0,
    income: 0,
    expense: 0,
    commentsList: [],
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    const updatedlis = commentsList.filter(i => i.id === commentId)
    console.log(updatedlis)
    if (updatedlis[0].type === 'Income') {
      this.setState(pre => ({
        commentsList: commentsList.filter(comment => comment.id !== commentId),
        balance: pre.balance - parseInt(updatedlis[0].comment),
        income: pre.income - parseInt(updatedlis[0].comment),
      }))
    } else {
      this.setState(pre => ({
        commentsList: commentsList.filter(comment => comment.id !== commentId),
        balance: pre.balance + parseInt(updatedlis[0].comment),
        expense: pre.expense - parseInt(updatedlis[0].comment),
      }))
    }
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        // toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, amountInput, typeInput} = this.state

    if (typeInput === 'INCOME') {
      const newComment = {
        id: v4(),
        name: nameInput,
        comment: amountInput,
        type: 'Income',
      }
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        nameInput: '',
        balance: prevState.balance + parseInt(amountInput),
        income: prevState.income + parseInt(amountInput),
        amountInput: '',
      }))
    } else {
      const newComment = {
        id: v4(),
        name: nameInput,
        comment: amountInput,
        type: 'Expenses',
      }
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        nameInput: '',
        balance: prevState.balance - parseInt(amountInput),
        expense: prevState.expense + parseInt(amountInput),
        amountInput: '',
      }))
    }
    //   console.log(this.state)
  }

  onChangeAmountInput = event => {
    this.setState({
      amountInput: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  onChangeTypeInput = event => {
    this.setState({
      typeInput: event.target.value,
    })
  }

  render() {
    const {nameInput, amountInput, balance, income, expense} = this.state

    // console.log(this.state)
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Hi, Richard</h1>
          <p>
            welcome back to your<span>Money Manager</span>
          </p>
          <div>
            <ul>
              <li>
                <img
                  alt="balance"
                  src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                />

                <p data-testid="balanceAmount">Your Balance RS {balance}</p>
              </li>
              <li>
                <img
                  alt="income"
                  src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
                />
                <p>Your Income</p>
                <p data-testid="incomeAmount">RS {income}</p>
              </li>
              <li>
                <img
                  alt="expenses"
                  src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                />
                <p>Your Expenses</p>
                <p data-testid="expensesAmount">RS {expense}</p>
              </li>
            </ul>
          </div>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <h1 className="form-description">Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <input
                id="title"
                type="text"
                className="name-input"
                placeholder="title"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                id="amount"
                type="text"
                className="name-input"
                placeholder="amount"
                value={amountInput}
                onChange={this.onChangeAmountInput}
              />
              <label htmlFor="type">TYPE</label>
              <select
                id="type"
                className="name-input"
                onChange={this.onChangeTypeInput}
              >
                {transactionTypeOptions.map(item => (
                  <option value={item.optionId}>{item.displayText}</option>
                ))}
              </select>

              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>
          <hr className="line" />
          <h1 className="heading">History</h1>
          <p>Title</p>
          <p>Amount</p>
          <p>Type</p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments

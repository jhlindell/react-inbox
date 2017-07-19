import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/toolbar.js';
import MessageList from './components/messageList.js';
import ComposeForm from './components/composeForm.js';

class App extends Component {
  state = {
    showForm: false,
    bulkStatus: 'fa fa-square-o',
    selectedItemCount: 0,
    messages: [],
    subject: "",
    body: ""
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8181/api/messages')
    const json = await response.json();
    this.setState({messages: json._embedded.messages})
  }

  saveMessage = (event) => {
    event.persist();
    event.preventDefault();
    let message = {};
    message.subject = this.state.subject;
    message.body = this.state.body;
    message.read = false;
    message.starred = false;
    message.labels = [];
    this.setState({showForm:false});
    this.persistMessage(message);
  }

  async persistMessage(message) {
    const response = await fetch('http://localhost:8181/api/messages', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    const returnedMessage = await response.json();
    this.setState({messages: [...this.state.messages, returnedMessage]});
  }

  async patchMessage(message, command, label){
    let patchBody = {};
    switch(command){
      case 'star':
        patchBody = {
          "messageIds": [message.id],
          "command": "star",
          "star": message.starred
        }
        break;

      case 'read':
        patchBody = {
          "messageIds": [message.id],
          "command": "read",
          "read": message.read
        }
        break;

      case 'delete':
        patchBody = {
          "messageIds": [message.id],
          "command": "delete"
        }
        break;

      case 'addLabel':
        patchBody = {
          "messageIds": [message.id],
          "command": "addLabel",
          "label": label
        }
        break;

      case 'removeLabel':
        patchBody = {
          "messageIds": [message.id],
          "command": "removeLabel",
          "label": label
        }
        break;

      default:
        break;
    }

    await fetch('http://localhost:8181/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(patchBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }

  changeReadState = (message) => {
    if(!message.read){
      message.read = true;
    }
    if(message.showMessage){
      message.showMessage = false;
    }else {
    this.hideAllMessageBodies();
      message.showMessage = true;
    }
    this.patchMessage(message, "read");
    this.setState({messages:this.state.messages});
  }

  markRead = () => {
    let messages = this.state.messages;
    for(let i = 0; i < messages.length; i++){
      if(messages[i].checked === true && messages[i].read === false){
        messages[i].read = true;
        this.patchMessage(messages[i], "read");
      }
    }
    this.setState({messages:this.state.messages});
  }

  markUnread = () => {
    let messages = this.state.messages;
    for(let i = 0; i < messages.length; i++){
      if(messages[i].checked === true && messages[i].read === true){
        messages[i].read = false;
        this.patchMessage(messages[i], "read");
      }
    }
    this.setState({messages:this.state.messages});
  }

  onCheckChange = (event, message) => {
    event.persist();
    let tempMessages = [];
    Object.assign(tempMessages, this.state.messages);
    for(let i = 0; i < tempMessages.length; i++){
      if(tempMessages[i].id === message.id){
        tempMessages[i].checked = !message.checked;
      }
    }
    this.checkBulkStatus();
    this.getSelectedItemCount();
    this.setState({messages:tempMessages});
  }

  checkBulkStatus(){
    let messages = this.state.messages;
    let selectCount = 0;
    for(let i = 0; i < messages.length; i++){
      if(messages[i].checked === true){
        selectCount++;
      }
    }
    if(selectCount === 0){
      this.setState({bulkStatus: 'fa fa-square-o'});
    }
    if(selectCount >0 && selectCount < messages.length){
      this.setState({bulkStatus: 'fa fa-minus-square-o'});
    }
    if(selectCount === messages.length){
      this.setState({bulkStatus: 'fa fa-check-square-o'});
    }
    this.setState({messages:this.state.messages});
  }

  onStarChange = (event, message) => {
    event.persist();
    message.starred = !message.starred;
    this.patchMessage(message, "star");
    this.setState({messages:this.state.messages});
  }

  bulkSelect = () => {
    let messages = this.state.messages;
    this.checkBulkStatus();
    if(this.state.bulkStatus === 'fa fa-square-o' || this.state.bulkStatus === 'fa fa-minus-square-o'){
      for(let j = 0; j< messages.length; j++) {
        messages[j].checked = true;
      }
      this.checkBulkStatus();
    } else {
      for(let k = 0; k< messages.length; k++) {
        messages[k].checked = false;
      }
      this.checkBulkStatus();
    }
    this.getSelectedItemCount();
    this.setState({messages:this.state.messages});
  }

  addLabel = (value) => {
    let messages = this.state.messages;
    for(let i = 0; i < messages.length; i++){
      if(messages[i].checked === true && !messages[i].labels.includes(value)){
        messages[i].labels.push(value);
        this.patchMessage(messages[i], "addLabel", value);
      }
    }
    this.setState({messages:this.state.messages});
  }

  removeLabel = (value) => {
    let messages = this.state.messages;
    for(let i = 0; i < messages.length; i++){
      if(messages[i].checked === true && messages[i].labels.includes(value)){
        this.patchMessage(messages[i], "removeLabel", value);
        messages[i].labels.splice(messages[i].labels.indexOf(value),1);
      }
    }
    this.setState({messages:this.state.messages});
  }

  deleteMessage = () => {
    let messages = this.state.messages;
    for(let i =0; i < messages.length; i++) {
      if(messages[i].checked === true){
        this.patchMessage(messages[i], "delete");
        messages.splice(i ,1);
      }
    }

    this.getSelectedItemCount();
    this.setState({messages:this.state.messages});
  }

  getUnreadCount = () => {
    return this.state.messages.reduce((acc, curr) => {
      if(!curr.read){
        acc++;
      }
      return acc;
    }, 0);
  }

  getSelectedItemCount = () => {
    let messages = this.state.messages;
    let count = 0;
    for(let i = 0; i < messages.length; i++){
      if(messages[i].checked){
        ++count;
      }
    }
    this.setState({selectedItemCount:count});
  }

  hideAllMessageBodies = () => {
    let messages = this.state.messages;
    for(let i = 0; i < messages.length; i++){
      messages[i].showMessage = false;
    }
  }

  formHandleChange = (e) => {
    this.setState({[e.target.name]:e.target.value});
  }

  showFormClick = () => {
    this.setState({showForm: !this.state.showForm})
  }

  render() {
    return (
      <div className="App">
          <h2>Welcome to React</h2>
          <Toolbar markRead={this.markRead}
          showFormClick={this.showFormClick}
          markUnread={this.markUnread}
          bulkSelect={this.bulkSelect}
          bulkStatus={this.state.bulkStatus}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          deleteMessage={this.deleteMessage}
          unreadCount={this.getUnreadCount()}
          selectedItemCount={this.state.selectedItemCount}/>

          <MessageList messages={this.state.messages} changeReadState={this.changeReadState} onCheckChange={this.onCheckChange}
          onStarChange={this.onStarChange}
          showMessage={this.state.messages.showMessage}/>

          <ComposeForm
          saveMessage={this.saveMessage}
          formData={this.state.formData}
          handleChange={this.formHandleChange}
          showForm={this.state.showForm}/>
      </div>
    );
  }
}

export default App;

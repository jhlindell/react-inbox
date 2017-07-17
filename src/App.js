import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/toolbar.js';
import MessageList from './components/messageList.js';


class App extends Component {
state = {
    bulkStatus: 'fa fa-square-o',
    messages: [
    {
      "id": 1,
      "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
      "read": false,
      "starred": true,
      "labels": ["dev", "personal"],
      "checked": false
    },
    {
      "id": 2,
      "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
      "read": false,
      "starred": false,
      "selected": true,
      "labels": [],
      "checked": false
    },
    {
      "id": 3,
      "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
      "read": false,
      "starred": true,
      "labels": ["dev"],
      "checked": false
    },
    {
      "id": 4,
      "subject": "We need to program the primary TCP hard drive!",
      "read": true,
      "starred": false,
      "selected": true,
      "labels": [],
      "checked": false
    },
    {
      "id": 5,
      "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
      "read": false,
      "starred": false,
      "labels": ["personal"],
      "checked": false
    },
    {
      "id": 6,
      "subject": "We need to back up the wireless GB driver!",
      "read": true,
      "starred": true,
      "labels": [],
      "checked": false
    },
    {
      "id": 7,
      "subject": "We need to index the mobile PCI bus!",
      "read": true,
      "starred": false,
      "labels": ["dev", "personal"],
      "checked": false
    },
    {
      "id": 8,
      "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
      "read": true,
      "starred": true,
      "labels": [],
      "checked": false
    }
  ]
}

  changeReadState = (message) => {
    message.read = !message.read;
    this.setState({messages:this.state.messages});
  }

  markRead = () => {
    let messages = this.state.messages;
    for(let i = 0; i < messages.length; i++){
      if(messages[i].checked === true && messages[i].read === false){
        this.changeReadState(messages[i]);
      }
    }
  }

  markUnread = () => {
    let messages = this.state.messages;
    for(let i = 0; i < messages.length; i++){
      if(messages[i].checked === true && messages[i].read === true){
        this.changeReadState(messages[i]);
      }
    }
  }

  onCheckChange = (event, message) => {
    event.persist();
    message.checked = !message.checked;
    this.checkBulkStatus();
    this.setState({messages:this.state.messages});
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
    this.setState({messages:this.state.messages});
  }

  bulkSelect = () => {
    let messages = this.state.messages;
    this.checkBulkStatus();
    if(this.state.bulkStatus === 'fa fa-square-o' || this.state.bulkStatus === 'fa fa-minus-square-o'){
      for(let j = 0; j< messages.length; j++) {
        messages[j].checked = true;
      }
    } else {
      for(let k = 0; k< messages.length; k++) {
        messages[k].checked = false;
      }
    }
    this.setState({messages:this.state.messages});
  }

  addLabel = (value) => {
    let messages = this.state.messages;
    for(let i = 0; i < messages.length; i++){
      if(messages[i].checked === true && !messages[i].labels.includes(value)){
        messages[i].labels.push(value);
      }
    }
    this.setState({messages:this.state.messages});
  }

  removeLabel = (value) => {
    let messages = this.state.messages;
    for(let i = 0; i < messages.length; i++){
      if(messages[i].checked === true && messages[i].labels.includes(value)){
        messages[i].labels.splice(messages[i].labels.indexOf(value),1);
      }
    }
    this.setState({messages:this.state.messages});
  }

  render() {
    return (
      <div className="App">
          <h2>Welcome to React</h2>
          <Toolbar markRead={this.markRead}
          markUnread={this.markUnread}
          bulkSelect={this.bulkSelect}
          bulkStatus={this.state.bulkStatus}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}/>

          <MessageList messages={this.state.messages} changeReadState={this.changeReadState} onCheckChange={this.onCheckChange}
          onStarChange={this.onStarChange}/>
      </div>
    );
  }
}

export default App;

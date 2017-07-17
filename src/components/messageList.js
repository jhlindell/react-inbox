import React from "react";
import Message from "./message.js"

class MessageList extends React.Component {


  render(){
    return (
      <div className="messageList">
        <div>
          { this.props.messages.map(message => <Message key={ message.id } message = {message} changeReadState={this.props.changeReadState} onCheckChange={this.props.onCheckChange} onStarChange={this.props.onStarChange}/>)}
        </div>
      </div>
    )
  }
}

export default MessageList;

import React from "react";

class Message extends React.Component {

  render() {
    return (
      <div className={`row message ${this.props.message.read ?'read': 'unread'} ${this.props.message.checked ? 'selected': ''}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={this.props.message.checked || false} onChange={(e) => { this.props.onCheckChange(e, this.props.message)}}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${this.props.message.starred ?'fa-star' :'fa-star-o'}`} onClick={(e) => {
                this.props.onStarChange(e, this.props.message)}}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {this.props.message.labels.map((label, index) => <span className="label label-warning" key={index}>{label}</span>)}
          <a onClick={() => {this.props.changeReadState(this.props.message); }}>
            {this.props.message.subject}
          </a>
        </div>
        {this.props.message.showMessage?
          <div className="row message-body">
            <div className="col-xs-11 col-xs-offset-1">
              {this.props.message.body}
            </div>
          </div>:null}
      </div>
    )
  }
}

export default Message;

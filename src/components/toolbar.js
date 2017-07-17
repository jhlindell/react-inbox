import React from 'react';

class Toolbar extends React.Component {

  render(){
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.unreadCount}</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={this.props.bulkSelect}>
            <i className={this.props.bulkStatus}></i>
          </button>

          <button className="btn btn-default" onClick={this.props.markRead}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={this.props.markUnread}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={(e) => {this.props.addLabel(e.target.value)}}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={(e) => {this.props.removeLabel(e.target.value)}}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={this.props.deleteMessage}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar;

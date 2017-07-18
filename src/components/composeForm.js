import React from "react";

class ComposeForm extends React.Component {

  render() {
    return (
      <div>
        {this.props.showForm?
        <form className="form-horizontal well">
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Compose Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="subject" value={this.props.subject}
              onChange={(e) => {this.props.handleChange(e)}}
              name="subject"/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea value={this.props.body}
              onChange={(e) => {this.props.handleChange(e)}}
              name="body" id="body" className="form-control"></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input type="submit" value="Send" className="btn btn-primary" onClick={(e) => {this.props.saveMessage(e)}}/>
            </div>
          </div>
        </form>:null}
      </div>
    )
  }
}

export default ComposeForm;

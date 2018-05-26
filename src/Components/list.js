import React from 'react';
import ListBody from './ListComponents/list-body';
import ListHeader from './ListComponents/list-header';

class List extends React.Component {
render() {

    const props = this.props;
  
    return (
      <div>
        <ListHeader/>
        <ListBody tasks={this.props.taskList} {...props}/>
      </div>
    )
  }
}

export default List;
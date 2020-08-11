import React from 'react';
import { getStoreByUsername } from '../../utils/stores';
import QueueList from '../Queue/QueueList';
import Container from '@material-ui/core/Container';


class StoreQueuesTable extends React.Component {

  constructor(props) {
    super(props);

    const { storeName, currentUser } = props;
    this.state = {
      queues: [...getStoreByUsername((storeName === undefined) ? currentUser : storeName).currentQueue]
    };
  }

  removeQueue = (index) => {
    const { storeName, currentUser } = this.props;
    const storeObj = getStoreByUsername((storeName === undefined) ? currentUser : storeName);
    storeObj.currentQueue.splice(index, 1);

    this.setState({
      queues: [...storeObj.currentQueue]
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <QueueList queues={this.state.queues} removeQueue={this.removeQueue}/>
        </Container>
      </React.Fragment>
    );
  }
}

export default StoreQueuesTable;

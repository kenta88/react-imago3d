// @flow
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import React from 'react';

import { OBJECTS3D } from '../../constants';
import SAMPLE from '../../constants/sample';
import {
  getLevel,
  getObjects,
} from '../../reducers/editor';
import {
  createObject,
  levelUp,
  levelDown,
} from '../../actions/editor';


type Props = {
    objects: Array<Object>,
    createObject: (string) => void,
    // level: number,
    // levelUp: () => void,
    // levelDown: () => void,
};

@connect(
  store => ({
    level: getLevel(store),
    objects: getObjects(store),
  }),
  {
    createObject,
    levelUp,
    levelDown,
  },
)
class Header extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      modal: false,
      isSaving: false,
    };
  }

    @autobind
  onClick3dObject(type) {
    this.props.createObject(OBJECTS3D[type]);
    this.closeDrawner();
  }

    @autobind
    openDrawner() {
      this.setState({
        open: true,
      });
    }

    @autobind
    saveToLocalStorage() {
      const objects = this.props.objects.toJS();
      localStorage.setItem('objects', JSON.stringify(objects));
      this.setState({
        modal: true,
        isSaving: true,
      });
    }

    @autobind
    // eslint-disable-next-line
    saveSampleToLocalStorage() {
      localStorage.setItem('objects', JSON.stringify(SAMPLE));
      this.setState({
        modal: true,
      });
    }

    @autobind
    resetLocalStorage() {
      localStorage.setItem('objects', JSON.stringify([]));
      this.setState({
        modal: true,
      });
    }

    @autobind
    closeSaveModal() {
      if (!this.state.isSaving) {
        location.reload();
      } else {
        this.setState({
          modal: false,
          isSaving: false,
        });
      }
    }

    @autobind
    closeDrawner() {
      this.setState({
        open: false,
      });
    }

    render() {
      return (
        <>
          <h2>test</h2>
        </>
      );
    }
}

export default Header;

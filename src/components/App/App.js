import React from 'react';
import { assocPath, compose, map, head, groupBy, prop, test, isEmpty } from 'ramda';
import addNewYear from '../../utils/add-new-year';
import { fillMaxPrisoners } from '../../utils/preprocessing';
import './App.css';

const App = React.createClass({
  getInitialState() {
    return {
      prisons: {},
      newPrison: {
        id: undefined,
        name_ru: '',
        name_en: '',
        addl_names_ru: '',
        addl_names_en: '',
        description_ru: '',
        description_en: '',
        published_ru: false,
        published_en: false,
        features: []
      }
    };
  },

  componentWillMount() {
    const groupById = compose(map(head), groupBy(prop('id')));
    const preprocess = compose(fillMaxPrisoners, groupById);

    fetch('http://gulag.urbica.co/backend/public/camps.json')
      .then(r => r.json())
      .then(prisons => this.setState({ prisons: preprocess(prisons) }));
  },

  updatePrison(prison) {
    if (prison.id) {
      this.setState(assocPath(['prisons', prison.id], prison, this.state));
    } else {
      this.setState({ newPrison: prison });
    }
  },

  submitPrison(prison) {
    let request;
    if (prison.id) {
      request = fetch(`http://gulag.urbica.co/backend/public/camps/id/${prison.id}`, {
        body: JSON.stringify(prison),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      request = fetch('http://gulag.urbica.co/backend/public/camps/id', {
        body: JSON.stringify(prison),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
    }

    request
      .then(response => response.json())
      .then(newPrison => {
        this.setState(assocPath(['prisons', prison.id], newPrison, this.state));
        alert(`Лагерь "${prison.name_ru}" обновлён`);
      });
  },

  addNewYear(prisonId, locationId, year) {
    this.setState(addNewYear(this.state, prisonId, locationId, year))
  },

  renderChildren() {
    if (isEmpty(this.state.prisons)) return null;
    const { pathname } = this.props.router.location;

    // /admin || /admin/prisons -> <IndexPage />
    if (test(/^(\/admin\/?|\/admin\/prisons\/?)$/, pathname)) {
      return React.cloneElement(this.props.children, {
        prisons: this.state.prisons
      });
    }
    // /admin/prisons/new -> <PrisonPage />
    else if (test(/\/admin\/prisons\/new/, pathname)) {
      const prison = this.state.newPrison;
      return React.cloneElement(this.props.children, {
        prison: prison,
        changeDropDownItem: this.changeDropDownItem,
        addNewYear: this.addNewYear,
        submitHandler: this.submitPrison,
        updateHandler: this.updatePrison
      });
    }
    // /admin/prisons/prisonId -> <PrisonPage />
    else if (test(/\/admin\/prisons\/\d+/, pathname)) {
      const { prisonId } = this.props.router.params;
      return React.cloneElement(this.props.children, {
        prison: this.state.prisons[prisonId],
        changeDropDownItem: this.changeDropDownItem,
        addNewYear: this.addNewYear,
        submitHandler: this.submitPrison,
        updateHandler: this.updatePrison
      });
    }

    return this.props.children;
  },

  render() {
    return (
      <div className='App'>
        { this.renderChildren() }
      </div>
    );
  }
});

export default App;

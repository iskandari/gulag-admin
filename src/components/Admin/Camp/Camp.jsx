import React, { PureComponent } from 'react';
import moment from 'moment';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

// components
import Header from './Header/Header';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
import Button from '../Button';
import TextInput from './TextInput/TextInput';
import MarkdownEditor from './Inputs/MarkdownEditor';
// import NotesInput from './NotesInput/NotesInput';
import SelectInput from './Inputs/SelectInput';
// import Photos from './Photos/Photos';
import MarkdownHelp from './MarkdownHelp/MarkdownHelp';
import CampLocation from './CampLocation/CampLocation';

// styled
import Container from './Container';
// import Link from './Link';
import Fieldset from './Fieldset';
import FieldTitle from './FieldTitle';
import Separator from './Separator';

import { languages } from '../../../config';

class Camp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      camp: props.camp,
      activeLang: 'ru'
    };

    this.updateCamp = () => {
      const newPrison = this.state.camp.set('updated_at', new Date().toISOString());

      props.updateCamp(newPrison);
    };

    this.deleteCamp = () => props.deleteCamp(props.camp.get('id'));

    this.changeLang = (lang) => {
      this.setState({ activeLang: lang });
    };

    this.updateField = (path, value) => {
      const { camp } = this.state;
      const updatedCamp = camp.setIn(path, value);

      this.setState({ camp: updatedCamp });
    };

    // this.uploadPhotos = (photos) => {
    //   const campId = this.state.camp.get('id');
    //
    //   this.props.dispatch(uploadPhotos(campId, photos));
    // };
    //
    // this.deletePhoto = (photoId) => {
    //   this.props.dispatch(deletePhoto(photoId));
    // };
  }

  render() {
    const { camp, activeLang } = this.state;
    const {
      placesOptions, activitiesOptions, typesOptions, periods
    } = this.props;

    const isPublished = camp.getIn(['published', activeLang]);
    const updatedAt = moment(camp.get('updated_at'))
      .locale('ru')
      .format('DD.MM.YY, HH:mm');

    return (
      <Container>
        <Header
          title={camp.getIn(['title', activeLang])}
          periods={periods}
          updateCamp={this.updateCamp}
          updatedAt={updatedAt}
        />
        <LanguageSwitcher
          languages={languages}
          activeLang={activeLang}
          onChange={this.changeLang}
        />
        <div
          style={{
            gridColumn: 'span 3',
            justifySelf: 'end',
            alignSelf: 'baseline'
          }}
        >
          <Button onClick={this.updateField.bind(null, ['published', activeLang], !isPublished)}>
            {isPublished ? 'Опубликованно' : 'Не опубликованно'}
          </Button>
          <a href={`/camp${camp.get('id')}`}>Посмотреть на карте</a>
        </div>
        <Fieldset>
          <FieldTitle>название лагеря</FieldTitle>
          <TextInput
            value={camp.getIn(['title', activeLang])}
            onChange={this.updateField.bind(null, ['title', activeLang])}
            placeholder='Название'
          />
          <TextInput
            value={camp.getIn(['subTitles', activeLang])}
            onChange={this.updateField.bind(null, ['subTitles', activeLang])}
            placeholder='Дополнительные названия, если есть'
          />
        </Fieldset>
        <Fieldset>
          <FieldTitle>Название локации</FieldTitle>
          <TextInput
            placeholder='Название'
            value={camp.getIn(['location', activeLang])}
            onChange={this.updateField.bind(null, ['location', activeLang])}
          />
        </Fieldset>
        <MarkdownEditor
          source={camp.getIn(['description', activeLang])}
          onChange={this.updateField.bind(null, ['description', activeLang])}
        />
        <MarkdownHelp />
        {/* <FieldTitle>Заметки</FieldTitle>
        <NotesInput note={this.state.note} onChange={this.updateNotes} /> */}
        <Separator>
          <legend>Информация, общая для всех языков</legend>
        </Separator>
        {/* <Photos
          photos={photos}
          uploadHandler={this.uploadPhotos}
          deletePhoto={this.deletePhoto}
        /> */}
        <Fieldset>
          <FieldTitle>Основная деятельность</FieldTitle>
          <SelectInput
            value={camp.get('activityId')}
            options={activitiesOptions}
            clearable={false}
            onChange={({ value }) => this.updateField(['activityId'], value)}
          />
        </Fieldset>
        <Fieldset>
          <FieldTitle>Регион</FieldTitle>
          <SelectInput
            value={camp.get('placeId')}
            options={placesOptions}
            clearable={false}
            onChange={({ value }) => this.updateField(['placeId'], value)}
          />
        </Fieldset>
        <Fieldset>
          <FieldTitle>Тип объекта</FieldTitle>
          <SelectInput
            value={camp.get('typeId')}
            options={typesOptions}
            clearable={false}
            onChange={({ value }) => this.updateField(['typeId'], value)}
          />
        </Fieldset>
        <CampLocation
          features={camp.get('features')}
          updateField={this.updateField}
          updateFeatures={features => this.updateField(['features'], Immutable.fromJS(features))}
        />
        <Button color='red' onClick={this.deleteCamp} style={{ gridColumn: 6, justifySelf: 'end' }}>
          удалить
        </Button>
      </Container>
    );
  }
}

Camp.propTypes = {
  camp: PropTypes.object.isRequired,
  // photos: PropTypes.object.isRequired,
  activitiesOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  placesOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  typesOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateCamp: PropTypes.func.isRequired,
  deleteCamp: PropTypes.func.isRequired,
  periods: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Camp;

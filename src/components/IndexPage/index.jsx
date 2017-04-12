import React, { Component } from 'react';
import styled from 'styled-components';
import { values, isEmpty } from 'ramda';
import { withRouter } from 'react-router-dom';

import Header from './Header';
import Year from './Year';
import ChartButton from './ChartButton';
import Chart from './Chart';
import PrisonCard from './PrisonCard';
import PeriodCard from './PeriodCard';
import Map from './Map';
import PublicRoute from '../PublicRoute';
import { prisonsToFeatures } from '../../utils/utils';

const ChartWrap = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  pointer-events: none;
  z-index: 1;
`;

const data = [
  {
    year: 1918,
    prisoners: 0
  },
  {
    year: 1919,
    prisoners: 0
  },
  {
    year: 1920,
    prisoners: 0
  },
  {
    year: 1921,
    prisoners: 0
  },
  {
    year: 1922,
    prisoners: 0
  },
  {
    year: 1923,
    prisoners: 0
  },
  {
    year: 1924,
    prisoners: 0
  },
  {
    year: 1925,
    prisoners: 0
  },
  {
    year: 1926,
    prisoners: 0
  },
  {
    year: 1927,
    prisoners: 0
  },
  {
    year: 1928,
    prisoners: 0
  },
  {
    year: 1929,
    prisoners: 0
  },
  {
    year: 1930,
    prisoners: 230440
  },
  {
    year: 1931,
    prisoners: 276691
  },
  {
    year: 1932,
    prisoners: 288180
  },
  {
    year: 1933,
    prisoners: 553765
  },
  {
    year: 1934,
    prisoners: 344331
  },
  {
    year: 1935,
    prisoners: 542571
  },
  {
    year: 1936,
    prisoners: 523746
  },
  {
    year: 1937,
    prisoners: 828570
  },
  {
    year: 1938,
    prisoners: 537523
  },
  {
    year: 1939,
    prisoners: 405221
  },
  {
    year: 1940,
    prisoners: 1050178
  },
  {
    year: 1941,
    prisoners: 1198139
  },
  {
    year: 1942,
    prisoners: 1566479
  },
  {
    year: 1943,
    prisoners: 1344507
  },
  {
    year: 1944,
    prisoners: 1186297
  },
  {
    year: 1945,
    prisoners: 941684
  },
  {
    year: 1946,
    prisoners: 1109779
  },
  {
    year: 1947,
    prisoners: 1519494
  },
  {
    year: 1948,
    prisoners: 1161233
  },
  {
    year: 1949,
    prisoners: 1086000
  },
  {
    year: 1950,
    prisoners: 858477
  },
  {
    year: 1951,
    prisoners: 699132
  },
  {
    year: 1952,
    prisoners: 671100
  },
  {
    year: 1953,
    prisoners: 533270
  },
  {
    year: 1954,
    prisoners: 443554
  },
  {
    year: 1955,
    prisoners: 432673
  },
  {
    year: 1956,
    prisoners: 506599
  },
  {
    year: 1957,
    prisoners: 0
  },
  {
    year: 1958,
    prisoners: 0
  },
  {
    year: 1959,
    prisoners: 0
  },
  {
    year: 1960,
    prisoners: 0
  }
];

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLanguage: 'ru',
      currentYear: 1918,
      currentPrisons: [],
      prisonCardVisibility: false,
      periodCardVisibility: false,
      isDemoPlayed: false
    };
    this.demo = this.demo.bind(this);
    this.setYear = this.setYear.bind(this);
    this.openPrisonCard = this.openPrisonCard.bind(this);
    this.openPeriodCard = this.openPeriodCard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const prisons = values(nextProps.prisons);
    const filteredPrisons = prisons.filter(prison => prison.published[this.state.currentLanguage]);

    this.setState({ currentPrisons: filteredPrisons });
  }

  setYear(year) {
    this.setState({ currentYear: year });
  }

  demo() {
    const { isDemoPlayed } = this.state;
    this.setState({ isDemoPlayed: !isDemoPlayed });

    if (isDemoPlayed) {
      clearInterval(this.playDemo);
    } else {
      this.playDemo = setInterval(() => {
        if (this.state.currentYear < 1960) {
          this.setYear(this.state.currentYear + 1);
        } else clearInterval(this.playDemo);
      }, 1000);
    }
  }

  openPrisonCard(prisonId) {
    this.props.history.push(`/prison${prisonId}`);
  }

  closePrisonCard() {
    this.props.history.push('/');
  }

  openPeriodCard(periodId) {
    this.setState({ currentPeriod: periodId }, () => {
      this.props.history.push(`/period${periodId}`);
    });
  }

  closePeriodCard() {
    this.props.history.push('/');
  }

  render() {
    const { periods, prisons } = this.props;
    const { currentYear, currentPrisons, currentLanguage, isDemoPlayed } = this.state;

    const features = prisonsToFeatures(currentPrisons, currentYear);

    const PrisonCardWithRouter = withRouter(({ match }) => (
      <PrisonCard
        visible
        prison={!isEmpty(prisons) && prisons[match.params.prisonId]}
        closeCard={this.closePrisonCard.bind(this)}
        currentLanguage={currentLanguage}
      />
    ));

    const PeriodCardWithRouter = withRouter(({ match }) => (
      <PeriodCard
        visible
        period={!isEmpty(periods) && periods[match.params.periodId]}
        currentLanguage={currentLanguage}
        closeCard={this.closePeriodCard.bind(this)}
      />
    ));

    return (
      <div>
        <Header
          currentYear={currentYear}
          currentPrisons={currentPrisons}
        />
        <Year>{ currentYear }</Year>
        <ChartWrap>
          <ChartButton
            isDemoPlayed={isDemoPlayed}
            onClick={this.demo}
          />
          <Chart
            data={data}
            periods={periods}
            currentYear={currentYear}
            setYear={this.setYear}
            openPeriod={this.openPeriodCard}
          />
          <ChartButton />
        </ChartWrap>
        <Map
          features={features}
          openCard={this.openPrisonCard}
          currentYear={currentYear}
        />
        <PublicRoute path='/prison:prisonId' component={PrisonCardWithRouter} />
        <PublicRoute path='/period:periodId' component={PeriodCardWithRouter} />
      </div>
    );
  }
}

export default withRouter(IndexPage);

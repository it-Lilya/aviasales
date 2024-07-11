import React, { useEffect, useState } from 'react';
import classes from './App.module.scss';
import LeftColumn from '../LeftColumn/LeftColumn';
import RightColumn from '../RightColumn/RightColumn';
import * as actions from '../../store/actions';
import { connect, useDispatch, useSelector  } from "react-redux";
import { bindActionCreators } from "redux";
import { data } from '../data';

function App({cheap, fast, optimal, all, no, one, two, third, none}) {
  const [searchId, setSearchId] = useState();
  const [tickets, setTickets] = useState([]);
  const [sortTickets, setSortTickets] = useState([]);
  const [flag, setFlag] = useState(false);
  const [transplants, setTransplants] = useState('all');
  const [filters, setFilters] = useState('cheap');
  const [y, sY] = useState(data);
  const sortData = useSelector(state => state.tickets);
  const [t, sT] = useState();
  useEffect(() => {
    sY(sortData);
  })
  useEffect(() => {
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('id', JSON.stringify(data.searchId));
        setSearchId(data.searchId);
      });

    document.querySelectorAll('input').forEach((e) => {
      e.checked = true;
      e.classList.add('check');
    });
  }, []);
  useEffect(() => {
      setSortTickets(tickets.slice(0, 5));
      localStorage.setItem('sort', JSON.stringify(tickets.slice(0, 5)));
  }, [flag]);
  useEffect(() => {
    let arr = [];
    if (searchId && flag === false) {
      // function subscribe() {
      //   fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
      //     .then((res) => {
      //       if (res.status === 500) {
      //         subscribe();
      //         return
      //       } else {
      //         return res.json();
      //       }
      //     })
      //     .then((data) => {
      //       if (data) {
      //         setFlag(data.stop);
      //         arr.push(data.tickets);
      //         if (!sortTickets) {
      //           setSortTickets(data.tickets.slice(0, 5));
      //         }
      //         if (!data.stop) {
      //           subscribe();
      //         } else {
      //           setTickets(arr.flat());
      //           localStorage.setItem('tickets', JSON.stringify(arr.flat()));
      //         }
      //       }
            
      //     })
      // }
      // subscribe();
    }
  }, [searchId]);
  function putChecked(e) {
    let arr = [];
    let transplantsArr = [];
    let arrCheck= [];
    let current;
    if (e.target.tagName === 'LI') {
      current = e.target.querySelector('input');
    } else {
      current = e.target;
    }

    const inputs = document.querySelectorAll('.input');
    if (!current.checked) {
      if (current.value === 'all') {
        inputs.forEach((el) => el.checked = current.checked);
        document.querySelectorAll('input').forEach((e) => {
          e.checked = false;
          e.classList.remove('check');
        });
      } else {
        if ([inputs].find((y) => !y.checked)) {
          document.querySelector('.input__all').checked = current.checked;
          document.querySelector('.input__all').classList.remove('check');
        }
      }
      current.checked = false;
      current.classList.remove('check');
    } else {
      if (current.value === 'all') {
        inputs.forEach((el) => el.checked = current.checked);
        document.querySelectorAll('input').forEach((e) => {
          e.checked = true;
          e.classList.add('check');
        });
      } else {
        if (![inputs].find((y) => !y.checked)) {
          document.querySelector('.input__all').checked = true;
          document.querySelector('.input__all').classList.add('check');
        }
      }
      current.checked = true;
      current.classList.add('check');
    }
    inputs.forEach((el) => {
      if (el.checked) {
        arr.push(el.value)
        transplantsArr.push(el.value);
      }
    });
    if (arr.length === 4) {
      document.querySelector('.input__all').checked = true; 
      document.querySelector('.input__all').classList.add('check');
    }
    if (arr.length === 5) {
      transplantsArr = [];
      transplantsArr.push('all');
    }
    setTransplants(transplantsArr);
    document.querySelectorAll('.check').forEach((el) => {
      if (arrCheck.length === 4 && !arrCheck.find((e) => e == 'all')) {
        arrCheck = ['all']
      } else {
        arrCheck.push(el.className.split(' ')[1])
      }
     })
    if (document.querySelector('.input__all').checked === true) {
      arrCheck = ['all']
      all(data);
    } else if (document.querySelector('.no_transfers').checked === true) {
      no(data, arrCheck);
    } else if (document.querySelector('.one_transfers').checked === true) {
      one(data, arrCheck);
    } else if (document.querySelector('.two_transfers').checked === true) {
      two(data, arrCheck);
    } else if (document.querySelector('.third_transfers').checked === true) {
      third(data, arrCheck)
    }
   
    arrCheck.forEach((el) => {
      switch (el) {
        case 'one_transfers':
            one(data, arrCheck);
          break;
        case 'two_transfers':
          two(data, arrCheck);
          break;
        case 'third_transfers':
          third(data, arrCheck);
          break;
        case 'all':
          all(data);
          break;
        case 'no_transfers':
          no(data, arrCheck);
          break;
        default:
          break;
      }
    })
    if (!arrCheck.length) {
      none();
    }
  }
  function sorterHandler(e, classes) {
    if (e.target.classList.contains('cheap')) {
      cheap();
    } else if (e.target.classList.contains('fast')) {
      fast();
    } else {
      optimal();
    }
    let nameClass = e.target.className.split(' ')[0];
    document.querySelectorAll('.filter').forEach((el) => {
      el.classList.remove(classes);
    })
    e.target.classList.add(classes);
    setFilters(nameClass);
  
  }
  return (
    <div className={classes.App}>
      <div className={classes.container}>
        <div className={classes.logo}></div>
        <div className={classes.columns}>
          <LeftColumn putChecked={putChecked}/>
          <RightColumn data={y} sorterHandler={sorterHandler} />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    tickets: state.tickets
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;

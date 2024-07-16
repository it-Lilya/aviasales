import React, { useEffect, useState, useRef } from 'react';
import classes from './App.module.scss';
import LeftColumn from '../LeftColumn/LeftColumn';
import RightColumn from '../RightColumn/RightColumn';
import * as actions from '../../store/actions';
import {fetchDataRequest} from '../../store/actions';
import { connect, useDispatch, useSelector  } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchData } from '../../store/asyncAction';

queueMicrotask(() => {
  fetch('https://aviasales-test-api.kata.academy/search')
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem('id', JSON.stringify(data.searchId));
    });
})

function App({cheap, fast, optimal, all, no, one, two, third, none, toggle}) {
  const [filters, setFilters] = useState('cheap');
  const [tickets, setTickets] = useState([]);
  const sortData = useSelector(state => state.tickets);
  const loaded = useSelector(state => state.isLoading);
  const [limit, setLimit] = useState(5);
  const [arr, setArr] = useState(['all']);
  const progressBar = useRef(null);
  const loaderRef = useRef(0);
  const dispatch = useDispatch();
  const [intervals, setIntervals] = useState();
  const [loadedState, setLoadedState] = useState(loaded);
  useEffect(() => {
    setTickets(sortData);
  });

  useEffect(() => {
    dispatch(fetchDataRequest());
    setTimeout(() => {
      dispatch(fetchData(`https://aviasales-test-api.kata.academy/tickets?searchId=${JSON.parse(localStorage.getItem('id'))}`));
    }, 100);
    setIntervals(() => setInterval(() => increase() , 100))
    setLoadedState(loaded);
  }, []);
  useEffect(() => {
    document.querySelectorAll('input').forEach((e) => {
      e.checked = true;
      e.classList.add('check');
    });
  }, []);
  useEffect(() => {
    if (filters === 'cheap') {
      cheap(limit);
    } else if (filters === 'fast') {
      fast(limit);
    } else {
      optimal(limit);
    }
  }, [limit]);
  useEffect(() => {
    if (loaded === false) {
      loaderRef.current = 100;
      setTimeout(() => {
        setIntervals(clearInterval(intervals));
        setLoadedState(false);
      }, 1000);
    }
  }, [loaded])
  function increase() {
    if (loaderRef.current <= 100) {
      loaderRef.current = loaderRef.current + 1.2;
      if (progressBar.current) {
        progressBar.current.style.width = `${loaderRef.current}%`;
      }
    } else {
      setTimeout(() => {
        setIntervals(clearInterval(intervals));
        setLoadedState(false);
      }, 350)
    }
    return loaderRef.current
  }
  function putChecked(e) {
    let arr = [];
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
      }
    });
    if (arr.length === 4) {
      document.querySelector('.input__all').checked = true; 
      document.querySelector('.input__all').classList.add('check');
    }
    document.querySelectorAll('.check').forEach((el) => {
      if (arrCheck.length === 4 && !arrCheck.find((e) => e == 'all')) {
        arrCheck = ['all']
      } else {
        arrCheck.push(el.className.split(' ')[1])
      }
     })

     const dataTickets = JSON.parse(localStorage.getItem('tickets'));
     if (arrCheck.length === 0) {
      arrCheck = ['none'];
      none(dataTickets, arrCheck);
    }
    if (current.checked === true) {
      if (current.classList.contains('input__all')) {
        all(arrCheck, dataTickets, limit);
      } else if (current.classList.contains('no_transfers')) {
        no(arrCheck, dataTickets, limit);
      } else if (current.classList.contains('one_transfers')) {
        one(arrCheck, dataTickets, limit);
      } else if (current.classList.contains('two_transfers')) {
        two(arrCheck, dataTickets, limit);
      } else if (current.classList.contains('third_transfers')) {
        third(arrCheck, dataTickets, limit)
      } 
    }
    if (current.checked !== true && current.value !== 'all') {
      toggle(dataTickets, arrCheck, current.className.split(' ')[1]);
    }
    setArr(arrCheck);
  }
  function sorterHandler(e, classes) {
    if (tickets.length) {
      if (e.target.classList.contains('cheap')) {
        setFilters('cheap');
        cheap(limit, tickets);
      } else if (e.target.classList.contains('fast')) {
        setFilters('fast');
        fast(limit, tickets);
      } else {
        setFilters('optimal');
        optimal(limit, tickets);
      }
      document.querySelectorAll('.filter').forEach((el) => {
        el.classList.remove(classes);
      })
      e.target.classList.add(classes);
    }
  }
  function limits() {
    if (arr[0] !== 'none') {
      setLimit(limit + 5);
    }
  }
  return (
    <div className={classes.App}>
      {loadedState ? 
      (<div className="progress" style={{height: '10px', borderRadius: '0px', position: 'absolute', width: '100%', top: '0px', zIndex: '2'}}>
          <div ref={progressBar} role="progressbar" className="progress-bar progress-bar-animated progress-bar-striped" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}></div>
        </div>) : null} 
      <div className={classes.container}>
        <div className={classes.logo}></div>
        <div className={classes.columns}>
          <LeftColumn putChecked={putChecked}/>
          <RightColumn data={tickets} sorterHandler={sorterHandler} limits={limits} arr={arr} />
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

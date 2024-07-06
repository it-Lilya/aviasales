import React, { useEffect, useState } from 'react';
import classes from './App.module.scss';
import LeftColumn from '../LeftColumn/LeftColumn';
import RightColumn from '../RightColumn/RightColumn';
import * as actions from '../redux/actions';
import { bindActionCreators } from "redux";
import { connect  } from "react-redux";

function App({ data, all }) {
  const [searchId, setSearchId] = useState();
  const [tickets, setTickets] = useState([]);
  const [sortTickets, setSortTickets] = useState([]);
  const [flag, setFlag] = useState(false);
  const [transplants, setTransplants] = useState('all');
  const [filters, setFilters] = useState('cheap');
  useEffect(() => {
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((res) => res.json())
      .then((data) => setSearchId(data.searchId));

    document.querySelectorAll('input').forEach((e) => e.checked = true);
  }, []);
  useEffect(() =>   console.log(data), [tickets])

  useEffect(() => {
    if (flag) {
      setSortTickets(tickets.slice(0, 5));
    }
  }, [flag])
  // useEffect(() => {
  //   // console.log(transplants)
  // }, [transplants])
  useEffect(() => {
    let arr = [];
    if (searchId && flag === false) {
      function subscribe() {
        fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
          .then((res) => {
            if (res.status === 500) {
              subscribe();
              return
            } else {
              return res.json();
            }
          })
          .then((data) => {
            if (data) {
              setFlag(data.stop);
              arr.push(data.tickets);
              if (!sortTickets) {
                setSortTickets(data.tickets.slice(0, 5));
              }
              if (!data.stop) {
                subscribe();
              } else {
                setTickets(arr.flat());
                localStorage.setItem('tickets', JSON.stringify(arr.flat()));
              }
            }
            
          })
      }
      subscribe();
    }
  }, [searchId]);
  function putChecked(e) {
    let arr = [];
    let transplantsArr = [];
    let current;
    if (e.target.tagName === 'LI') {
      current = e.target.querySelector('input');
    } else {
      current = e.target;
    }

    const inputs = document.querySelectorAll('.input');
    if (!current.checked) {
      if (current.value === 'all') {
        all();
        inputs.forEach((el) => el.checked = current.checked);
      } else {
        if ([inputs].find((y) => !y.checked)) {
          document.querySelector('.input__all').checked = current.checked;
        }
      }
      current.checked = false;
    } else {
      if (current.value === 'all') {
        inputs.forEach((el) => el.checked = current.checked);
      } else {
        if (![inputs].find((y) => !y.checked)) {
          document.querySelector('.input__all').checked = true;
        }
      }
      current.checked = true;
    }
    inputs.forEach((el) => {
      if (el.checked) {
        arr.push(el.value)
        transplantsArr.push(el.value);
      }
    });
    if (arr.length === 4) {
      document.querySelector('.input__all').checked = true; 
    }
    if (arr.length === 5) {
      transplantsArr = [];
      transplantsArr.push('all');
    }
    setTransplants(transplantsArr);
  }
  function sorterHandler(e, classes) {
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
          <RightColumn sortTickets={sortTickets} sorterHandler={sorterHandler}/>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    data: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

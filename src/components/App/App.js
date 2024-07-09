import React, { useEffect, useState } from 'react';
import classes from './App.module.scss';
import LeftColumn from '../LeftColumn/LeftColumn';
import RightColumn from '../RightColumn/RightColumn';
import * as actions from '../redux/actions';
// import { sortByName, usersLoaded } from '../redux/actions';
// import { bindActionCreators } from "redux";
import { connect  } from "react-redux";
import { useDispatch } from 'react-redux';
// import { fetchGoods } from '../redux/ticketsSlice';
// import { fetchData } from '../redux/actions';
// import {usersLoaded, sortByName} from './actions';
import { bindActionCreators } from "redux";
import { data } from '../data';

function App({datas, cheap, fast, optimal}) {
  // console.log(fast);
  const dispatch = useDispatch();
  const [searchId, setSearchId] = useState();
  const [tickets, setTickets] = useState([]);
  const [sortTickets, setSortTickets] = useState([]);
  const [flag, setFlag] = useState(false);
  const [transplants, setTransplants] = useState('all');
  const [filters, setFilters] = useState('cheap');
  const [y, sY] = useState(data);
  useEffect(() => {
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('id', JSON.stringify(data.searchId));
        setSearchId(data.searchId);
      });

    document.querySelectorAll('input').forEach((e) => e.checked = true);
  }, []);
  useEffect(() => {
    // dispatch(cheap);
  }, [dispatch])
  useEffect(() => {
    if (flag) {
      setSortTickets(tickets.slice(0, 5));
      localStorage.setItem('sort', JSON.stringify(tickets.slice(0, 5)));

    }
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
    if (e.target.classList.contains('cheap')) {
      cheap();
      // dispatch(cheap);
      console.log(datas)
      // sY(dispatch(cheap).payload);
    } else if (e.target.classList.contains('fast')) {
      fast();
      // sY(dispatch(fast).payload);
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
          {/* <RightColumn sortTickets={sortTickets} sorterHandler={sorterHandler}/> */}
          <RightColumn data={y} sorterHandler={sorterHandler} />
        </div>
      </div>
    </div>
  );
}
// const mapStateToProps = (state) => {
//   console.log(state);
//   return {
//     data: state.persons
//   }
// };
// const mapDispatchToProps = {
//   usersLoaded,
//   sortByName
// };
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(actions, dispatch);
// };
const mapStateToProps = (state) => {

  // dispatch(state.datas)
  return {
    datas: state.datas
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

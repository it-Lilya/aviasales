import React, { useEffect, useState } from 'react';
import classes from './App.module.scss';
import LeftColumn from '../LeftColumn/LeftColumn';
import RightColumn from '../RightColumn/RightColumn';
import * as actions from '../../store/actions';
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
  const [copyData, setCopyData] = useState([]);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [arr, setArr] = useState(['all']);
  const dispatch = useDispatch();

  useEffect(() => {
    setTickets(sortData);
  })
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchData());
    }, 100);
  }, []);
  useEffect(() => {
    setCopyData(sortData);
  }, [sortData])
  useEffect(() => {
    // fetch('https://aviasales-test-api.kata.academy/search')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     localStorage.setItem('id', JSON.stringify(data.searchId));
    //     setSearchId(data.searchId);
    //   });

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
  }, [limit])
  // useEffect(() => {
  //     // setSortTickets(tickets.slice(0, 5));
  //     // localStorage.setItem('sort', JSON.stringify(tickets.slice(0, 5)));
  // }, [flag]);
  // useEffect(() => {
  //   let arr = [];
  //   if (searchId && flag === false) {
  //     // function subscribe() {
  //     //   fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
  //     //     .then((res) => {
  //     //       if (res.status === 500) {
  //     //         subscribe();
  //     //         return
  //     //       } else {
  //     //         return res.json();
  //     //       }
  //     //     })
  //     //     .then((data) => {
  //     //       if (data) {
  //     //         setFlag(data.stop);
  //     //         arr.push(data.tickets);
  //     //         if (!sortTickets) {
  //     //           setSortTickets(data.tickets.slice(0, 5));
  //     //         }
  //     //         if (!data.stop) {
  //     //           subscribe();
  //     //         } else {
  //     //           setTickets(arr.flat());
  //     //           localStorage.setItem('tickets', JSON.stringify(arr.flat()));
  //     //         }
  //     //       }
            
  //     //     })
  //     // }
  //     // subscribe();
  //   }
  // }, [searchId]);
  function putChecked(e) {
    let arr = [];
    let arrCheck= [];
    let current;
    setData(JSON.parse(localStorage.getItem('tickets')).slice(0, 5))
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
    } else {
      arrCheck.forEach((el) => {
        switch (el) {
          case 'one_transfers':
            one(arrCheck, dataTickets, limit);
            break;
          case 'two_transfers':
            two(arrCheck, dataTickets, limit);
            break;
          case 'third_transfers':
            third(arrCheck, dataTickets, limit)
            break;
          case 'all':
            all(arrCheck, dataTickets, limit);
            break;
          case 'no_transfers':
            no(arrCheck, dataTickets, limit);
            break;
      }
    })
    }
    if (current.checked !== true && current.value !== 'all') {
      // if (!current.classList.contains('input__all')) {
      //   // toggle(dataTickets, current.className.split(' ')[1]);
      //   console.log('a')
      //   arrCheck.push('toggle')
      // }
      // arrCheck
     toggle(dataTickets, arrCheck, current.className.split(' ')[1]);
    } else if (current.checked === true) {
      //  if (current.classList.contains('input__all')) {
      //   all(arrCheck, dataTickets, limit);
      // } else if (current.classList.contains('no_transfers')) {
      //   no(arrCheck, dataTickets, limit);
      // } else if (current.classList.contains('one_transfers')) {
      //   one(arrCheck, dataTickets, limit);
      // } else if (current.classList.contains('two_transfers')) {
      //   two(arrCheck, dataTickets, limit);
      // } else if (current.classList.contains('third_transfers')) {
      //   third(arrCheck, dataTickets, limit)
      // } 
    }
    // arrCheck.forEach((el) => {
    //     switch (el) {
    //       case 'one_transfers':
    //         one(arrCheck, dataTickets, limit);
    //         break;
    //       case 'two_transfers':
    //         two(arrCheck, dataTickets, limit);
    //         break;
    //       case 'third_transfers':
    //         third(arrCheck, dataTickets, limit)
    //         break;
    //       case 'all':
    //         all(arrCheck, dataTickets, limit);
    //         break;
    //       case 'no_transfers':
    //         no(arrCheck, dataTickets, limit);
    //         break;
    //   }
    // })
    setArr(arrCheck);
  }
  // useEffect(() => {
  // } , [tickets])
  function sorterHandler(e, classes) {
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
    // let nameClass = e.target.className.split(' ')[0];
    document.querySelectorAll('.filter').forEach((el) => {
      el.classList.remove(classes);
    })
    e.target.classList.add(classes);
    // setFilters(nameClass);
  }
  function limits() {
    if (arr[0] !== 'none') {
      setLimit(limit + 5);
    }
    
  }
  return (
    <div className={classes.App}>
      <div className={classes.container}>
        <div className={classes.logo}></div>
        <div className={classes.columns}>
          <LeftColumn putChecked={putChecked}/>
          <RightColumn data={tickets} sorterHandler={sorterHandler} limits={limits} />
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

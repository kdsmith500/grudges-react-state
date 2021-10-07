import React, { useReducer, useCallback } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

// saving strings as constants instead of just using strings will provide more useful errors
const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

// reducers are easy to unit test because they abstract state away from the component to the reducer
const reducer = (state, action) => {
  if (action.type === GRUDGE_ADD) {
    return [action.payload, ...state];
  }

  if (action.type === GRUDGE_FORGIVE) {
    return state.map(grudge => {
      if (grudge.id !== action.payload.id) return grudge;
      return { ...grudge, forgiven: !grudge.forgiven };
    })
  }

  return state;
}

const Application = () => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = useCallback(({ person, reason }) => {
    dispatch({
      type: GRUDGE_ADD,
      payload: {
        person,
        reason,
        forgiven: false,
        id: id()
      }
    });
  }, [dispatch]);

  const toggleForgiveness = useCallback(id => {
    dispatch({
      type: GRUDGE_FORGIVE,
      payload: { id }
    });
  }, [dispatch]);

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;

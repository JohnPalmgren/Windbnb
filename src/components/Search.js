import { Fragment, useState, useReducer } from "react";
import classes from "./Search.module.css";
import SearchIcon from "@material-ui/icons/Search";

const Search = (props) => {
  const [clicked, setClicked] = useState(false);

  const guestReducer = (state, action) => {

    if (action.type === "ADD_ADULT") {
      return (state = { guests: state.guests + 1, adults: state.adults + 1, children: state.children });
    }
    if (action.type === "REMOVE_ADULT") {
      if (state.adults < 1) {
        return {
          guests: state.guests,
          adults: state.adults,
          children: state.children
        };
      }
      return (state = { guests: state.guests - 1, adults: state.adults - 1, children: state.children });
    }
    if (action.type === "ADD_CHILD") {
      return (state = {
        guests: state.guests + 1,
        adults: state.adults,
        children: state.children + 1,
      });
    }
    if (action.type === "REMOVE_CHILD") {
      if (state.children < 1) {
        return {
          guests: state.guests,
          adults: state.adults,
          children: state.children,
        };
      }
      return (state = {
        guests: state.guests - 1,
        adults: state.adults,
        children: state.children - 1,
      });
    }
  };

  const [guestState, dispatchGuest] = useReducer(guestReducer, {
    guests: 0,
    adults: 0,
    children: 0,
  });

  const expandForm = () => {
    setClicked(true);
  };

  const contractForm = () => {
    setClicked(false);
  };

  let locations = [];
  let locationCheck = [];

  for (let i of props.propertyData) {
    if (!locationCheck.includes(i["city"])) {
      locations.push(`${i["city"]}, ${i["country"]}`);
      locationCheck.push(i["city"]);
    }
  }

  const addAdult = () => {
    dispatchGuest({ type: "ADD_ADULT" });
  };

  const removeAdult = () => {
    dispatchGuest({ type: "REMOVE_ADULT" });
  };

  const addChild = () => {
    dispatchGuest({ type: "ADD_CHILD" });
  };

  const removeChild = () => {
    dispatchGuest({ type: "REMOVE_CHILD" });
  };

  return (
    <Fragment>
      <div
        onClick={expandForm}
        className={clicked ? classes.expandedForm : classes.form}
      >
        <div className={classes.input}>{locations[0]}</div>
        <div className={classes.input}>
          {guestState.guests < 1 ? "Add guests" : guestState.guests}
        </div>
        <div className={classes.buttonWrapper}>
          <button className={clicked ? classes.expandedButton : classes.button}>
            <SearchIcon className={classes.icon} />
            {clicked ? <span className={classes.text}>Search</span> : null}
          </button>
        </div>
      </div>
      <div className={clicked ? classes.expandedWrapper : classes.hidden}>
        <div className={classes.expandedItems}>
          <ul>
            {locations.map((item) => {
              return <li>{item}</li>;
            })}
          </ul>
        </div>
        <div className={classes.expandedItems}>
          <span>Adults </span>
          <span>
            <br /> Ages 13 and above <br />
          </span>
          <button onClick={removeAdult}>-</button>
          <div className={classes.number}>{guestState.adults}</div>
          <button onClick={addAdult}>+</button>

          <span>
            <br /> Children
          </span>
          <span>
            <br /> 2-12 <br />
          </span>
          <button onClick={removeChild}>-</button>
          <div className={classes.number}>{guestState.children}</div>
          <button onClick={addChild}>+</button>
        </div>
        <div className={classes.expandedItems}></div>
      </div>

      {clicked ? (
        <div onClick={contractForm} className={classes.backdrop}></div>
      ) : (
        <div></div>
      )}
    </Fragment>
  );
};

export default Search;

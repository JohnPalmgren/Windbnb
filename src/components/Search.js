import { Fragment, useState, useReducer } from "react";
import classes from "./Search.module.css";
import SearchIcon from "@material-ui/icons/Search";
import Pin from "@material-ui/icons/Place";

const Search = (props) => {
  const [clicked, setClicked] = useState(false);
  const [currentLocation, setCurrentLocation] = useState();

  const guestReducer = (state, action) => {
    if (action.type === "ADD_ADULT") {
      return (state = {
        guests: state.guests + 1,
        adults: state.adults + 1,
        children: state.children,
      });
    }
    if (action.type === "REMOVE_ADULT") {
      if (state.adults < 1) {
        return {
          guests: state.guests,
          adults: state.adults,
          children: state.children,
        };
      }
      return (state = {
        guests: state.guests - 1,
        adults: state.adults - 1,
        children: state.children,
      });
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
    if (!clicked) {
      setClicked(true);
    }
  };

  const contractForm = () => {
    setClicked(false);
  };

  let allLocations = [];
  let locationCheck = [];

  for (let i of props.propertyData) {
    if (!locationCheck.includes(i["city"])) {
      allLocations.push(`${i["city"]}, ${i["country"]}`);
      locationCheck.push(i["city"]);
    }
  }

  const addAdult = () => {
    dispatchGuest({ type: "ADD_ADULT" });
    props.changeGuests(guestState.guests);
  };

  const removeAdult = () => {
    dispatchGuest({ type: "REMOVE_ADULT" });
    props.changeGuests(guestState.guests);
  };

  const addChild = () => {
    dispatchGuest({ type: "ADD_CHILD" });
    props.changeGuests(guestState.guests);
  };

  const removeChild = () => {
    dispatchGuest({ type: "REMOVE_CHILD" });
    props.changeGuests(guestState.guests);
  };

  const changeLocation = (location) => {
    setCurrentLocation(location);
    props.changeLocation(location);
  };

  return (
    <Fragment>
      <div
        onClick={expandForm}
        className={clicked ? classes.expandedForm : classes.form}
      >
        {!currentLocation ? (
          <div className={classes.inputGrey}>Add location</div>
        ) : (
          <div className={classes.input}>{currentLocation}</div>
        )}
        {guestState.guests < 1 ? (
          <div className={classes.inputGrey}>Add guests</div>
        ) : (
          <div className={classes.input}> {guestState.guests}</div>
        )}
        <div className={classes.buttonWrapper}>
          <button
            onClick={contractForm}
            className={clicked ? classes.expandedButton : classes.button}
          >
            <SearchIcon className={classes.icon} />
            {clicked ? <span className={classes.text}>Search</span> : null}
          </button>
        </div>
      </div>
      <div className={clicked ? classes.expandedWrapper : classes.hidden}>
        <div className={classes.expandedItems}>
          <ul className={classes.list}>
            {allLocations.map((item) => {
              return (
                <div>
                  <Pin />
                  <li
                    className={classes.listItem}
                    onClick={changeLocation.bind(this, item)}
                    key={item}
                  >
                    {item}
                  </li>
                </div>
              );
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

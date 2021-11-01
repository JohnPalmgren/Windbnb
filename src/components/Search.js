import { Fragment, useState } from "react";
import classes from "./Search.module.css"
import SearchIcon from "@material-ui/icons/Search";


const Search = (props) => {
  const [clicked, setClicked] = useState(false)
  const [userInput, setUserInput] = useState("")


  const expandForm = () => {
    setClicked(true);
  }

  const contractForm = () => {
        setClicked(false);
  }
  // const inputHandler = (event) => {
  //   setUserInput(event.target.value);
  // }

  let locations = []
  let locationCheck = [];

  for (let i of props.propertyData) {
    if (!locationCheck.includes(i["city"])) {
      locations.push(`${i["city"]}, ${i["country"]}`);
      locationCheck.push(i["city"]);
    }
  }

    return (
      <Fragment>
        <div
          onClick={expandForm}
          className={clicked ? classes.expandedForm : classes.form}
        >
          <div className={classes.input}>{locations[0]}</div>
          <div className={classes.input}>Add guests</div>
          <div className={classes.buttonWrapper}>
            <button
              className={clicked ? classes.expandedButton : classes.button}
            >
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
          <div className={classes.expandedItems}>guests</div>
          <div className={classes.expandedItems}>placeholder</div>
        </div>

        {clicked ? (
          <div onClick={contractForm} className={classes.backdrop}></div>
        ) : (
          <div></div>
        )}

        {/* <form
          onClick={expandForm}
          className={clicked ? classes.expandedForm : classes.form}
        >
          <input
            onChange={inputHandler}
            className={classes.input}
            type="text"
            placeholder="Location"
          />
          <input
            className={classes.input}
            type="number"
            placeholder="Add guests"
          />
          <div className={classes.buttonWrapper}>
            <button
              className={clicked ? classes.expandedButton : classes.button}
            >
              <SearchIcon className={classes.icon} />
              {clicked ? <span className={classes.text}>Search</span> : null}
            </button>
          </div>
        </form> */}
      </Fragment>
    );
}

export default Search
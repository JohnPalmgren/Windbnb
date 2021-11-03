import Property from "./Property";
import classes from "./Properties.module.css";

const Properties = (props) => {
  const location = props.location;
  const numOfGuests = props.numOfGuests;
  const data = props.propertyData;
  let filtered = [];

  for (let property of data) {
    if (
      property.maxGuests >= numOfGuests &&
      `${property["city"]}, ${property["country"]}` === location
    ) {
      filtered.push(property);
    }
  }

  if (filtered.length === 0) {
    filtered = [...props.propertyData]
  }

  return (
    <div className={classes.wrapper}>
      {filtered.map((obj) => {
        return (
          <Property
            key={Math.random()}
            superHost={obj.superHost}
            type={obj.type}
            beds={obj.beds}
            rating={obj.rating}
            title={obj.title}
            image={obj.photo}
          />
        );
      })}
    </div>
  );
};

export default Properties;

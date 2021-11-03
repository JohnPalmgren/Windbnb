import classes from "./Property.module.css"
import Star from "@material-ui/icons/Star";


const Property = (props) => {

  const beds = props.beds > 0
  const superHost = props.superHost

    return (
      <div className={classes.wrapper}>
        <div
          style={{ backgroundImage: `url(${props.image})` }}
          className={classes.image}
        ></div>
        {superHost ? (
          <div className={classes.host}>SUPER HOST</div>
        ) : (
          <div></div>
        )}
        <div className={classes.description}>{props.type}</div>
        {beds ? (
          <div className={classes.description}>{props.beds} beds</div>
        ) : (
          <div></div>
        )}
        <div className={classes.ratingWrapper}>
          <Star className={classes.star} />
          <div className={classes.rating}>{props.rating}</div>
        </div>
        <div className={classes.title}>{props.title}</div>
      </div>
    );
}

export default Property
import Property from "./Property"
import classes from "./Properties.module.css"

const Properties = (props) => {
    const location = props.location
    const numOfGuests = props.guests 
    const data = props.propertyData
    const filtered = data
    return (
        <div className={classes.wrapper}>
        {filtered.map((obj) => {
            return (
            <Property
            superHost={obj.superHost}
            type={obj.type}
            beds={obj.beds}
            rating={obj.rating}
            title={obj.title}
            image={obj.photo}
            />
            )
        })}
        </div>
        )
}

export default Properties
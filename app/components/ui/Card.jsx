import classes from './Card.module.css';

const Card = (props) => {
    const classNames = `${classes.card} ${(props.className ? props.className : undefined)}`;
    return <div className={classNames}>{props.children}</div>
};

export default Card;

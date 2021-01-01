import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const Commentitem = ({ name, description}) => {
return (
    <tr className="tr">
        <td className="t1"><AccountCircleIcon></AccountCircleIcon></td>
        <td className="t2">{name}</td>
        <td className="t3">{description}</td>
    </tr>
)
}

export default Commentitem;

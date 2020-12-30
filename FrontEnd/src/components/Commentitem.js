import React from 'react';
import "./Commentitem.css";
function Commentitem({ name, description}) {
return (
    <tr className="tr">
        <td className="t1"></td>
        <td className="t2">{name}</td>
        <td>{description}</td>
    </tr>
)
}

export default Commentitem;

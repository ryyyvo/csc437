import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TodoItem(props) {
  return (
    <li>
      <label className="mr-1" htmlFor={props.id}>
        <input className="mr-1" id={props.id} type="checkbox" defaultChecked={props.completed}/> 
        {props.name}
      </label>
      <button className="text-gray-500 hover:text-red-500 active:scale-125 transform transition-transform p-1 rounded cursor-pointer">
        <FontAwesomeIcon icon={faTrash} title="Delete task" />
      </button>
    </li>
  );
}

export default TodoItem;
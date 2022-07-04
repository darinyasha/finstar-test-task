import './UserCard.css';

function UserCard({ todosOfUser, userId }) {
 
  const unfinishedTodos = todosOfUser.filter(todo => todo.completed===false).length
  const finishedTodos = todosOfUser.filter(todo => todo.completed===true).length
  
  return (
    
    <div className="card-container">
      <div className="card-title"> <h3>Пользователь {userId}</h3> </div>
      <div className='card-info-content'> <span className="card-finishedTodos">{finishedTodos } </span> / <span className="card-unfinishedTodos"> {unfinishedTodos} </span> </div>
      <div className="card-description">
      <ul>{todosOfUser.map(todo => <li className="list-item" style={{wordWrap: 'break-word'}} key={todo.id}>{todo.title}</li>)}</ul>
      </div>
      </div>
     
  );   
}

export default UserCard;

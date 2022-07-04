import React, { useState } from 'react';
import UserCard from './UserCard';
import './ToDoList.css'
import Spinner from '../Spinner/Spinner';


function ToDoList(props) {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  console.log(loading);
  const userIdArr = userData.map(user =>user.userId)

  const makeUniq = arr => {
    return arr.filter((el, id) => arr.indexOf(el) === id)
  }

  const UniqUsersId = makeUniq(userIdArr) 

  const handleClick = async () => {
    setLoading(true)
    await fetch('https://jsonplaceholder.typicode.com/todos')
    
  .then(res => res.json())
  .then(data => setUserData(data))
  .catch(err=>console.log(err));
   
   setTimeout(setLoading, 3000, false);
  }

  const usersWithFinishedTodos = [];
 
  UniqUsersId.map(userId => {const todosOfUser = userData.filter(todo => todo.userId === userId);
  usersWithFinishedTodos.push({userId: userId, finishedTodos: todosOfUser.filter(todo => todo.completed===true).length})})
 
  const topOfUsersId= usersWithFinishedTodos.sort((a,b) => b.finishedTodos - a.finishedTodos).map(user => user.userId)
  
  return (
    <div className="window">
      <button  className="btn" disabled={loading} onClick={handleClick}>Загрузить данные</button>
      {loading? <Spinner /> : 
      <>
      <div className='container'>
          <div className='list-box'>
            {topOfUsersId.length >0 && topOfUsersId.map(userId => {const todosOfUser = userData.filter(todo => todo.userId === userId);
            return(<UserCard className='list-container' todosOfUser={todosOfUser} userId={userId} key={userId}/> )})} 
          </div> 
      </div>
      </>}
    </div>
   
  )
}

export default ToDoList;

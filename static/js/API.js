const getAll = (userInfo, val) =>
    fetch('/todo.json',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userInfo.getName(),
            email: userInfo.getEmail(),
            todo: val,
        })
    })
    .then(res => res.json())


const newTodo = (userInfo, val) =>
    fetch('/todo.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userInfo.getName(),
            email: userInfo.getEmail(),
            task: val,
        })
    })
    .then(res => res.json())

const delTodo = (userInfo, id) =>
        fetch('/todo.json', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                email: userInfo.getEmail(),
            })
        })
        .then(res => res.json())
        // .then(todos => {
        //     console.log(todos)
        // })

const patchTodo = (userInfo, val, id, status) =>
        fetch('/todo.json', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                email: userInfo.getEmail(),
                task: val,
                status: status
            })
        })
        .then(res => res.json())

const changeStatusTodo = (userInfo, id) =>
    fetch('todo.json', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id: id,
          email: userInfo.getEmail(),
      })
    })
    .then(res => res.json())

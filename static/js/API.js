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

// const showAllTodo = (userInfo) =>
//     fetch('/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email: userInfo.getEmail(),
//         })
//     })
//     .then(res => res.json())
//     .then(todos => {
//         console.log(todos)
//     })


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
                id: userInfo.getId(),
                email: userInfo.getName(),
            })
        })
        .then(res => res.json())
        .then(todos => {
            console.log(todos)
        })

const patchTodo = (userInfo, val) =>
        fetch('/todo.json', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userInfo.getId(),
                email: userInfo.getEmail(),
                task: val,
            })
        })
        .then(res => res.json())
        .then(todos => {
            console.log(todos)
        })

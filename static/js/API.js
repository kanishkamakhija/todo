const getAll = (userInfo) =>
    fetch('/todo.json',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userInfo.getName(),
            email: userInfo.getEmail(),
            todo: "Some random Todo",
            status: false,
        })
    })
    .then(res => res.json())
    .then(todos => {
        console.log(todos)
    })

const newTodo = () =>
    fetch('/todo.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: "kanishka",
            email: "kanishkamakhija007",
            task: "hellohello",
            status: false,
        })
    })
    .then(res => res.json())
    .then(todos => {
        console.log(todos)
    })

const delTodo = () =>
        fetch('/todo.json', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: "11",
                email: "kanishkamakhija007",
            })
        })
        .then(res => res.json())
        .then(todos => {
            console.log(todos)
        })

const patchTodo = () =>
fetch('/todo.json', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: "12",
        email: "kanishkamakhija007",
        task: "update todo",
        status: true,
    })
})
.then(res => res.json())
.then(todos => {
    console.log(todos)
})

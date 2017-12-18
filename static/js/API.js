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
            status: ""
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
            email: "kanishkamakhija007",
            task: "hgfhfhf",
            status: 'False',
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
                id: "2",
                email: "kanishkamakhija007",
            })
        })
        .then(res => res.json())
        .then(todos => {
            console.log(todos)
        })

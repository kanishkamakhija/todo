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

const newTodo = (userInfo, todo) =>
    fetch('/todo.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userInfo.getEmail(),
            task: todo,
            status: 'False',
    })
    .then(res => res.json())
    })

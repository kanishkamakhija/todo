const getAll = (userInfo) =>
    fetch('/todo.json',{
        method: 'POST',
        body: JSON.stringify({
            name: userInfo.getName(),
            email: userInfo.getEmail(),
            todo: "Some random Todo",
        })
    })
    .then(res => res.json())
    .then(todos => {
        console.log(todos)
    })

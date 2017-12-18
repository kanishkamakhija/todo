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
        })
    })
    .then(res => res.json())
    .then(todos => {
        console.log(todos)
    })

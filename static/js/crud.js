function clock() {
    // We create a new Date object and assign it to a variable called "time".
var time = new Date(),

    // Access the "getHours" method on the Date object with the dot accessor.
    hours = time.getHours(),

    // Access the "getMinutes" method with the dot accessor.
    minutes = time.getMinutes(),


    seconds = time.getSeconds();

document.querySelectorAll('.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);

  function harold(standIn) {
    if (standIn < 10) {
      standIn = '0' + standIn
    }
    return standIn;
  }
}
setInterval(clock, 1000);

var todo_arr = [];

function create() {
    const $todoTitle = $(`
        <div class="row" id="title">
            <div class="col-xs-12">
                <div class="input_title">WHAT ARE YOUR ToDos FOR TODAY? </div>
            </div>
        </div>
        `);

    const $input = $(`
        <div class="row" id="input">
            <div class="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-3 col-md-6 col-lg-offset-3 col-lg-6 input_field text-center">
                <input id="inp" name="task" placeholder="Enter Your ToDo Here!" type="text" onkeypress="submit(this)" />
            </div>
        </div>
        `);

    const $list = $(`
        <div class="row item-list" id="list">
            <ul>


            </ul>
        </div>
        `);

    const $button = $(`
    <div class="btn">
        <button id="sign-out">
            <span><i class="fa fa-power-off"></i></span>
        </button>
    </div>
    `);

    $button.click(function(){
        handleAuthClick();
    });

    $(".container").append($todoTitle).append($input).append($list).prepend($button);

}

// function showAll(profile) {
//     showAllTodo(profile);
// }


function update() {
    const user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
        const profile = user.getBasicProfile();
        const $par = $(this).parents()[1];
        const id = $($par).attr('data-id');
        const $index = todo_arr.indexOf($par);
        const $val = $($par).children('.text')[0].innerHTML;
        const status = $($par).children('.text').hasClass('toggleText');

        $('input').val($val);
        $('input').attr('data-id', id);
        $('input').attr('data-status', `{status}`);
        todo_arr.splice($index, 1);
        $($par).remove();
        $( "#inp" ).attr( "isUpdated", "true" );

    }


}

function del() {
    const user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
        const $par = $(this).parents()[1];
        const id = $($par).attr('data-id');
        const $index = todo_arr.indexOf($par);
        const profile = user.getBasicProfile();
        delTodo(profile, id).then(() => {
            todo_arr.splice($index, 1);
            $($par).remove();});
    }
    else {
        console.log("not authorized");
    }

}

function insert(content, id) {
    const $tick = $(`
        <div class="status col-xs-1">
            <i class="fa fa-check fa-lg" aria-hidden="true"></i>
        </div>
        `);
    const $cross = $(`
        <div class="delete col-xs-1">
            <i class="fa fa-times fa-lg" aria-hidden="true"></i>
        </div>
        `);

    const $update = $(`
        <div class="update col-xs-1">
            <i class="fa fa-pencil fa-lg" aria-hidden="true"></i>
        </div>`);
    const $li = $(`
    <li data-id="${id}">
        <div class="col-xs-9 text">${content}</div>
        <div class="buttons">
        <div>
    </li>
    `);

    $update.click(update);

    $cross.click(del);

    $tick.click(function(){
        const user = GoogleAuth.currentUser.get();
        let isAuthorized = user.hasGrantedScopes(SCOPE);
        if (isAuthorized) {
            const profile = user.getBasicProfile();
            const $par = $(this).parents()[1];
            const id = $($par).attr('data-id');
            const $val = $($par).children('.text')[0].innerHTML;
            const status = $($par).children('.text').hasClass('toggleText');
            console.log(profile + id + $val + status);
            patchTodo(profile, $val, id, status).then((todo) => {
            $li.children('div').toggleClass("toggleText");
            $tick.children('i').toggleClass("fa-check-circle fa-retweet");
            });
        }
    });


    $($li.children('.buttons')[0]).append($tick).append($update).append($cross);
    return $li;
}


function submit($this)
{
    if(event.key === 'Enter')
    {
        const user = GoogleAuth.currentUser.get();
        let isAuthorized = user.hasGrantedScopes(SCOPE);
        if (isAuthorized) {
            const profile = user.getBasicProfile();
            const $content = $('#inp').val();
            const $isUpdated = $( "#inp" ).attr( "isUpdated" );
            if($isUpdated === "true")
            {
                $( "#inp" ).attr( "isUpdated", "false" );
                const id = $('input').attr('data-id');
                const status = $('input').attr('data-status') == 'true';
                patchTodo(profile, $content, id, status).then((todo) => {
                  const $newli = insert(todo.task, todo.id);
                  todo_arr.push($newli[0]);
                  $('.item-list ul').append($newli);
                });
            }
            else {
              newTodo(profile, $content).then((todo) => {
                const $newli = insert(todo.task, todo.id);
                todo_arr.push($newli[0]);
                $('.item-list ul').append($newli);
              })
            }

            $('input').val('');

        }
    }
}

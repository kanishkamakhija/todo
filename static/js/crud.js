var $content

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
                <input id="inp" name="task" placeholder="Enter Your ToDo Here!" type="text" onkeypress="insert(this)" />
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

function update() {

        const $par = $(this).parents()[1];
        const $index = todo_arr.indexOf($par);
        const $val = $($par).children('.text')[0].innerHTML;
        $('input').val($content);
        todo_arr.splice($index, 1);
        $($par).remove();
        const user = GoogleAuth.currentUser.get();
        let isAuthorized = user.hasGrantedScopes(SCOPE);
        if (isAuthorized) {
            const profile = user.getBasicProfile();
            patchTodo(profile, $content);
        }
        else {
            console.log("not authorized");
        }
}

function del() {
    const $par = $(this).parents()[1];
    const $index = todo_arr.indexOf($par);
    todo_arr.splice($index, 1);
    $($par).remove();
    const user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
        const profile = user.getBasicProfile();
        patchTodo(profile);
    }
    else {
        console.log("not authorized");
    }

}

function insert()
{

    if(event.key === 'Enter')
    {
        $content = $('#inp').val();
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
        <li>
            <div class="col-xs-9 text">${$content}</div>
            <div class="buttons">
            <div>
        </li>
        `);

        $update.click(update);

        $cross.click(del);

        $tick.click(function(){
            $li.children('div').toggleClass("toggleText");
            $tick.children('i').toggleClass("fa-check-circle fa-retweet");
        });


        $($li.children('.buttons')[0]).append($tick).append($update).append($cross);
        todo_arr.push($li[0]);
        $('.item-list ul').append($li);
        $('input').val('');
        const user = GoogleAuth.currentUser.get();
        let isAuthorized = user.hasGrantedScopes(SCOPE);
        if (isAuthorized) {
            const profile = user.getBasicProfile();
            newTodo(profile, $content);
        }

    }
}

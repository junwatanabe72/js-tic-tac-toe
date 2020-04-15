//定数

//盤の状態を記録するための配列。○を配置した場合、1 ×を配置した場合,10を配列に入れる。
const ar = new Array(9)
//ゲームの状態
const game = {
    turn: 1,
    exceed: true,
    maru: true
}
//勝敗判定定数 ○の勝利1+1+1=3  ×の勝利10+10+10=30
const maruWinNumber = 3
const batsuWinNumber = 30
//html書き換え要素 
const maruText = `○`
const batsuText = `×`
const drawText = `draw`
//addEventlisterに引き渡すhtml要素
const cells = document.querySelectorAll('.js-cell')
const maruElement = document.querySelector('.player-container-maru')
const batsuElement = document.querySelector('.player-container-batsu')
const result = document.querySelector('.footer-text')
const restart = document.querySelector('.restart')


//関数

//全てのセルでplayAction関数を実施する。
cells.forEach((item) => {
    item.addEventListener('click', function () { playerAction(item) })
});

//プレーヤーを変更 game.maru==true =>○ ,game.maru==false =>×
function playertoggle(e) {
    if (e) {
        maruElement.classList.remove("active")
        batsuElement.classList.add('active')
    } else {
        batsuElement.classList.remove('active')
        maruElement.classList.add('active')
    }
}

//メインの関数
function playerAction(e) {
    const index = Number(e.dataset.key) - 1

    //勝敗が決したら、終了する。配列の同じ箇所は選べない
    if (!game.exceed || ar[index]) {
        return
    }



    //○or×を配置する。
    if (game.maru) {
        //htmlを書き換える
        e.innerHTML = maruText
        //プレイヤを入れ替える
        playertoggle(game.maru)
        //配列に○要素を入れる。
        ar[index] = 1
        //○のターンを終了させる。
        game.maru = false
    } else {
        //htmlを書き換える
        e.innerHTML = batsuText
        //プレイヤを入れ替える
        playertoggle(game.maru)
        //配列に×要素を入れる。
        ar[index] = 10
        //×のターンを終了させる。
        game.maru = true
    }

    //勝敗を判定する。
    Win(e.innerHTML)

    //勝敗判定が着かなければ、gameを続行する。    
    game.turn++

    //ドローで終了する。
    if (game.turn === 10) {
        Win(e.innerHTML)
        //最後の一手で勝つ。
        if (game.exceed) {
            result.innerHTML = drawText
            game.exceed = false
        }
    }
}

//勝ち負け判定の関数
function Win(e) {
    const total = (e === maruText) ? maruWinNumber : batsuWinNumber
    if (
        (ar[0] + ar[1] + ar[2]) === total ||
        (ar[3] + ar[4] + ar[5]) === total ||
        (ar[6] + ar[7] + ar[8]) === total ||
        (ar[0] + ar[3] + ar[6]) === total ||
        (ar[1] + ar[4] + ar[7]) === total ||
        (ar[2] + ar[5] + ar[8]) === total ||
        (ar[0] + ar[4] + ar[8]) === total ||
        (ar[2] + ar[4] + ar[6]) === total) {
        result.innerHTML = `${e} win!!`
        game.exceed = false
    }
}

// restartでキャンセルする。
restart.addEventListener('click', initalize);

function initalize() {
    location.reload()
}
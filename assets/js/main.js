Vue.component('todo-item', {
    props: ['i', 'j', 'cell'],
    data: function () {
        return {

        }
    },
    template: `<div class="cell" @click="setValue"><p>{{cell}}<p></div>`,

    methods: {
        setValue() {
            if (app.win == true) {
                return false
            }
            if (this.cell != '') {
                return false
            }

            if (app.computer) {
                this.cell = 'X'
                app.gameField[this.i][this.j] = this.cell

                app.currentPlayer = app.firstPlayer
                app.checkWin('X');
                if (app.win == true) {
                    return false
                }

                let arr = app.gameField
                let x, y
                let count = 0

                while (1) {
                    x = app.getRandomInt(app.size)
                    y = app.getRandomInt(app.size)

                    if (arr[x][y] == '') {
                        app.currentPlayer = 'Компьютер'
                        app.gameField[x][y] = 'O'
                        app.showGameField = false
                        app.showGameField = true
                        break;
                    } else {
                        count++
                    }
                    if (count == Number(app.size) ** 2) {
                        break
                    }
                }
                app.checkWin('O');
                app.currentPlayer = app.firstPlayer

                if (!app.checkDraw()) {
                    app.win = true
                    app.showDraw = true
                }
                app.currentPlayer = app.firstPlayer

            } else {
                app.count++
                (app.count % 2 == 0) ? this.cell = 'X' : this.cell = 'O';
                app.gameField[this.i][this.j] = this.cell
                app.checkWin('X');
                app.checkWin('O');

                if (!app.checkDraw()) {
                    app.win = true
                    app.showDraw = true
                }
                (app.currentPlayer == app.firstPlayer) ? app.currentPlayer = app.secondPlayer : app.currentPlayer = app.firstPlayer;
            }
        },
    }
});

const app = new Vue({
    el: '#app',
    data: {
        showChoose: true,
        showCurrentPlayer: false,
        showInputName: false,
        showSize: false,
        showDraw: false,
        showGameField: false,
        header: 'Выберите режим игры поля',
        inputName: '',
        firstPlayer: '',
        secondPlayer: '',
        currentPlayer: '',
        computer: false,
        win: false,
        winner: false,
        gameField: [],
        heightField: 0,
        styleField: "",
        size: '',
        count: 1,

    },
    methods: {
        reset: function () {
            this.showChoose = true,
                this.showCurrentPlayer = false,
                this.showInputName = false,
                this.showSize = false,
                this.showDraw = false,
                this.showGameField = false,
                this.header = 'Выберите режим игры поля',
                this.inputName = '',
                this.firstPlayer = '',
                this.secondPlayer = '',
                this.currentPlayer = '',
                this.computer = false,
                this.win = false,
                this.winner = false,
                this.gameField = [],
                this.heightField = 0,
                this.styleField = "",
                this.size = '',
                this.count = 1
        },
        setPlayersName: function () {
            if (this.computer) {
                if (this.firstPlayer == '' && this.inputName.trim() != '') {
                    this.firstPlayer = this.inputName
                    this.secondPlayer = 'Компьютер'
                    this.showInputName = false
                    this.showGameField = true
                    this.currentPlayer = this.firstPlayer
                    this.showCurrentPlayer = true
                    this.inputName = ''
                    this.header = this.firstPlayer + " VS " + this.secondPlayer
                }
            } else {
                if (this.firstPlayer == '' && this.inputName.trim() != '') {
                    this.firstPlayer = this.inputName
                    this.header = 'Введите имя второго игрока'
                }
                else if (this.secondPlayer == '' && this.inputName.trim() != '') {
                    this.secondPlayer = this.inputName
                    this.header = this.firstPlayer + " VS " + this.secondPlayer
                }

                if (this.firstPlayer != '' && this.secondPlayer != '') {
                    this.showInputName = false
                    this.showGameField = true
                    this.currentPlayer = this.firstPlayer
                    this.showCurrentPlayer = true
                }
                this.inputName = ''
            }
        },
        chooseFieldSize: function () {
            if (this.size.trim() != '') {
                this.size = Number(this.size)
                this.styleField = "repeat(" + this.size + ", 1fr)"
                this.showInputName = true
                this.showSize = false
                if (this.computer) { this.header = 'Введите имя игрока' } else { this.header = 'Введите имя первого игрока' }

                for (let i = 0; i < this.size; i++) {
                    this.gameField[i] = [];
                    for (let j = 0; j < this.size; j++) {
                        this.gameField[i][j] = '';
                    }
                }
                this.heightField = this.size * 100 + 'px'
            }
        },
        showSizeDuel: function () {
            this.showSize = true
            this.showChoose = false
            this.header = 'Выбирете размер поля'
        },
        showSizeBot: function () {
            this.showSize = true
            this.showChoose = false
            this.header = 'Выбирете размер поля'
            this.computer = true
        },
        checkWin(value) {
            let arr = app.gameField
            let len = 5
            if (app.size < 5) { len = app.size }
            this.checkMatrix(value, arr, app.size, len, 'row')
            this.checkMatrix(value, arr, app.size, len, 'column')
            this.checkMatrix(value, arr, app.size, len, 'mainDiagonal', 'down')
            this.checkMatrix(value, arr, app.size, len, 'mainDiagonal', 'up')
            this.checkMatrix(value, arr, app.size, len, 'secondaryDiagonal', 'down')
            this.checkMatrix(value, arr, app.size, len, 'secondaryDiagonal', 'up')
        },
        checkDraw() {
            if (app.winner != false) {
                return true
            }
            let arr = app.gameField
            count = 0
            for (let i = 0; i < app.size; i++) {
                for (let j = 0; j < app.size; j++) {
                    if (arr[i][j] == '') {
                        count++
                    }
                }
            }
            if (count == 0) {
                return false
            }
            return true
        },
        getRandomInt(max) {
            return Math.floor(Math.random() * max);
        },
        checkMatrix(value, arr, size, len, type, direction) {
            let cell = arr[0][0]
            let yLimit = size - len
            let count = 0
            if (type == 'row' || type == 'column') { yLimit = size - 1 }
            for (let y = 0; y <= yLimit; y++) {
                count = 0
                for (let j = 0; j <= size - len; j++) {
                    count = 0
                    for (let i = 0; i < len; i++) {
                        if (type == 'row') { cell = arr[j + i][y] }
                        if (type == 'column') { cell = arr[y][j + i] }
                        if (type == 'mainDiagonal' && direction == 'down') { cell = arr[i + j][i + j + y] }
                        if (type == 'mainDiagonal' && direction == 'up') { cell = arr[i + y][i + j] }
                        if (type == 'secondaryDiagonal' && direction == 'down') { cell = [size - 1 - i - j][i + j + y] }
                        if (type == 'secondaryDiagonal' && direction == 'up') { cell = arr[size - 1 - i - y][i + j] }

                        if (cell != value) {
                            break
                        }
                        count++
                    }
                    if (count == len) {
                        app.win = true;
                        app.winner = app.currentPlayer
                    }
                }
            }
        },
    }

});

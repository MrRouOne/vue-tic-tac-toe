Vue.component('todo-item', {
    props: ['i', 'j', 'cell'],
    data: function () {
        return {

        }
    },
    template: `<div class="cell" @click="setValue"><p>{{cell}}<p></div>`,

    methods: {
        getRandomInt(max) {
            return Math.floor(Math.random() * max);
        },
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

                let arr = app.gameField
                let x, y
                do {
                    x = this.getRandomInt(app.size)
                    y = this.getRandomInt(app.size)

                    if (arr[x][y] == '') {
                        app.currentPlayer = 'Компьютер'
                        app.gameField[x][y] = 'O'
                        app.showGameField = false
                        app.showGameField = true
                        break;
                    }
                } while (1)
                this.checkWin('O');
                app.currentPlayer = app.firstPlayer
                this.checkWin('X');

                if (!this.checkDraw()) {
                    app.win = true
                    app.showDraw = true
                }
                app.currentPlayer = app.firstPlayer
            } else {
                app.count++
                (app.count % 2 == 0) ? this.cell = 'X' : this.cell = 'O';
                app.gameField[this.i][this.j] = this.cell
                this.checkWin('X');
                this.checkWin('O');

                if (!this.checkDraw()) {
                    app.win = true
                    app.showDraw = true
                }
                (app.currentPlayer == app.firstPlayer) ? app.currentPlayer = app.secondPlayer : app.currentPlayer = app.firstPlayer;
            }


        },
        checkWin(value) {
            let arr = app.gameField
            let len = 5
            if (app.size < 5) {
                len = app.size
            }

            // столбец 
            let count = 0
            for (let i = 0; i < app.size; i++) {
                count = 0
                if (len < app.size) {
                    for (let j = 0; j <= app.size - len; j++) {
                        count = 0
                        for (let k = 0; k < len; k++) {
                            if (arr[i][j + k] != value) {
                                break
                            }
                            count++
                        }
                        if (count == len) {
                            app.win = true; app.winner = app.currentPlayer
                            break
                        }
                    }
                } else {
                    for (let j = 0; j < len; j++) {
                        if (arr[i][j] != value) {
                            break
                        }

                        count++
                    }
                    if (count == len) {
                        app.win = true; app.winner = app.currentPlayer
                        break
                    }
                }
            }


            // строка
            let count2 = 0
            for (let i = 0; i < app.size; i++) {
                count2 = 0
                if (len < app.size) {
                    for (let j = 0; j <= app.size - len; j++) {
                        count2 = 0
                        for (let k = 0; k < len; k++) {
                            if (arr[j + k][i] != value) {
                                break
                            }
                            count2++
                        }
                        if (count2 == len) {
                            app.win = true; app.winner = app.currentPlayer
                            break
                        }
                    }
                } else {
                    for (let j = 0; j < len; j++) {
                        if (arr[j][i] != value) {
                            break
                        }

                        count2++
                    }
                    if (count2 == len) {

                        app.win = true; app.winner = app.currentPlayer
                        break
                    }
                }
            }

            // основная диагональ вниз
            let count3 = 0
            if (len < app.size) {
                for (let y = 0; y < app.size - 4; y++) {
                    count3 = 0
                    for (let j = 0; j <= app.size - len; j++) {
                        count3 = 0
                        for (let i = 0; i < len; i++) {
                            if (arr[i + j][i + j + y] != value) {

                                break
                            }

                            count3++
                        }
                        if (count3 == len) {
                            count3 = 0
                            app.win = true; app.winner = app.currentPlayer
                        }
                    }
                }
            } else {
                for (let i = 0; i < app.size; i++) {

                    if (arr[i][i] != value) {
                        break
                    }
                    count3++
                }
                if (count3 == len) {
                    count3 = 0
                    app.win = true; app.winner = app.currentPlayer

                }
            }

            // основная диагональ вверх
            let count4 = 0
            if (len < app.size) {
                for (let y = 0; y < app.size - 4; y++) {
                    count4 = 0
                    for (let j = 0; j <= app.size - len; j++) {
                        count4 = 0
                        for (let i = 0; i < len; i++) {
                            if (arr[i + y][i + j] != value) {
                                break
                            }

                            count4++
                        }
                        if (count4 == len) {
                            count4 = 0
                            app.win = true; app.winner = app.currentPlayer
                        }
                    }
                }
            }

            // побочная диагональ вниз
            let count5 = 0
            if (len < app.size) {
                for (let y = 0; y < app.size - 4; y++) {
                    count5 = 0
                    for (let j = 0; j <= app.size - len; j++) {
                        count5 = 0
                        for (let i = 0; i < len; i++) {
                            if (arr[app.size - 1 - i - j][i + j + y] != value) {

                                break
                            }
                            count5++
                        }
                        if (count5 == len) {
                            count5 = 0
                            app.win = true; app.winner = app.currentPlayer
                        }
                    }
                }
            } else {
                for (let i = 0; i < app.size; i++) {

                    if (arr[app.size - i - 1][i] != value) {
                        break
                    }
                    count5++
                }
                if (count5 == len) {
                    count5 = 0
                    app.win = true; app.winner = app.currentPlayer

                }
            }


            // побочная диагональ вверх
            let count6 = 0
            if (len < app.size) {
                for (let y = 0; y < app.size - 4; y++) {
                    count6 = 0
                    for (let j = 0; j < app.size - len; j++) {
                        count6 = 0
                        for (let i = 0; i < len; i++) {
                            if (arr[app.size - 1 - i - j - y][i + j] != value) {

                                break
                            }

                            count6++
                        }
                        if (count6 == len) {
                            count6 = 0
                            app.win = true; app.winner = app.currentPlayer; app.winner = app.currentPlayer
                        }
                    }
                }
            }
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
        }
    }
});

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        header: 'Выберите режим игры поля',
        firstPlayer: '',
        secondPlayer: '',
        currentPlayer: '',
        showCurrentPlayer: false,
        showInputName: false,
        showSize: false,
        size: '',
        styleField: "",
        showGameField: false,
        gameField: [],
        height: 0,
        count: 1,
        win: false,
        winner: false,
        showDraw: false,
        showChoose: true,
        computer: false
    },
    methods: {
        playersName: function () {
            if (this.computer) {
                if (this.firstPlayer == '' && this.message.trim() != '') {
                    this.firstPlayer = this.message
                    this.secondPlayer = 'Компьютер'
                    this.showInputName = false
                    this.showGameField = true
                    this.currentPlayer = this.firstPlayer
                    this.showCurrentPlayer = true
                    this.message = ''
                    this.header = this.firstPlayer + " VS " + this.secondPlayer
                }

            } else {
                if (this.firstPlayer == '' && this.message.trim() != '') {
                    this.firstPlayer = this.message
                    this.header = 'Введите имя второго игрока'
                }
                else if (this.secondPlayer == '' && this.message.trim() != '') {
                    this.secondPlayer = this.message
                    this.header = this.firstPlayer + " VS " + this.secondPlayer
                }

                if (this.firstPlayer != '' && this.secondPlayer != '') {
                    this.showInputName = false
                    this.showGameField = true
                    this.currentPlayer = this.firstPlayer
                    this.showCurrentPlayer = true
                }
                this.message = ''
            }
        },
        fieldSize: function () {
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
                this.height = this.size * 100 + 'px'
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
        }

    }
});

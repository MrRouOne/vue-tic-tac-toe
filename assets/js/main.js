Vue.component('todo-item', {
    props: ['i', 'j', 'cell'],
    data: function () {
        return {

        }
    },
    template: `<div class="cell" @click ="setValue"><p>{{cell}}<p></div>`,

    methods: {
        setValue() {
            if (this.cell == '') {
                app.count++
                if (app.count % 2 == 0) {
                    this.cell = 'X'
                    app.currentPlayer = app.secondPlayer
                } else {
                    this.cell = 'O'
                    app.currentPlayer = app.firstPlayer
                }
                app.gameField[this.i][this.j] = this.cell
                this.checkWin('X')
                this.checkWin('O')
            }
        },
        checkWin(value) {
            let arr = app.gameField
            let isRow
            let count = 0
            let len = 5
            if (app.size < 5) {
                len = app.size
            }

            // столбец 
            for (let i = 0; i < app.size; i++) {
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
                            app.win = 'yes'
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
                        app.win = 'yes'
                        break
                    }
                }
            }


            // строка
            count = 0
            for (let i = 0; i < app.size; i++) {
                if (len < app.size) {
                    for (let j = 0; j <= app.size - len; j++) {
                        count = 0
                        for (let k = 0; k < len; k++) {
                            if (arr[j + k][i] != value) {
                                break
                            }
                            count++
                        }
                        if (count == len) {
                            app.win = 'yes'
                            break
                        }
                    }
                } else {
                    for (let j = 0; j < len; j++) {
                        if (arr[j][i] != value) {
                            break
                        }
                        count++
                    }
                    if (count == len) {
                        app.win = 'yes'
                        break
                    }
                }
            }

            // основная диагональ вниз
            count = 0
            if (len < app.size) {
                for (let y = 0; y < app.size - 4; y++) {
                    count = 0
                    for (let j = 0; j <= app.size - len; j++) {
                        count = 0
                        for (let i = 0; i < len; i++) {
                            if (arr[i + j][i + j + y] != value) {

                                break
                            }

                            count++
                        }
                        if (count == len) {
                            count = 0
                            app.win = 'yes'
                        }
                    }
                }
            } else {
                for (let i = 0; i < app.size; i++) {

                    if (arr[i][i] != value) {
                        break
                    }
                    count++
                }
                if (count == len) {
                    count = 0
                    app.win = 'yes'

                }
            }

            // основная диагональ вверх
            count = 0
            if (len < app.size) {
                for (let y = 0; y < app.size - 4; y++) {
                    count = 0
                    for (let j = 0; j <= app.size - len; j++) {
                        count = 0
                        for (let i = 0; i < len; i++) {
                            if (arr[i + y][i + j] != value) {
                                break
                            }

                            count++
                        }
                        if (count == len) {
                            count = 0
                            app.win = 'yes'
                        }
                    }
                }
            }

            // побочная диагональ вниз
            count = 0
            if (len < app.size) {
                for (let y = 0; y < app.size - 4; y++) {
                    count = 0
                    for (let j = 0; j <= app.size - len; j++) {
                        count = 0
                        for (let i = 0; i < len; i++) {
                            if (arr[app.size - 1 - i - j][i + j + y] != value) {

                                break
                            }
                            count++
                        }
                        if (count == len) {
                            count = 0
                            app.win = 'yes'
                        }
                    }
                }
            } else {
                for (let i = 0; i < app.size; i++) {

                    if (arr[app.size - i - 1][i] != value) {
                        break
                    }
                    count++
                }
                if (count == len) {
                    count = 0
                    app.win = 'yes'

                }
            }


            // побочная диагональ вверх
            count = 0
            if (len < app.size) {
                for (let y = 0; y < app.size - 4; y++) {
                    count = 0
                    for (let j = 0; j <= app.size - len; j++) {
                        count = 0
                        for (let i = 0; i < len; i++) {

                            if (arr[app.size - 1 - i - j - y][i + j] != value) {
                                console.log(app.size - 1 - i - j - y,i + j)
                                break
                            }
                          
                            count++
                        }
                        if (count == len) {
                            count = 0
                            app.win = 'yes'
                        }
                    }
                }
            }
        }
    }
});

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        header: 'Выберите размер поля',
        firstPlayer: 'f',
        secondPlayer: 's',
        currentPlayer: '',
        showCurrentPlayer: false,
        showInputName: false,
        showSize: false, //true
        size: '8', // ''
        styleField: "",
        showGameField: false,
        gameField: [],
        height: 0,
        count: 1,
        win: 'no'
    },
    methods: {
        playersName: function () {
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
            }
            this.message = ''

            this.styleField = "repeat(" + this.size + ", 1fr)"
        },
        fieldSize: function () {
            if (this.size.trim() != '') {
                this.size = Number(this.size)
                this.styleField = "repeat(" + this.size + ", 1fr)"
                // this.showInputName = true
                this.showSize = false
                this.header = 'Введите имя первого игрока'
                for (let i = 0; i < this.size; i++) {
                    this.gameField[i] = [];
                    for (let j = 0; j < this.size; j++) {
                        this.gameField[i][j] = '';
                    }
                }
                this.showGameField = true
                this.height = this.size * 100 + 'px'
                this.currentPlayer = this.firstPlayer
                this.showCurrentPlayer = true
            }
        },

    }
});

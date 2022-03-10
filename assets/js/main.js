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
                this.checkWin()
            }
        },
        checkWin() {
            let arr = app.gameField
            let bool = false
            let countX = 0
            for (let i = 0; i < app.size; i++) {
                  arr[i].forEach(element => {
                      if (element == 'X' && index == 0) {
                          countX++
                      }
                  });
            }
            if (countX == app.size) {
                app.win = 'yes'
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
        size: '3', // ''
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
                this.showGameField = true // !
                this.height = this.size * 100 + 'px'
                this.currentPlayer = this.firstPlayer
                this.showCurrentPlayer = true
            }
        },

    }
});

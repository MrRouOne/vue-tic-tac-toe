Vue.component('todo-item', {
    props: ['todo'],
    data: function () {
        return {
        }
    },
    template: ``
});

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        header: 'Выберите размер поля',
        firstPlayer: '',
        secondPlayer: '',
        showInputName: false,
        showSize: true,
        size: '',
        styleField: "",
        showGameField: false,
        gameField: []
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
                this.showInputName = true
                this.showSize = false
                this.header = 'Введите имя первого игрока'
                for (let i=0;i<this.size;i++) {
                    this.gameField[i] = [];
                    for (let j=0;j<this.size;j++) {
                        this.gameField[i][j] = '';
                    }
                }
            }
        }
    }
});

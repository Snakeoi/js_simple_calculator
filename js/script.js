
class Calculator {
    constructor(app) {
        this.app = document.getElementById(app)
        this.display_result = this.app.querySelector('.calc__display__result')
        this.display_formula = this.app.querySelector('.calc__display__formula')
        this.operators = []
        this.mapButtons()
    }

    mapButtons() {
        const btns_num = this.app.querySelectorAll('.btn-num')
        btns_num.forEach(function(btn){
            btn.addEventListener('click', function () {
                self.display_formula.innerHTML += btn.innerHTML
            });
        }, self=this)

        const btns_operator = this.app.querySelectorAll('.btn-operator')
        btns_operator.forEach(function(btn){
            btn.addEventListener('click', function () {
                const last_char = self.display_formula.innerHTML.slice(-1)
                if (self.operators.includes(last_char)){
                    self.display_formula.innerHTML = self.display_formula.innerHTML.replace(/.$/, btn.innerHTML)
                } else {
                    self.display_formula.innerHTML += btn.innerHTML
                }
            })
            self.operators.push(btn.innerHTML)
        }, self=this)

        const btns_func = this.app.querySelectorAll('.btn-func')
        btns_func.forEach(function(btn){
            btn.addEventListener('click', function () {
                switch (btn.innerHTML) {
                    case 'C':
                        self.display_formula.innerHTML =''
                        self.display_result.innerHTML =''
                        break;
                    case '&lt;':
                        self.display_formula.innerHTML = self.display_formula.innerHTML.replace(/.$/, '')
                        break;
                    case '=':
                        let real_formula = self.display_formula.innerHTML
                        real_formula = real_formula.replace('x', '*')
                        real_formula = real_formula.replace('%', '/100')
                        const func = new Function('return ' + real_formula)
                        self.display_result.innerHTML = func()
                    default:
                        break;
                }
            })
        }, self=this)
    }
}

calc = new Calculator('app')
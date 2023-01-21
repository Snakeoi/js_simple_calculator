
class Calculator {
    constructor(app) {
        this.app = document.getElementById(app)
        this.display_result = this.app.querySelector('.calc__display__result')
        this.display_formula = this.app.querySelector('.calc__display__formula')
        this.display_error = this.app.querySelector('.calc__error')
        this.operators = []
        this.mapButtons()
    }

    mapButtons() {
        const btns_num = this.app.querySelectorAll('.btn-num')
        btns_num.forEach(function(btn){
            btn.addEventListener('click', function () {
                if (self.display_result.innerHTML !== '0'){
                    self.display_result.innerHTML = 0
                    self.display_formula.innerHTML = 0
                    self.display_formula.innerHTML = btn.innerHTML
                } else {
                    self.display_formula.innerHTML += btn.innerHTML
                    self.display_formula.scrollLeft = self.display_formula.scrollWidth;
                }
            });
        }, self=this)

        const btns_operator = this.app.querySelectorAll('.btn-operator')
        btns_operator.forEach(function(btn){
            btn.addEventListener('click', function () {

                function is_numeric(str){
                    return /^\d+$/.test(str);
                }

                if (self.display_result.innerHTML !== '0'){
                    self.display_formula.innerHTML = self.display_result.innerHTML
                    self.display_result.innerHTML = 0
                } 
                let last_char = self.display_formula.innerHTML.slice(-1)
                if (btn.innerHTML === '.'){
                    if (!is_numeric(last_char)){
                        self.display_formula.innerHTML += 0
                        last_char = 0
                    }
                }
                if (self.operators.includes(last_char)){             
                    self.display_formula.innerHTML = self.display_formula.innerHTML.replace(/.$/, btn.innerHTML)
                } else {
                    self.display_formula.innerHTML += btn.innerHTML
                }
                self.display_formula.scrollLeft = self.display_formula.scrollWidth;

            })
            self.operators.push(btn.innerHTML)
        }, self=this)

        const btns_func = this.app.querySelectorAll('.btn-func')
        btns_func.forEach(function(btn){
            btn.addEventListener('click', function () {
                switch (btn.innerHTML) {
                    case 'C':
                        self.display_formula.innerHTML = ''
                        self.display_result.innerHTML = 0
                        break;
                    case '&lt;':
                        self.display_formula.innerHTML = self.display_formula.innerHTML.replace(/.$/, '')
                        break;
                    case '=':
                        let real_formula = self.display_formula.innerHTML
                        real_formula = real_formula.replaceAll('x', '*')
                        try {
                            self.display_result.innerHTML = math.evaluate(real_formula)
                            self.display_error.innerHTML = ''
                        } catch(err) {
                            self.display_error.innerHTML = 'Error'
                        }
                    default:
                        break;
                }
            })
        }, self=this)
    }
}

calc = new Calculator('app')
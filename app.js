Vue.filter('doneLabel', function (value) {
    if (value == 0) {
        return "Não Paga"
    } else {
        return "Paga"
    }
});
Vue.filter('statusLabel', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada"
    }
    
    if (!value){
        return "Nenhuma conta a pagar"
    } else {
        return "Existem " + value + " conta(s) a ser(em) paga(s)"
    }
    
    
});
var app = new Vue({
    el: "#appVue",
    data: {
        title: "Controle de Contas a pagar",
        activedView: 0,
        menus: [
            {id: 0, name: "Listar Contas"},
            {id: 1, name: "Criar Conta"}
        ],
        names: [
            'Conta de Luz',
            'Conta de Água',
            'Conta de Telefone',
            'Supermercado',
            'Conta de Água',
            'Empréstimo',
            'Gasolina'
        ],
        formType: 'insert',
        bill: {
            date_due: "",
            name: "",
            value: 0,
            done: 0
        },
        bills: [
            {date_due: "25/11/2016", name: "Conta de Luz", value: 25.99, done: 1},
            {date_due: "25/11/2016", name: "Conta de Água", value: 220.99, done: 0},
            {date_due: "25/11/2016", name: "Gasolina", value: 425.99, done: 0},
            {date_due: "25/11/2016", name: "Gasolina", value: 33.49, done: 0},
            {date_due: "25/11/2016", name: "Empréstimo", value: 28.99, done: 0},
            {date_due: "25/11/2016", name: "Conta de Água", value: 125.99, done: 0},
            {date_due: "25/11/2016", name: "Conta de Telefone", value: 125.99, done: 0}
        ]
    },
    computed: {
        status: function(){
            if(!this.bills.length){
                return false;
            }
            var count = 0;
            for (var i in this.bills) {
                if(!this.bills[i].done){
                    count++;
                }
            }
            return count;
        } 
    },
    methods: {
        showView: function (id) {
            this.activedView = id;
            if (id == 1) {
                this.formType = 'insert';
            }
        },
        submit: function () {
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }
            ;

            this.bill = {
                date_due: "",
                name: "",
                value: 0,
                done: 0
            }

            this.activedView = 0;

        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        deleteBill: function (o) {
            if (confirm('Deseja Excluir esta conta?')) {
                this.bills.$remove(o);
            }


        }
    }
});



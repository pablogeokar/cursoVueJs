/*Filter Pago/Não Pago*/
Vue.filter('doneLabel', function (value) {
    if (value == 0) {
        return "Não Paga"
    } else {
        return "Paga"
    }
});
/*total contas a pagar*/
Vue.filter('statusLabel', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada"
    }

    if (!value) {
        return "Nenhuma conta a pagar"
    } else {
        return "Existem " + value + " conta(s) a ser(em) paga(s)"
    }
});
/*WebComponent*/
var menuComponent = Vue.extend({
    template: `
<!-- Fixed navbar -->
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Curso Vue.js</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="index.html">Home</a></li>
                <li v-for="o in menus">
                    <a href="#" @click.prevent="showView(o.id)">{{o.name}}</a>
                </li>
            </ul>                   
        </div><!--/.nav-collapse -->
    </div>
</nav>

`,
    data: function () {
        return {
            menus: [
                {id: 0, name: "Listar Contas"},
                {id: 1, name: "Criar Conta"}
            ],
        };
    },
    methods: {
        showView: function (id) {
            //this.$parent.activedView = id;
            this.$dispatch('change-activedView', id);
            if (id == 1) {
                //this.$parent.formType = 'insert';
                this.$dispatch('change-formType', 'insert');
            }
        },
    }

});


var billListComponent = Vue.extend({
    template: `
                    <div class="panel panel-default">
                        <!-- Default panel contents -->
                        <div class="panel-heading">
                            <img src="imgs/payment-method.png" />
                            Listagem das Contas a Pagar                            
                        </div>
                        <div class="panel-body">
                            <!-- Alert -->
                            <div class="alert alert-dismissible" role="alert" :class="{'cinza' : $parent.status === false, 'alert-success': $parent.status === 0, 'alert-danger': $parent.status > 0 }">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                {{$parent.status | statusLabel}}
                            </div>                            
                            <!-- /Alert -->

                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>vencimento</th>
                                        <th>Nome</th>
                                        <th>Valor</th>
                                        <th>Paga?</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(index, o) in bills" :class="{'success' : o.done, 'warning':!o.done }">
                                        <th>{{index + 1}}</th>
                                        <td>{{o.date_due}}</td>
                                        <td>{{o.name}}</td>
                                        <td align="right">{{o.value | currency 'R$ ' 2}}</td>
                                        <td align="right" class='bg' :class="{'pago' : o.done, 'naoPago':!o.done }">
                                            {{o.done | doneLabel}}
                                    </td>
                                    <td>
                                        <a href="#" @click.prevent="loadBill(o)">Editar</a> | <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>          
            <!-- /Listagem -->

`,
    data: function () {
        return {
            bills: [
                {date_due: "25/11/2016", name: "Conta de Luz", value: 25.99, done: 1},
                {date_due: "25/11/2016", name: "Conta de Água", value: 220.99, done: 0},
                {date_due: "25/11/2016", name: "Gasolina", value: 425.99, done: 0},
                {date_due: "25/11/2016", name: "Gasolina", value: 33.49, done: 0},
                {date_due: "25/11/2016", name: "Empréstimo", value: 28.99, done: 0},
                {date_due: "25/11/2016", name: "Conta de Água", value: 125.99, done: 0},
                {date_due: "25/11/2016", name: "Conta de Telefone", value: 125.99, done: 0}
            ]
        }
    },
    methods: {
        loadBill: function (bill) {
            this.$parent.bill = bill;
            this.$parent.activedView = 1;
            this.$parent.formType = 'update';
        }
        ,
        deleteBill: function (o) {
            if (confirm('Deseja Excluir esta conta?')) {
                this.bills.$remove(o);
            }
        }
    }

});


var billCreateComponent = Vue.extend({
    template: `
   <div class="panel panel-default">
                    <!-- Default panel contents -->
                    <div class="panel-heading">
                        <img src="imgs/check.png" />
                        Criação/Alteração de Conta a Pagar                            
                    </div>
                    <div class="panel-body">
                        <form name="form" @submit.prevent="submit">
                            <div class="form-group">
                                <label>Vencimento:</label>
                                <input type="text" v-model="bill.date_due"/>
                            </div>
                            <div class="form-group">                            
                                <label>Nome:</label>
                                <select v-model="bill.name">
                                    <option v-for="o in names" :value="o">{{o}}</option>
                                </select>
                            </div>
                            <br/><br/>
                            <label>Valor:</label>
                            <input type="text" v-model="bill.value"/>
                            <br/><br/>  
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model="bill.done"> Marcar conta como Paga
                                </label>
                            </div>
                            <input type="submit" value="Enviar"/>
                        </form>     
                    </div>
                </div>
`,
    props: ['bill', 'formType'],
    data: function () {
        return {
            names: [
                'Conta de Luz',
                'Conta de Água',
                'Conta de Telefone',
                'Supermercado',
                'Conta de Água',
                'Empréstimo',
                'Gasolina'
            ],
        }
    },
    methods: {
        submit: function () {
            if (this.formType == 'insert') {
                // this.$parent.$children[1].bills.push(this.bill);
                this.$parent.$refs.billList.bills.push(this.bill);
            }
            ;
            this.bill = {
                date_due: "",
                name: "",
                value: 0,
                done: 0
            }

            this.$parent.activedView = 0;
        }
    }
});


var appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent
    },
    template:
            `
    <style type="text/css">
            .pago{
                color:green;
            }
            .naoPago{
                color:red;
            }
            .cinza{
                color: gray;
            }
            body{
                background-color: #16a085;
                background-image: url('imgs/logo-vueJs.png');
            }
        </style>
     <menu-component></menu-component>
     
        <div class="container">

            <!-- Main component for a primary marketing message or call to action -->
            <div class="jumbotron">
                <h2>{{title}}</h2>
                
                <!-- Listagem -->
                <div v-show="activedView == 0">    
                <bill-list-component v-ref:bill-list></bill-list-component>
                <!-- /Listagem -->
                </div>
                
            <!-- Cadastro -->
            <div v-show="activedView == 1">
                <bill-create-component v-bind:bill.sync="bill" v-bind:form-type="formType"></bill-create-component>
            </div>
            <!-- /Cadastro -->                
        </div>        

    </div> <!-- /container -->
 `,
    data: function () {
        return {
            title: "Controle de Contas a pagar",
            activedView: 0,
            menus: [
                {id: 0, name: "Listar Contas"},
                {id: 1, name: "Criar Conta"}
            ],
            formType: 'insert',
            bill: {
                date_due: "",
                name: "",
                value: 0,
                done: 0
            }

        }
    }
    ,
    computed: {
        status: function () {
            var billList = this.$refs.billList;
            //if (!billList.bills.length) {
            if (!this.$refs.billList.bills.length) {
                return false;
            }
            var count = 0;
            for (var i in billList.bills) {
                if (!billList.bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    }
    ,
    methods: {},
    events:{
        'change-activedView' : function(activedView){
            this.activedView = activedView;
        },
        'change-formType' : function(formType){
            this.formType = formType;
        }
    }
});
/*registro Componente*/
Vue.component('app-component', appComponent);
/*Aplicação Vue.js*/
var app = new Vue({
    el: "#appVue",
});

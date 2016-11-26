var app = new Vue({
    el: "#appVue",
    data: {
        title: "Contas a pagar",
        activedView: 0,
        menus: [
            {id: 0, name: "Listar Contas"},
            {id: 1, name: "Criar Conta"}
        ]
    },
    methods: {
        showView: function(id) {            
            this.activedView = id;
        }
    }
});



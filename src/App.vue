<template>
    <section id="app">
        <div v-if="loading" class="loading">Loading&#8230;</div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="!loading">
            <p class="logo">placardacopa</p>
        </nav>
        <div class="container-fluid">
            <div class="row relative" id="box-info">
                <img id="img-box-info" width="100%" height="100%">
                <div class="caption">
                    <p>Acompanhe aqui os resultados da Copa da Rússia 2018!</p>
                    <button v-scroll-to="'#box-results-table'" role="button" class="btn btn-success">Confira!</button>
                </div>
            </div>
            <div class="row relative" id="box-how-it-works">
                <div class="col">
                    <div class="caption">
                        <p class="text-success">COMO FUNCIONA</p>
                        <p class="lead">Veja os resultados em tempo real!</p>
                        <p class="sideline">Abaixo você consegue visualizar os resultados de todos os jogos e até simular a final da Copa</p>
                    </div>
                </div>
                <div class="col">
                    <img id="img-how-it-works" width="100%" height="100%">
                </div>
            </div>
            <div class="row" id="box-results-table">
                <p class="lead">Resultado dos Jogos</p>
                <div class="row relative">
                    <phase id="id-phase" v-if="!loading" />
                </div>
            </div>
            <div class="row" id="box-share-with-friends">
                <p class="lead">Compartilhe com seus amigos!</p>
                <p class="sideline-lead">Traga seus amigos para ver os resultados dos jogos</p>
                <div class="row share-icons">
                    <div class="col">
                        <a href="#"><img src="../public/images/icon-facebook.png"></a>
                    </div>
                    <div class="col">
                        <a href="#"><img src="../public/images/icon-twitter.png"></a>
                    </div>
                    <div class="col">
                        <a href="#"><img src="../public/images/icon-rss.png"></a>
                    </div>
                    <div class="col">
                        <a href="#"><img src="../public/images/icon-instagram.png"></a>
                    </div>
                    <div class="col">
                        <a href="#"><img src="../public/images/icon-google.png"></a>
                    </div>
                </div>
                <p class="sideline-icons">BOLAOCOPA 2018</p>
            </div>
        </div>
    </section>
</template>

<script>
    import Phase from './views/Phase.vue';
    export default {
        computed: {
            loading() {
                return this.$store.state.Data.loading;
            },
        },
        created() {
            this.$store.dispatch('loadData');
            this.$store.dispatch('setDate');
            this.timer = setInterval(this.updateMatches.bind(this), 300000);
        },
        methods: {
            updateMatches() {
                this.$store.dispatch('updateMatches');
            },
            cancelAutoUpdate() {
                clearInterval(this.timer);
            },
        },
        beforeDestroy() {
            this.cancelAutoUpdate();
        },
        components: {
            Phase,
        },
    };
</script>

<template>
    <tr :class="startedclass" :id="'match_' + game.getId()">
        <td :class="gameclass + '--date'" class="text-center moment-date" :title="titledate" v-text="viewDate"></td>
        <td :class="homeclass + ' ' + gameclass + '--hometeam'" class="text-right">
            <teamname :team="game.getHomeTeam()"></teamname>
            <label :class="gameclass + '--label'">
                <input @blur="setResult" :id="'match-' + game.getId() + '-result-home'" data-type="home" type="text" :class="gameclass + '--result'" :value="game.getHomeResult()">
            </label>
        </td>
        <td :class="gameclass + '--spacer'" class="text-center" :title="game.getStadium().getName()">
            <small v-text="'Jogo ' + game.getId()"></small>
        </td>
        <td :class="awayclass + ' ' + gameclass + '--awayteam'">
            <label :class="gameclass + '--label'">
                <input @blur="setResult" :id="'match-' + game.getId() + '-result-away'" data-type="away" type="text" :class="gameclass + '--result'" :value="game.getAwayResult()">
            </label>
            <teamname :team="game.getAwayTeam()"></teamname>
        </td>
    </tr>
</template>

<script>
    import { mapMutations } from 'vuex';
    import MatchModel from '../Model/match';
    import GroupModel from '../Model/group';
    import Teamname from './Teamname.vue';
    import functions from '../static';

    export default {
        props: {
            group: {
                type: GroupModel,
                required: false,
            },
            game: {
                type: MatchModel,
                required: true,
            },
            gametype: {
                type: String,
                required: true,
                default: 'groups',
            },
        },
        methods: {
            ...mapMutations([
                'SET_GROUP_MATCH_RESULT',
                'SET_KNOCKOUT_MATCH_RESULT',
            ]),
            setResult(e) {
                let otherobject;
                let awayscore;
                let homescore;
                if (e.target.dataset.type === 'home') {
                    homescore = e.target.value.trim();
                    otherobject = document.getElementById('match-' + this.game.getId() + '-result-away');
                    awayscore = otherobject.value.trim();
                } else {
                    awayscore = e.target.value.trim();
                    otherobject = document.getElementById('match-' + this.game.getId() + '-result-home');
                    homescore = otherobject.value.trim();
                }

                if ((awayscore && homescore) || awayscore === '' && homescore === '') {
                    if (awayscore === '' && homescore === '') {
                        awayscore = null;
                        homescore = null;
                    }

                    if (this.gametype === 'groups') {
                        this.SET_GROUP_MATCH_RESULT({
                            matchData: this.game,
                            groupData: this.group,
                            homescore,
                            awayscore,
                        });
                    } else {
                        this.SET_KNOCKOUT_MATCH_RESULT({
                            matchData: this.game,
                            homescore,
                            awayscore,
                        });
                    }
                }
            },
        },
        computed: {
            gameclass() {
                if (this.gametype !== 'groups') {
                    return 'table-knockouts';
                }
                return 'table-' + this.gametype;
            },
            viewDate() {
                return this.game.getDate().from(this.$store.state.Time.now)
                    .replace('days', 'dias').replace('a day', '1 dia')
                    .replace('hours', 'horas').replace('an hour', '1 hora')
                    .replace('minutes', 'minutos').replace('a minute', '1 minuto')
                    .replace('ago', 'atrás').replace('in ', 'daqui a ');
            },
            titledate() {
                return functions.titleDate(this.game.getDate());
            },
            startedclass() {
                return this.game.isStarted() ? this.gameclass + '--started' : '';
            },
            homeclass() {
                if (this.game.isFinish()) {
                    if (this.game.getHomeResult() === this.game.getAwayResult()) {
                        return this.gameclass + '--draw';
                    }
                    if (this.game.getHomeResult() > this.game.getAwayResult()) {
                        return this.gameclass + '--winner';
                    }
                    if (this.game.getHomeResult() < this.game.getAwayResult()) {
                        return this.gameclass + '--loser';
                    }
                }
                return '';
            },
            awayclass() {
                if (this.game.isFinish()) {
                    if (this.game.getHomeResult() === this.game.getAwayResult()) {
                        return this.gameclass + '--draw';
                    }
                    if (this.game.getHomeResult() < this.game.getAwayResult()) {
                        return this.gameclass + '--winner';
                    }
                    if (this.game.getHomeResult() > this.game.getAwayResult()) {
                        return this.gameclass + '--loser';
                    }
                }
                return '';
            },
        },
        components: {
            Teamname,
        },
    };
</script>

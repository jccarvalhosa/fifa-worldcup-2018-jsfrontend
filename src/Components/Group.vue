<template>
    <article class="col">
        <div class="card card--group">
            <div class="card-header">Grupo {{ group.getDisplayName() }}</div>
            <table class="table-bordered" v-if="withstanding">
                <thead>
                <tr>
                    <th scope="col">&nbsp;</th>
                    <th scope="col" class="text-center"><abbr title="Pontuação">P</abbr></th>
                    <th scope="col" class="text-center"><abbr title="Jogos">J</abbr></th>
                    <th scope="col" class="text-center"><abbr title="Vitórias">V</abbr></th>
                    <th scope="col" class="text-center"><abbr title="Empates">E</abbr></th>
                    <th scope="col" class="text-center"><abbr title="Derrotas">D</abbr></th>
                    <th scope="col" class="text-center"><abbr title="Gols Pro">GP</abbr></th>
                    <th scope="col" class="text-center"><abbr title="Gols Contra">GC</abbr></th>
                    <th scope="col" class="text-center"><abbr title="Saldo de Gols">SG</abbr></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(standing, index) in group.getStandings()" :key="index" :class="standingpositon(index)">
                    <td><teamname :team="standing.getTeam()"></teamname></td>
                    <td class="text-center">{{ standing.getPoints() }}</td>
                    <td class="text-center">{{ standing.getPlayed() }}</td>
                    <td class="text-center">{{ standing.getWins() }}</td>
                    <td class="text-center">{{ standing.getDraws() }}</td>
                    <td class="text-center">{{ standing.getLosts() }}</td>
                    <td class="text-center">{{ standing.getGoalsFor() }}</td>
                    <td class="text-center">{{ standing.getGoalsAgainst() }}</td>
                    <td class="text-center">{{ standing.getGoalsDifference() }}</td>
                </tr>
                </tbody>
            </table>
            <div class="card-footer p-0">
                <table class="table-groups">
                    <tbody :class="[show ? 'tbody--open' : 'tbody--close']">
                        <match v-for="(match, index) in group.getMatches()" :group="group" :game="match" :gametype="'groups'" :key="index"></match>
                    </tbody>
                </table>
                <button v-if="withstanding" @click="isShow = !isShow" type="button" :class="[show ? 'close--close' : 'close--plus']" class="close"><span></span></button>
            </div>
        </div>
    </article>
</template>

<script>
    import GroupModel from '../Model/group';
    import Teamname from './Teamname.vue';
    import Match from './Match.vue';
    export default {
        data() {
            return {
                isShow: false,
            };
        },
        methods: {
            standingpositon(index) {
                return index === 0 ? 'table-success' : index === 1 ? 'table-info' : '';
            },
        },
        computed: {
            show() {
                if (!this.withstanding) {
                    return true;
                }
                return this.isShow;
            },
        },
        props: {
            withstanding: {
                type: Boolean,
                required: false,
                default: true,
            },
            group: {
                type: GroupModel,
                required: true,
            },
        },
        components: {
            Teamname,
            Match,
        },
    };
</script>

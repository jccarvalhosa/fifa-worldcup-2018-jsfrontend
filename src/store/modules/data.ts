import DataParser from '@/Parser/data';
import AppModel from '@/Model/app';
import KnockoutModel from '@/Model/knockout';
import MatchModel from '@/Model/match';
import GroupParser from '@/Parser/group';
import GroupModel from '@/Model/group';
import KnockoutParser from '@/Parser/knockout';

const DATAURL = 'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json';

const state = {
    loading: true as boolean,
    data: null as AppModel,
};

const getters = {};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const actions = {
    loadData({commit}: {commit: any}) {
        commit('LOADING', true);
        fetch(DATAURL)
            .then((response) => {
                return response.json();
            })
            .then( (json) => {
                return DataParser.parse(json);
            })
            .then((data: AppModel) => {
                wait(0).then(() => {
                    commit('LOAD_DATA', data);
                    commit('LOADING', false);
                });
            })
        ;
    },
    updateMatches({commit}: {commit: any}) {
        fetch(DATAURL)
            .then((response) => {
                return response.json();
            })
            .then( (json) => {
                const mutations = {
                    group: [],
                    knockout: [],
                };

                const groupdata = json.groups;
                Object.keys(groupdata).forEach((key) => {
                    const group = state.data.getGroups().find((g: GroupModel) => {
                        return g.getName() === key;
                    });

                    if (!group) {
                        throw new Error('Group not found:' + key);
                    }

                    groupdata[key].matches.forEach((match: any) => {
                        const groupMatch = group.getMatches().find((m: MatchModel) => {
                            return m.getId() === match.name;
                        });
                        if (groupMatch.isStarted() &&
                            (match.home_result !== groupMatch.getHomeResult() || match.away_result !== groupMatch.getAwayResult())) {

                            mutations.group.push({
                                groupData: group,
                                matchData: groupMatch,
                                awayscore: match.away_result,
                                homescore: match.home_result,
                            });
                        }
                    });
                });

                const phases = json.knockout;
                Object.keys(phases).forEach((key) => {
                    const knockout = state.data.getKnockouts().find((k: KnockoutModel) => {
                        return k.getId() === key;
                    });
                    if (!knockout) {
                        throw new Error('Knockout not found: ' + key);
                    }
                    phases[key].matches.forEach((match: any) => {
                        const phaseMatch = knockout.getMatches().find((m: MatchModel) => {
                            return m.getId() === match.name;
                        });

                        if (phaseMatch.isStarted() &&
                            (match.home_result !== phaseMatch.getHomeResult() || match.away_result !== phaseMatch.getAwayResult())) {

                            mutations.knockout.push({
                                matchData: phaseMatch,
                                awayscore: match.away_result,
                                homescore: match.home_result,
                            });
                        }
                    });
                });

                return mutations;
            })
            .then((mutations: any) => {
                wait(0).then(() => {
                    for (const payload of mutations.group) {
                        commit('SET_GROUP_MATCH_RESULT', payload);
                    }
                    for (const payload of mutations.knockout) {
                        commit('SET_KNOCKOUT_MATCH_RESULT', payload);
                    }
                });
            })
        ;
    },
};

const mutations = {
    ['LOADING'](state: any, payload: any) {
        state.loading = payload;
    },
    ['LOAD_DATA'](state: any, payload: any) {
        state.data = payload;
    },
    ['SET_KNOCKOUT_MATCH_RESULT'](state: any, payload: any) {
        payload.matchData.setAwayResult(payload.awayscore);
        payload.matchData.setHomeResult(payload.homescore);
        KnockoutParser.updateKnockouts(state.data);
    },
    ['SET_GROUP_MATCH_RESULT'](state: any, payload: any) {
        payload.matchData.setAwayResult(payload.awayscore);
        payload.matchData.setHomeResult(payload.homescore);
        GroupParser.updateStandings(payload.groupData);
        KnockoutParser.updateKnockouts(state.data);
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};

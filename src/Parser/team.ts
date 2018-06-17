import TeamModel from '@/Model/team';

class TeamParser {
    public static parse(teams: any[]) {
        teams.forEach((team: any) => {
            TeamParser.teams.push(new TeamModel(team.id, TeamParser.nameTranslation[team.name] || team.name, team.iso2));
        });
    }

    public static getTeam(team: number): TeamModel|undefined {
        return TeamParser.teams.find( (model) => model.getId() === team);
    }

    private static teams: TeamModel[] = [];

    private static nameTranslation: { [key: string]: string } = {
        'Russia': 'Rússia',
        'Uruguay': 'Uruguai',
        'Egypt': 'Egito',
        'Saudi Arabia': 'Arábia Saudita',
        'Iran': 'Irã',
        'Portugal': 'Portugal',
        'Spain': 'Espanha',
        'Morocco': 'Marrocos',
        'France': 'França',
        'Denmark': 'Dinamarca',
        'Australia': 'Austrália',
        'Peru': 'Peru',
        'Croatia': 'Croácia',
        'Argentina': 'Argentina',
        'Iceland': 'Islândia',
        'Nigeria': 'Nigéria',
        'Brazil': 'Brasil',
        'Switzerland': 'Suíça',
        'Costa Rica': 'Costa Rica',
        'Serbia': 'Sérvia',
        'Germany': 'Alemanha',
        'Mexico': 'México',
        'Sweden': 'Suécia',
        'South Korea': 'Coréia do Sul',
        'Belgium': 'Bélgica',
        'Panama': 'Panamá',
        'Tunisia': 'Tunísia',
        'England': 'Inglaterra',
        'Poland': 'Polônia',
        'Senegal': 'Senegal',
        'Colombia': 'Colômbia',
        'Japan': 'Japão',
    };
}

export default TeamParser;

const API_TOKEN = 'e74ec3e014004fbd8ed9d8cf229f496b';
// const API_TOKEN = 'c5e88bbe52cd43a39b1d2a92cc2608c3'
// const API_TOKEN = '8d29912a56f4452fa446f76ed27bf32b';
const URL_MATCH_DAY = 'https://api.football-data.org/v2/competitions/PL/matches?matchday=';

const URL_TOP_GOALS = 'https://api.football-data.org/v2/competitions/';
const TOUR = document.querySelector('#current-tour');
let containerMatches = document.querySelector('#list-matches');

const getResource = async (url) => {
    try {
        const res = await fetch(url, {
            headers: {
                'X-Auth-Token': API_TOKEN
            }
        });
        return res.json();
    } catch (err) {
        throw new Error(`!!!!!!!!!!! ${err}`)
    }
}

const getMathesInfo = async (tour = 1) => {
    const result = await getResource(`${URL_MATCH_DAY}${tour}`);
    console.log(result);
    return result;
}

const togglePreloader = () => {
    const preloader = document.querySelector('.wrap-preloader');
    preloader.classList.toggle('preloader-show');
}

const renderMatches = async () => {
    const currentTour = document.querySelector('#current-tour').value;
    togglePreloader();
    const dataMatches = await getMathesInfo(currentTour);


    containerMatches.innerHTML = '';
    dataMatches.matches.forEach((matchItem) => {

        containerMatches.innerHTML += `
        <a href="#!" class="collection-item">
            <span class="badge">${matchItem.score.fullTime.awayTeam === null ? '-' : matchItem.score.fullTime.awayTeam}</span>
            <span class="badge">${matchItem.score.fullTime.homeTeam === null ? '-' : matchItem.score.fullTime.homeTeam}</span>
        Home:${matchItem.homeTeam.name} -
        Away:${matchItem.awayTeam.name} </a>
        `
    });

    setTimeout(togglePreloader, 500);
}
renderMatches();

document.querySelector('#current-tour').addEventListener('change', renderMatches)


const bottons = document.getElementById('league-wrap');
bottons.addEventListener('click', function (e) {
    let data = 0;
    data = e.target.dataset.league;
    getScoresTop(data)
})

const getScoresTop = async (id) => {
    togglePreloader();
    const result = await getResource(`${URL_TOP_GOALS}${id}/scorers`);
    console.log(result);
    containerMatches.innerHTML = '';
    let counter = 1;
    result.scorers.forEach(item => {
        containerMatches.innerHTML += `
        <a href="#!" class="collection-item">
            <span class="badge">Количество голов: ${item.numberOfGoals}</span> ${counter}. 
        ${item.player.name}</a>
        `
        counter++;
    })
}
document.querySelector('.results').addEventListener('click', () => {
    renderMatches();
})

getMathesInfo();
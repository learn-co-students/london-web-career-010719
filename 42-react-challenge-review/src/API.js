const botsUrl = 'https://bot-battler-api.herokuapp.com/api/v1/bots'

export const getBots = () => fetch(botsUrl)
    .then(res => res.json())

export default {
    getBots
}
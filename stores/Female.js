import { defineStore } from 'pinia'

export const useFemaleStore = defineStore('female', () => {
    const lists = reactive([
        //Aespa
        { src: '/img/female/karina.jpg', name: 'karina', group: 'Aespa' },
        { src: '/img/female/winter.jpg', name: 'winter', group: 'Aespa' },
        { src: '/img/female/ningning.jpeg', name: 'ningning', group: 'Aespa' },
        { src: '/img/female/giselle.jpg', name: 'giselle', group: 'Aespa' },

    ])

    return {
        lists,
    }
})
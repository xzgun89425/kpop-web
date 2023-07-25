import { defineStore } from 'pinia'

export const useBandStore = defineStore('band', () => {
    const lists = reactive([
        //(G)-IDLE
        { playlist: 'umkioXMEVm0', start: '1', song: 'I Do', name: '(G)-IDLE' },
        { playlist: '7HDeem-JaSY', start: '1', song: 'QueenCard', name: '(G)-IDLE' },
        { playlist: 'fCO7f0SmrDc', start: '1', song: 'Nxde', name: '(G)-IDLE' },
        { playlist: 'Jh4QFaPmdss', start: '1', song: 'TomBoy', name: '(G)-IDLE' },
        { playlist: '6oanIo_2Z4Q', start: '1', song: 'Line', name: '(G)-IDLE' },
        { playlist: '9mQk7Evt6Vs', start: '1', song: 'Latata', name: '(G)-IDLE' },
        { playlist: 'Si5pQHRRH5w', start: '1', song: 'My Bag', name: '(G)-IDLE' },
        { playlist: 'om3n2ni8luE', start: '1', song: 'Latata', name: '(G)-IDLE' },
        { playlist: 'I66oFXdf0KU', start: '1', song: 'Uh Oh', name: '(G)-IDLE' },
        { playlist: 'iOoeLYqx3yI', start: '1', song: 'All Night', name: '(G)-IDLE' },
        { playlist: '2cevbhEqQF4', start: '1', song: 'Senorita', name: '(G)-IDLE' },
        //Aespa
        { playlist: 'Os_heh8vPfs', start: '1', song: 'Spicy', name: 'Aespa' },
        { playlist: 'dYRITmpFbJ4', start: '1', song: 'Girls', name: 'Aespa' },
        { playlist: '4TWR90KJl84', start: '1', song: 'Next Level', name: 'Aespa' },
        { playlist: 'K8P_p4j9T38', start: '1', song: 'Thirsty', name: 'Aespa' },
        { playlist: 'BpCvYeK5hcE', start: '1', song: 'Illusion', name: 'Aespa' },
        { playlist: 'ZeerrnuLi5E', start: '1', song: 'Black Mamba', name: 'Aespa' },
        { playlist: 'WPdWvnAAurg', start: '1', song: 'Savage', name: 'Aespa' },
        { playlist: 'sORkB5o3b6o', start: '1', song: 'Salty & Sweet', name: 'Aespa' },
        //IVE
        { playlist: 'pG6iaOMV46I', start: '1', song: 'Kitsch', name: 'IVE' },
        { playlist: '6ZUIwj3FgUY', start: '1', song: 'I Am', name: 'IVE' },
        { playlist: 'Y8JFxS1HlDo', start: '1', song: 'Love dive', name: 'IVE' },
        { playlist: 'F0B7HDiY-10', start: '1', song: 'After LIKE', name: 'IVE' },
        { playlist: '--FmExEAsM8', start: '1', song: 'Eleven', name: 'IVE' },
        { playlist: 'qD1kP_nJU3o', start: '1', song: 'Wave', name: 'IVE' },
        { playlist: 'okVTSehE414', start: '1', song: 'I Want', name: 'IVE' },
        //NewJeans
        { playlist: 'sVTy_wmn5SU', start: '1', song: 'OMG', name: 'NewJeans' },
        { playlist: 'Km71Rr9K-Bw', start: '1', song: 'Ditto', name: 'NewJeans' },
        { playlist: 'lgfXrQUx4go', start: '1', song: 'Attention', name: 'NewJeans' },
        { playlist: 'S4UEJePR0UE', start: '1', song: 'Hype Boy', name: 'NewJeans' },
        { playlist: 'VOmIplFAGeg', start: '1', song: 'Cookie', name: 'NewJeans' },
        { playlist: 'V4p1OiYtqBU', start: '1', song: 'Super Shy', name: 'NewJeans' },
        { playlist: 'G8GEpK7YDl4', start: '1', song: 'New jeans', name: 'NewJeans' },
        { playlist: 'ZUgdQpbtP4Q', start: '1', song: 'Cool with you', name: 'NewJeans' },
        { playlist: 'DfX4F5a6JE8', start: '1', song: 'ETA', name: 'NewJeans' },
        { playlist: 'dJdqn5v4Dkw', start: '1', song: 'ASAP', name: 'NewJeans' },
        //ITZY
        { playlist: 'zugAhfd2r0g', start: '1', song: 'Cheshire', name: 'ITZY' },
        { playlist: 'MjCZfZfucEc', start: '1', song: 'Loco', name: 'ITZY' },
        { playlist: 'wTowEKjDGkU', start: '1', song: 'Not Shy', name: 'ITZY' },
        { playlist: 'fE2h3lGlOsk', start: '1', song: 'WANNABE', name: 'ITZY' },
        { playlist: 'Hbb5GPxXF1w', start: '1', song: 'Sneakers', name: 'ITZY' },
        { playlist: '_ysomCGaZLw', start: '1', song: 'Mafia In the morning', name: 'ITZY' },
        { playlist: 'd0_S1zve8HU', start: '1', song: 'Sorry Not Sorry', name: 'ITZY' },
        { playlist: 'RmTq3cJqyCo', start: '1', song: 'Bet on me', name: 'ITZY' },
        { playlist: '4zwHs2QMvzY', start: '1', song: 'None of My Business', name: 'ITZY' },
        //Le sserafim
        { playlist: 'dZs_cLHfnNA', start: '1', song: "eve psyche and bluebeard's wife", name: 'Le sserafim' },
        { playlist: 'pyf8cbqyfPs', start: '1', song: 'Antifragile', name: 'Le sserafim' },
        { playlist: 'UBURTj20HXI', start: '1', song: 'Unforgiven', name: 'Le sserafim' },
        { playlist: '4vbDFu0PUew', start: '1', song: 'Fearless', name: 'Le sserafim' },
        { playlist: 'j73Q_dsLXoQ', start: '1', song: 'Blue Flame', name: 'Le sserafim' },
        //IZ*ONE
        { playlist: 'G8GaQdW2wHc', start: '1', song: 'Panorama', name: 'IZ*ONE' },
        { playlist: 'IB_id33fYhc', start: '1', song: 'FIESTA ', name: 'IZ*ONE' },
        { playlist: '6eEZ7DJMzuk', start: '1', song: 'Violeta ', name: 'IZ*ONE' },
        { playlist: 'nnVjsos40qk', start: '1', song: 'Secret Story of the Swan ', name: 'IZ*ONE' },
        //FIFTY FIFTY
        { playlist: 'Qc7_zRjH808', start: '1', song: 'Cupid', name: 'FIFTY FIFTY' },
        //Nmixx
        { playlist: '3GWscde8rM8', start: '1', song: 'O.O', name: 'NMIXX' },
        { playlist: 'p1bjnyDqI9k', start: '1', song: 'Dice', name: 'NMIXX' },
        { playlist: 'EDnwWcFpObo', start: '1', song: 'Love me like this', name: 'NMIXX' },
        //Blackpink
        { playlist: '2S24-y0Ij3Y', start: '1', song: 'Kill This Love', name: 'Blackpink' },
        { playlist: 'IHNzOHi8sJs', start: '1', song: 'DDU-DU DDU-DU', name: 'Blackpink' },
        { playlist: 'ioNng23DkIM', start: '1', song: 'How You Like That', name: 'Blackpink' },
        { playlist: 'POe9SOEKotk', start: '1', song: 'Shut Down', name: 'Blackpink' },
        { playlist: 'gQlMMD8auMs', start: '1', song: 'Pink Venom', name: 'Blackpink' },
        { playlist: 'bwmSjveL3Lc', start: '1', song: 'BOOMBAYAH', name: 'Blackpink' },
        { playlist: '9pdj4iJD08s', start: '1', song: 'PLAYING WITH FIRE', name: 'Blackpink' },
        { playlist: 'oMsizmQ9l5c', start: '1', song: 'Typa Girl', name: 'Blackpink' },
        { playlist: 'wlzGXcTzdzU', start: '1', song: 'Love To Hate Me', name: 'Blackpink' },
        { playlist: 'dyRsYk0LyA8', start: '1', song: 'Lovesick Girls', name: 'Blackpink' },
        { playlist: 'POqmmUNX4lA', start: '1', song: 'Hard to Love', name: 'Blackpink' },
        { playlist: 'dISNgvVpWlo', start: '1', song: 'WHISTLE', name: 'Blackpink' },
        //Solo
        { playlist: 'ymRXmknaNiI', start: '1', song: 'No one', name: 'Lee hi' },
        { playlist: '3sCZKrxCWMo', start: '1', song: 'Knock', name: 'LEE CHAE YEON' },
    ])

    return {
        lists,
    }
})
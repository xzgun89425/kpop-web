import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', () => {
    const testlist = reactive([
        { id: 'kpop-girls', testName: '韓國女團必聽金曲猜歌測驗', img: 'female/karina.jpg', detail: '測驗聽到歌曲後你能多快選出正確的歌曲名稱及團體，考驗平時的學習量。依照題數及總時間去計算平均每題的猜題時間，得出你是女團博士還是碩士！', device: 'desktop', level: '中', name: '女團', title: 'KPOP' },
        { id: 'kpopTop100', testName: '2023韓國K-POP猜歌測驗(南韓百大熱門+韓國流行樂大集合)', img: 'female/winter.jpg', detail: '測驗聽到歌曲後你能多快選出正確的歌曲名稱及團體，考驗平時的學習量。依照題數及總時間去計算平均每題的猜題時間，得出你是女團博士還是碩士！', device: 'desktop', level: '難', name: '女團', title: 'KPOP', },
        { id: 'jaychou', testName: '周杰倫猜歌測驗', img: 'male/jaychou.png', detail: '測驗聽到歌曲後你能多快選出正確的歌曲名稱，考驗平時的學習量。依照題數及總時間去計算平均每題的猜題時間，得出你是周博士還是周碩士！', device: 'desktop', level: '難', name: '周', title: '周杰倫', },
        { id: 'taiwanband', testName: '台灣獨立樂團猜歌測驗', img: 'group/taiwanband.jpg', detail: '測驗聽到歌曲後你能多快選出正確的歌曲名稱，考驗平時的學習量。依照題數及總時間去計算平均每題的猜題時間，得出你的獨立樂團牌位！', device: 'desktop', level: '難', name: '台灣獨立樂團', title: '台灣獨立樂團' },
        { id: 'anime', testName: '動漫猜歌測驗', img: 'female/anime.jpg', detail: '測驗聽到歌曲後你能多快選出正確的歌曲名稱，考驗平時的學習量。依照題數及總時間去計算平均每題的猜題時間，得出你的動漫牌位！', device: 'desktop', level: '難', name: '動漫', title: '動漫' },
        { id: 'tiktok', testName: '抖音熱門歌曲2023', img: 'group/tiktok.jpg', detail: '測驗聽到歌曲後你能多快選出正確的歌曲名稱，考驗平時的學習量。依照題數及總時間去計算平均每題的猜題時間，得出你的抖音牌位！', device: 'desktop', level: '難', name: '抖音熱門歌曲2023', title: '抖音熱門歌曲2023' },
        { id: 'kkbox', testName: 'KKBOX 歷年排行榜週冠軍歌曲', img: 'group/tiktok.jpg', detail: '測驗聽到歌曲後你能多快選出正確的歌曲名稱，考驗平時的學習量。依照題數及總時間去計算平均每題的猜題時間，得出你的抖音牌位！', device: 'desktop', level: '難', name: 'KKBOX 歷年排行榜週冠軍歌曲', title: 'KKBOX 歷年排行榜週冠軍歌曲' },
        { id: 'kai', testName: 'KAI猜歌專屬', img: 'female/karina.jpg', detail: '測驗聽到歌曲後你能多快選出正確的歌曲名稱，考驗平時的學習量。依照題數及總時間去計算平均每題的猜題時間，得出你的抖音牌位！', device: 'desktop', level: '難', name: 'KAI猜歌專屬', title: 'KAI猜歌專屬' },
    ])

    return {
        testlist,
    }
})
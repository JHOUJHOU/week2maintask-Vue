// 參考老師假日1/30直播講解作業撰寫
// 匯入Vue.js CDN套件，使用ESM，https://cdnjs.com/libraries/vue
// 盡可能使用單引號
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.prod.min.js';

// 查看API文件，建議使用前確認文件中API要如何使用
const url = 'https://vue3-course-api.hexschool.io/v2';

// Vue起手式 建立資料、方法、生命週期
const app = createApp({
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        // 登入
        login(){
            const apiUrl = `${url}/admin/signin`;
            axios.post(apiUrl,this.user)
                .then(res => {
                    // 登入註冊，會回應token，可以存起來，在期限內登入不用重新輸入帳密。
                    // 所以要取出 token , expired
                    const { token , expired } = res.data;
                    console.log(token , expired);
                    // 存取token , expired，expired是使用unix timestamp格式
                    // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
                    document.cookie = `jhouToken=${token}; expires=${new Date(expired)};`;
                    // 驗證成功轉址
                    window.location = './products.html';
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
});

app.mount('#app');

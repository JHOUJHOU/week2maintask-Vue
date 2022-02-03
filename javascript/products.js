// 參考老師假日1/30直播講解作業撰寫
// 匯入Vue.js CDN套件，使用ESM，https://cdnjs.com/libraries/vue
// 盡可能使用單引號
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.prod.min.js';

// 查看API文件，建議使用前確認文件中API要如何使用
const url = 'https://vue3-course-api.hexschool.io/v2';
const api_path = 'yusyuanjhou';

// Vue起手式 建立資料、方法、生命週期
const app = createApp({
    data() {
        return {
            // 定義資料
            products:[],
            // 點擊查看項目將產品存入
            tempProduct: {}
        }
    },
    methods: {
        checkLogin(){
        // 儲存token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)jhouToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 每次請求後都將token傳入到headers中
        axios.defaults.headers.common['Authorization'] = token;
        console.log(token);

        const apiUrl = `${url}/api/user/check`;
        axios.post(apiUrl)
            .then(() => {
                // console.log(res);
                // 觸發取得產品資訊
                this.getProducts();
            })
            .catch(err => {
                console.log(err);
            })
        },
        getProducts() {
            const apiUrl = `${url}/api/${api_path}/admin/products`;
            axios.get(apiUrl)
                .then(res => {
                    this.products = res.data.products;
                    // console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.checkLogin();
    }
});

app.mount('#app');

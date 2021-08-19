const { default: axios } = require("axios");
const QueryString = require("qs");
const coinbase = require('coinbase').Client;
const cb_client = new coinbase({
    apiKey:'W7Aw5mblAyDzOiYB',
    apiSecret:'gGJ956n4USRlMGEMharQI8hNTMcIKBha'
})

const SCRIPT_BTC = '2Mt3znbVWtZTEV5S6DAfgxadb9ZWoV2WsYu';
const API_KEY = "0x5883e0d5f3ed1e2ad14014884f230632f48d5871";
const SCRIPT_STRLY = "1b02af2c11d0c769589fc6cf76e309f7da1d2f08abff09a3ea767d1407ce43df";
const FLW_SEC_KEY = "FLWSECK-8ea67fd7d97a1cfb6b7f4ab0fb35d0d9-X";
const ROOT_URL = {
    STRATALY:'https://accounts.strata.ly/api',
    BLOCKCHAIN:'http://157.245.4.9/api',
    APP_SERVER:'http://64.227.4.126',
    REMITCABLE:'https://secure.remitcable.com/api'
}

module.exports = {
    login(data) {
        return axios.post(`${ROOT_URL.REMITCABLE}/login`, data)
    },
    register(data) {
        return axios.post(`${ROOT_URL.REMITCABLE}/register`, data)
    },
    convertRate(coin, api=false, amount=1) {
        var str2 = amount/coin.value
        let converted = `${parseFloat(str2).toFixed(7)}`;
        return !api ? `${converted}${coin.name}` : Number(converted)
    },
    async getUserDetails(param) {
        const token = param || window.localStorage.getItem('token');
        const response = await axios.get(`${ROOT_URL.REMITCABLE}/user`, { 
            headers: { Authorization: `Bearer ${token}` }
        })
        // console.log(response.data);
        const status = response.data.id
        if (status && status > 0) return response.data;
        else return false;
    },
    async getUserBalances(wallet) {
        const response = await axios.get(`${ROOT_URL.REMITCABLE}/whome/${wallet}`)
        console.log(response.data);
        return response.data;
    },
    async convertStrataToUsd(amount) {
        const response = await axios.get(`${ROOT_URL.STRATALY}/convert/STRLY/${amount}`);
        return response.data.data;
    },
    async convertUsdToStrata(amount) {
        const response = await axios.get(`${ROOT_URL.STRATALY}/convert/USD/${amount}`);
        return response.data.data;
    },
    async getRates() {
        const response = await axios.get(`${ROOT_URL.STRATALY}/value`);
        window.localStorage.setItem('rates', JSON.stringify(response.data.data))
        return response.data.data
    },
    async getChartData() {
        const response = await axios.get(`${ROOT_URL.STRATALY}/last_value_chart`);
        window.localStorage.setItem('chart_data', JSON.stringify(response.data.data))
        return response.data.data
    },
    async getWallet(address) {
        const response = await axios.get(`${ROOT_URL.STRATALY}/wallet/details/${address}`)
        return response.data.data;
    },
    async getGasFee(amount) {
        const response = await axios.get(`${ROOT_URL.STRATALY}/fees/${amount}`)
        return response.data.data;
    },
    async getPaymentSettings(user) {
        var query = QueryString.stringify(user)
        return await axios.get(`${ROOT_URL.APP_SERVER}/user-info?${query}`)
    },
    async setPaymentSettings(user, settings) {
        var obj = { wallet:user.walletAddress, email:user.email, option:settings.option, address:settings.address }
        var query = QueryString.stringify(obj)
        return await axios.get(`${ROOT_URL.APP_SERVER}/set-option?${query}`)
    },
    async sendTransaction(data) {
        const { recipient, amount, sender } = data;
        const recieve = recipient ? recipient : SCRIPT_STRLY;
        const response = await axios.get(`${ROOT_URL.STRATALY}/transfer/${API_KEY}/${sender}/${recieve}/${amount}`)
        return response.data;
    },
    topCoins: ['ETH','BTC','LTC','BCH'],
    async fetchAllCoins() {
        this.getRates();
        var allCoins = []
        const response = await axios.get(`https://api.coinbase.com/v2/prices/BTC-USD/spot`)

        let { data } = response.data;
        let coindata = { name:data.base, value:data.amount,long:'BITCOIN',img:'assets/img/logo-btc.png' }
        let coindata1 = { name:'STRLY', value:JSON.parse(localStorage.getItem('rates')).current_value,long:'STRATALY',img:'assets/img/logo-icon.png' }
        allCoins.push(coindata)
        allCoins.push(coindata1)
        return allCoins;
        return [{name:'BTC',value:32800,img:'assets/img/logo-icon.png',long:'BITCOIN'}]
    },
    async coinBalance(coin, auth) {
        switch (coin) {
            case 'BTC':
                const response = await axios.get(`${ROOT_URL.REMITCABLE}/btc/get/balance/${auth.id}`);
                return response.data;
            case 'STRLY':
                const res = await this.getWallet(auth.walletAddress);
                let result = await this.convertStrataToUsd(res.balance)
                let obj = {...res,usdBalance:result}
                return obj
        }
    },
    async validateExchangeAddress(user, coin, address) {
        switch (coin) {
            case 'BTC':
                // const response = await axios.get(`http://api.smartbit.com.au/v1/blockchain/address/${address}`)
                const response = await axios.get(`${ROOT_URL.REMITCABLE}/btc/verify/address/${user.id}/${address}`)
                return response.data.isValid
            case 'STRLY':
                const res = await this.getWallet(address);
                return res.address ? true : false;
        }
    },
    async sendBtc(user, amount, receiver=SCRIPT_BTC) {
        const response = await axios.get(`${ROOT_URL.REMITCABLE}/btc/send/${user.id}/${amount}/${receiver}`)
        return response.data;
    },
    async swapCoins(user, from_coin, exchange_coin, amount, exchange_amount) {
        const url = `${ROOT_URL.REMITCABLE}/exchange/${from_coin}/${exchange_coin}/${user.id}/${amount}/${exchange_amount}`
        const response = await axios.get(url)
        return response.data;
    },
    async getBtcUserLogs(user) {
        const response = await axios.get(`${ROOT_URL.REMITCABLE}/btc/transactions/${user.id}`)
        let tr_arr = [];
        let address = response.data[0];
        let { transactions } = response.data[1];
        transactions.forEach(tr => {
            // console.log(tr.outputs.filter(out => out.address == address))
            var outputs = tr.outputs.find(out => out.address == address);
            // console.log(outputs);
            var str = outputs ? outputs.address : tr.outputs[0].address

            let obj = { value:(tr.outputs[0].value/100000000),from:tr.inputs[0].address,to:str }
            tr_arr.push(obj)
        })
        return tr_arr;
    }
}
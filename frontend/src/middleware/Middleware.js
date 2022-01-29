let metamaskAccount = null

export default {
    getAccount() {
        return metamaskAccount
    },
    setAccount(account) {
        metamaskAccount = account
    }
}
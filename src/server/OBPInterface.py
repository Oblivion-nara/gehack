import requests

class OBJInterface:

    def __init__(self):
        self.bankID = -1
        self.accountID = -1

    def getBankID(self):
        return self.bankID

    def getAccountID(self):
        return self.accountID

    def getRequest(uri):
        r = request.get("https://apisandbox.openbankproject.com/obp/v2.2.0" + uri)
        r.status_code
        r.headers['content-type']
        r.encoding
        r.text
        return r.json()

    def root():
        return getRequest("/root")

    def getBanks():
        return getRequest("/banks")

    def getBank(self, bankID):
        self.bankID = bankID
        return getRequest("/banks/" + bankID)

    def getAccount(self, accountID):
        self.accountID = accountID
        return getRequest("/my/banks/" + self.bankID + "/accounts/" + accountID + "/account")

    def getTransactions(self):
        getRequest("/my/" + self.bankID + "/rbs/accounts/" + self.accountID + "/transactions")

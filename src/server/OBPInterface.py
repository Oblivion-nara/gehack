import requests

class OBPInterface:

    def __init__(self):
        self.bankID = -1
        self.accountID = -1

    def getBankID(self):
        return self.bankID

    def setBankID(self, bankID):
        self.bankID = bankID

    def getAccountID(self):
        return self.accountID

    def setAccountID(self, accountID):
        self.accountID = accountID

    def getRequest(self, uri):
        r = request.get("https://apisandbox.openbankproject.com/obp/v2.2.0" + uri)
        r.status_code
        r.headers['content-type']
        r.encoding
        r.text
        return r.json()

    def root(self):
        return getRequest("/root")

    def getBanks(self):
        return getRequest("/banks")

    def getBankDetails(self):
        return getRequest("/banks/" + bankID)

    def getAccountDetails(self):
        return getRequest("/my/banks/" + self.bankID + "/accounts/" + accountID + "/account")

    def getTransactions(self):
        getRequest("/my/" + self.bankID + "/rbs/accounts/" + self.accountID + "/transactions")

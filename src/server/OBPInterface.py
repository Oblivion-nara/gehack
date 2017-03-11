import requests

class OBPInterface:

    def __init__(self):
        self.bankID = 0
        self.accountID = 0

    def getRequest(self, uri):
        r = requests.get("https://apisandbox.openbankproject.com/obp/v2.2.0" + uri)
        # r.status_code
        # r.headers['content-type']
        # r.encoding
        # r.text
        return r.json()

    def root(self):
        return self.getRequest("/root")

    def getBanks(self):
        return self.getRequest("/banks")

    def getBank(self, bankID):
        self.bankID = bankID
        return self.getRequest("/banks/" + bankID)

    def getAccount(self, accountID):
        self.accountID = accountID
        return self.getRequest("/my/banks/" + self.bankID + "/accounts/" + accountID + "/account")

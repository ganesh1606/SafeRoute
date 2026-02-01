import pandas as pd
from sklearn.linear_model import LogisticRegression

class SafetyModel:
    def __init__(self):
        self.model = LogisticRegression()

    def train(self, df):
        X = df[["crime", "lights", "cctv", "crowd"]]
        y = df["unsafe"]
        self.model.fit(X, y)

    def predict(self, features):
        return self.model.predict_proba([features])[0][1]

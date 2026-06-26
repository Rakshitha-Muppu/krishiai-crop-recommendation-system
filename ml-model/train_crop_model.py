import pandas as pd
import pickle

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

# LOAD DATASET
df = pd.read_csv("../dataset/crop_recommendation.csv")

# ENCODE LABELS
crop_encoder = LabelEncoder()
df["label"] = crop_encoder.fit_transform(df["label"])

# FEATURES
X = df[
    [
        "N",
        "P",
        "K",
        "temperature",
        "humidity",
        "ph",
        "rainfall"
    ]
]

y = df["label"]


# SPLIT DATA
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# TRAIN MODEL
model = RandomForestClassifier(
    n_estimators=300,
    random_state=42
)

model.fit(X_train, y_train)



pred = model.predict(X_test)

accuracy = accuracy_score(y_test, pred)

print(f"\nAccuracy : {accuracy*100:.2f}%")


with open("../ml-model/crop_model.pkl", "wb") as file:
    pickle.dump(model, file)

with open("../ml-model/crop_label_encoder.pkl", "wb") as file:
    pickle.dump(crop_encoder, file)

print("\nModel Saved Successfully.")
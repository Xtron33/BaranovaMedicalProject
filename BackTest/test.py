import numpy as np

from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import Flatten
import pandas as pd


dataset = pd.read_excel('E:\BaranovaMedicalProject\BackTest\est1.xlsx')
dataset = dataset.fillna(0)

X = dataset.iloc[:len(dataset.index), :33].to_numpy()
y = dataset.iloc[:len(dataset.index), 33].to_numpy()

model = Sequential()
model.add(Flatten(input_shape=(33,)))
model.add(Dense(34, activation='relu'))
model.add(Dense(4, activation='softmax'))

model.compile(loss='sparse_categorical_crossentropy',
              optimizer='adam', metrics=['accuracy'])
model.fit(X, y, epochs=1000, batch_size=10)

_, accuracy = model.evaluate(X, y)
print('Accuracy: %.2f' % (accuracy*100))

test_images = pd.read_excel(
    "E:\BaranovaMedicalProject\BackTest\est2.xlsx")

test_images = test_images.fillna(0)

test_images = test_images.to_numpy()

predictions = model.predict(test_images)

for i in range(len(predictions)):
    print(np.argmax(predictions[i]))

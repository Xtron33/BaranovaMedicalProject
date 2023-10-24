from kafka import KafkaConsumer, KafkaProducer
import json
import psycopg2
import pandas as pd
import numpy as np
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import Flatten
import os

connect = psycopg2.connect(
    database="Medical-App-DB", user="postgres", password="123", host="127.0.0.1", port="5432")

script_dir = os.getcwd() + '\WebServers\Backend\medical-neural-py\models\model.keras'


if os.path.isfile(script_dir):
    model = keras.models.load_model(script_dir)
    print('load model')
else:
    model = Sequential()
    model.add(Flatten(input_shape=(33,)))
    model.add(Dense(34, activation='relu'))
    model.add(Dense(4, activation='softmax'))
    model.compile(loss='sparse_categorical_crossentropy',
                  optimizer='adam', metrics=['accuracy'])
    print('create new')

consumer = KafkaConsumer(
    bootstrap_servers='localhost:9092',
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='neural'
)


producer = KafkaProducer(bootstrap_servers='localhost:9092')

consumer.subscribe(['train', 'predicate'])
for mes in consumer:
    print(mes.topic)
    if mes.topic == 'train':
        dataset = pd.read_sql('SELECT * FROM datum', connect)
        dataset = dataset.fillna(0)

        X = dataset.iloc[:len(dataset.index), :33].to_numpy()
        y = dataset.iloc[:len(dataset.index), 33].to_numpy()

        model.fit(X, y, epochs=500, batch_size=10)
        _, accuracy = model.evaluate(X, y)
        print('Accuracy: %.2f' % (accuracy*100))

        model.save(script_dir)
    if mes.topic == 'predicate':
        print('predicate start ')

        head = [(mes.headers[0][0], mes.headers[0][1]),
                ("kafka_nest-is-disposed", bytes('', 'utf-8'))]
        print(head)
        producer.send('predicate.reply', value=b'done', headers=head)

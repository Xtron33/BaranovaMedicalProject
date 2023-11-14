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

kafka = os.environ['KAFKA_BROKERCONNECT']

connect = psycopg2.connect(
    database="Medical-App-DB", user="postgres", password="secret_pass", host="host.docker.internal", port="5433")

script_dir = f'{os.getcwd()}/models/model.keras'
print(script_dir)

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
    bootstrap_servers=kafka,
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='neural'
)


producer = KafkaProducer(bootstrap_servers=kafka)

consumer.subscribe(['train', 'predicate'])
for mes in consumer:
    print(mes.topic)
    if mes.topic == 'train':
        dataset = pd.read_sql('SELECT * FROM datum', connect)
        dataset = dataset.fillna(0)

        X = dataset.iloc[:len(dataset.index), 1:34].to_numpy()
        y = dataset.iloc[:len(dataset.index), 34].to_numpy()

        model.fit(X, y, epochs=1000, batch_size=10)
        _, accuracy = model.evaluate(X, y)
        print('Accuracy: %.2f' % (accuracy*100))

        model.save(script_dir)

        head = [(mes.headers[0][0], mes.headers[0][1]),
                ("kafka_nest-is-disposed", bytes('', 'utf-8'))]

        producer.send('train.reply', value=b'done', headers=head)
    if mes.topic == 'predicate':
        print('predicate start ')

        json_obj = json.loads(mes.value.decode('UTF-8'))

        obj = pd.DataFrame([json_obj])

        obj = obj.fillna(0)

        arr = obj.iloc[:1, 3:36].to_numpy()

        prediction = model.predict(arr)

        head = [(mes.headers[0][0], mes.headers[0][1]),
                ("kafka_nest-is-disposed", bytes('', 'utf-8'))]

        print(np.argmax(prediction[0]))

        res = str(np.argmax(prediction[0])).encode('UTF-8')

        print(res)

        producer.send('predicate.reply', value=res, headers=head)

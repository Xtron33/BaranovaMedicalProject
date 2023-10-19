from kafka import KafkaConsumer

consumer = KafkaConsumer(
    'train',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='neural',
)

for message in consumer:
    print(message.value)

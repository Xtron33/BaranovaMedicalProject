FROM python:3.11.5 as builder

WORKDIR /app

COPY neural-server.py .

COPY requirements.txt .
COPY /models ./models

FROM python:3.11.5
COPY --from=builder /app/requirements.txt .
COPY --from=builder /app/neural-server.py .

COPY /models /app/models

RUN pip install -r requirements.txt

CMD ["python", "./neural-server.py"]
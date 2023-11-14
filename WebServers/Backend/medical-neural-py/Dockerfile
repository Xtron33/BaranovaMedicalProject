FROM python:3.11.5

WORKDIR usr/src/app

COPY neural-server.py ./

COPY requirements.txt ./

RUN pip install -r ./requirements.txt

RUN mkdir -p models

CMD ["python", "neural-server.py"]
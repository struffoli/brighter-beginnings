FROM python:latest
RUN apt-get update
RUN apt-get install -y python3
RUN pip3 install --upgrade pip
RUN apt-get install -y libssl-dev
WORKDIR /back-end
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8080
CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:8080", "app:app"]
# CMD ["bin/bash"]
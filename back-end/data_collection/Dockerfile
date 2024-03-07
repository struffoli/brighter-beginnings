FROM python:latest
WORKDIR /back-end/data_collection
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . ./
# EXPOSE 5000
CMD ["bash"]
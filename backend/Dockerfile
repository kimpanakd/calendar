FROM python:3.7
COPY . /app
WORKDIR /app
RUN pip install --trusted-host pypi.python.org -r requirements.txt
EXPOSE 7070
CMD ["python", "app.py"]
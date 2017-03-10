#!/bin/bash

clear

echo "Gunicorn : Starting flask server on port 80 with 25 workers."

cd /root/gehack/src/server
gunicorn --workers 25 --bind 0.0.0.0:80 wsgi:app 

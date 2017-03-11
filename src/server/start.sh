#!/bin/bash

clear

echo "Gunicorn : Starting flask server on port 80 with 5 workers, ."

cd /root/gehack/src/server
gunicorn --workers 5 --timeout 2147483647 --bind 0.0.0.0:80 wsgi:app 

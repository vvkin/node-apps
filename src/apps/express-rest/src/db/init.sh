#!/bin/sh

psql -U postgres -c "DROP DATABASE social"
psql -U postgres -c "CREATE DATABASE social"
psql -U postgres -d social -f "$(dirname "$0")/schema.sql"

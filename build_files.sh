# # build the project
# # echo "build the project"
# pip install -r requirements.txt

# # pillow installation
# python -m pip install Pillow

# # Make migration
# # echo "Make migration"
# python3.9 manage.py migrate --noinput
# python3.9 manage.py makemigrations --noinput
knex migrate:latest --env development

# # Collect static
# # echo "Collect static"
# # python3.9 manage.py collectstatic --noinput --clear
# python3.9 manage.py collectstatic --noinput --clear

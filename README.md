# apiserverproject
A server made using Django with API compatibility using Django Rest Framework  that imports data from a MongoDB database and provides json data using API calls.

!!WARNING!! This project is not completed and the frontend of the project doesnt work properly mainly because I'm a backend developer currently trying to learn just enough frontend to get this running. Read Contrib.md if you want to contribute. !!

I have included the data used in this project in the repository and you can import it into your MongoDB database.  
To run this project, simply clone this repository and run the command "pip install -r requirements.txt"(optimally inside a virtual environment).
Now, just activate your virtual environment if you have one and run the command "python manage.py runserver" to get your server running.
Run the "python manage.py import_data" to import your data in the server.
Use postman or type your api url api in your browser to check that the server runs correctly. put "<your_server_url>/data/data" to get all data as a test.

I will update this project as I work on it.
Feel free to contact me at anirudhcode@icloud.com
